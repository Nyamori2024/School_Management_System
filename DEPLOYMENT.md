# Deployment Guide

## Prerequisites

- Docker and Docker Compose installed
- PostgreSQL 14+
- Node.js 18+
- PM2 (for process management)
- AWS account (optional, for S3 storage)

## Local Development Setup

### 1. Clone and Install Dependencies
```bash
git clone https://github.com/Nyamori2024/School_Management_System.git
cd School_Management_System
npm install
```

### 2. Start Services with Docker
```bash
# Start PostgreSQL and Redis
docker-compose up -d

# Verify services are running
docker ps
```

### 3. Setup Backend
```bash
cd backend

# Copy environment file
cp .env.example .env.local

# Install dependencies
npm install

# Run database migrations
npm run db:migrate

# Optional: Seed with test data
npm run db:seed

# Start development server
npm run dev
```

### 4. Setup Frontend
```bash
cd ../frontend

# Copy environment file
cp .env.example .env.local

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- API Documentation: http://localhost:3001/api/docs

## Production Deployment

### 1. Environment Configuration

Create a production `.env` file with secure values:

```bash
# Database
DATABASE_URL=postgresql://user:password@prod-db-host:5432/school_management

# JWT
JWT_SECRET=<generate-strong-secret>
JWT_EXPIRATION=24h

# Email
SMTP_HOST=smtp.gmail.com
SMTP_USER=<your-email>
SMTP_PASS=<app-password>

# Redis
REDIS_URL=redis://redis-host:6379

# Node
NODE_ENV=production
```

### 2. Build Docker Images

```bash
# Backend
docker build -t school-management-backend:latest ./backend

# Frontend
docker build -t school-management-frontend:latest ./frontend
```

### 3. Database Migration

```bash
# Run migrations in production
npm run db:migrate -- --skip-generate
```

### 4. Deployment Options

#### Option A: Docker Compose (Small Scale)
```bash
docker-compose -f docker-compose.prod.yml up -d
```

#### Option B: Kubernetes (Large Scale)
```bash
kubectl apply -f k8s/
```

#### Option C: Cloud Platforms

**Heroku:**
```bash
heroku login
heroku create school-management-api
git push heroku main
```

**AWS:**
- Use Elastic Beanstalk or ECS
- RDS for PostgreSQL
- ElastiCache for Redis

**Google Cloud:**
- Cloud Run for containers
- Cloud SQL for PostgreSQL
- Memorystore for Redis

### 5. Reverse Proxy Setup (Nginx)

```nginx
upstream backend {
  server localhost:3001;
}

upstream frontend {
  server localhost:3000;
}

server {
  listen 80;
  server_name yourdomain.com;

  # Redirect HTTP to HTTPS
  return 301 https://$server_name$request_uri;
}

server {
  listen 443 ssl http2;
  server_name yourdomain.com;

  ssl_certificate /path/to/cert.pem;
  ssl_certificate_key /path/to/key.pem;

  # Frontend
  location / {
    proxy_pass http://frontend;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  # Backend API
  location /api/ {
    proxy_pass http://backend/api/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

## Monitoring & Logging

### Backend Monitoring

```bash
# Use PM2 for production
pm2 start npm --name "school-api" -- start
pm2 start npm --name "school-frontend" -- start
pm2 monit
```

### Logging Setup

Logs are stored in:
- Error logs: `backend/logs/error.log`
- Combined logs: `backend/logs/combined.log`

### Application Monitoring Services

- **New Relic**: Performance monitoring
- **Sentry**: Error tracking
- **Datadog**: Infrastructure monitoring
- **LogRocket**: Frontend monitoring

## Backup Strategy

### Database Backups

```bash
# Manual backup
pg_dump $DATABASE_URL > backup.sql

# Automated daily backup to S3
0 2 * * * pg_dump $DATABASE_URL | gzip | aws s3 cp - s3://backups/db-$(date +\%Y\%m\%d).sql.gz
```

### Point-in-Time Recovery

```bash
psql $DATABASE_URL < backup.sql
```

## Scaling Strategies

### Horizontal Scaling

1. **Multiple Backend Instances**
   - Load balancer (Nginx, HAProxy, or cloud LB)
   - Session management via Redis
   - Database connection pooling

2. **Multiple Frontend Instances**
   - CDN for static assets
   - Server-side rendering with Node.js
   - Cache static content

### Caching Strategy

```bash
# Redis for:
- Session storage
- API response caching
- Rate limiting
- Real-time notifications
```

### Database Optimization

- Add indexes on frequently queried columns
- Use connection pooling (PgBouncer)
- Implement read replicas for scaling reads
- Archive old data

### CDN Setup

```bash
# CloudFlare or CloudFront
- Cache static assets
- Compress content
- DDoS protection
```

## Security Checklist

- [ ] Enable HTTPS/SSL
- [ ] Set strong database passwords
- [ ] Configure CORS properly
- [ ] Enable rate limiting
- [ ] Setup Web Application Firewall (WAF)
- [ ] Regular security updates
- [ ] Database encryption at rest
- [ ] Secrets management (AWS Secrets Manager, HashiCorp Vault)
- [ ] Regular backups and disaster recovery tests
- [ ] Security monitoring and alerting

## Performance Optimization

### Backend
- Implement caching strategies
- Optimize database queries
- Use connection pooling
- Implement pagination
- Enable gzip compression

### Frontend
- Optimize images
- Code splitting and lazy loading
- Minify CSS and JavaScript
- Use service workers
- Implement CDN

## Troubleshooting

### Database Connection Issues
```bash
# Check connection string
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL -c "SELECT 1"
```

### Backend won't start
```bash
# Check logs
tail -f backend/logs/error.log

# Verify environment variables
env | grep DATABASE
```

### Frontend build issues
```bash
# Clear cache and rebuild
npm run clean
npm install
npm run build
```

## Rollback Procedure

```bash
# Using Docker
docker images
docker pull school-management-backend:previous-version
docker-compose down
docker-compose up -d

# Using Git
git revert <commit-hash>
npm run build && npm start
```

## Support

For deployment issues, please open an issue on GitHub or contact the maintainers.
