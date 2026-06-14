# School Management System

A comprehensive school management system inspired by Zeraki, built with modern technologies and following best practices for security and scalability.

## Tech Stack

- **Backend**: Node.js + Express.js + TypeScript
- **Frontend**: Next.js + TypeScript + Tailwind CSS
- **Database**: PostgreSQL
- **Authentication**: JWT + OAuth2
- **Validation**: Zod
- **ORM**: Prisma
- **Testing**: Jest + Supertest
- **Logging**: Winston
- **API Documentation**: Swagger/OpenAPI

## Project Structure

```
School_Management_System/
├── backend/                 # Express.js API
├── frontend/               # Next.js web application
├── shared/                 # Shared types and utilities
├── docker-compose.yml      # Docker configuration
├── .env.example           # Environment variables template
└── README.md
```

## Features

### Core Features
- **Student Management**: Enrollment, profiles, demographics
- **Teacher Management**: Staff profiles, subject assignments
- **Class Management**: Class creation, student assignments, timetables
- **Attendance**: Daily attendance tracking, reports
- **Grades & Performance**: Assessment tracking, performance analytics
- **Parent Portal**: Access to student progress and communications
- **Notifications**: SMS, Email, In-app notifications
- **Analytics & Reporting**: Comprehensive dashboards and reports

## Security Features

- JWT-based authentication
- Role-Based Access Control (RBAC)
- Data encryption at rest and in transit
- SQL injection prevention (Parameterized queries)
- CSRF protection
- Rate limiting
- Input validation & sanitization
- Secure password hashing (bcrypt)

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Nyamori2024/School_Management_System.git
cd School_Management_System
```

2. Install dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. Setup environment variables
```bash
cp .env.example .env.local
```

4. Setup database
```bash
cd backend
npm run db:migrate
npm run db:seed  # Optional: seed with test data
```

5. Start development servers
```bash
# Backend (from backend directory)
npm run dev

# Frontend (from frontend directory)
npm run dev
```

## API Documentation

Swagger documentation will be available at `http://localhost:3001/api/docs`

## Testing

```bash
# Backend tests
cd backend
npm run test

# Frontend tests
cd frontend
npm run test
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment guidelines.

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and process for submitting pull requests.

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please use the GitHub Issues page.
