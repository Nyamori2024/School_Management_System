# API Documentation

## Base URL
- Development: `http://localhost:3001/api/v1`
- Production: `https://yourdomain.com/api/v1`

## Authentication

All protected endpoints require an `Authorization` header with a Bearer token:

```
Authorization: Bearer <jwt_token>
```

## Response Format

All API responses follow a standard format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {},
  "error": null
}
```

## Error Responses

```json
{
  "success": false,
  "message": "Error description",
  "data": null,
  "error": "error_code"
}
```

## Common Error Codes

- `401`: Unauthorized - Invalid or missing token
- `403`: Forbidden - Insufficient permissions
- `404`: Not Found - Resource not found
- `422`: Unprocessable Entity - Validation error
- `429`: Too Many Requests - Rate limit exceeded
- `500`: Internal Server Error

## Endpoints

### Authentication

#### Register
```
POST /auth/register

Request Body:
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "name": "John Doe",
  "role": "student"  // admin, teacher, student, parent
}

Response:
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "student"
  }
}
```

#### Login
```
POST /auth/login

Request Body:
{
  "email": "user@example.com",
  "password": "SecurePass123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "jwt-token",
    "refreshToken": "refresh-token",
    "user": {
      "id": "user-id",
      "email": "user@example.com",
      "role": "student"
    }
  }
}
```

#### Refresh Token
```
POST /auth/refresh

Request Body:
{
  "refreshToken": "refresh-token"
}

Response:
{
  "success": true,
  "message": "Token refreshed",
  "data": {
    "accessToken": "new-jwt-token"
  }
}
```

#### Logout
```
POST /auth/logout
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Users

#### Get All Users (Admin Only)
```
GET /users?page=1&limit=10&role=student

Response:
{
  "success": true,
  "data": {
    "users": [...],
    "total": 100,
    "page": 1,
    "limit": 10
  }
}
```

#### Get User Details
```
GET /users/:id
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "student",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### Update User
```
PUT /users/:id
Authorization: Bearer <token>

Request Body:
{
  "name": "Updated Name",
  "phone": "+254123456789"
}

Response:
{
  "success": true,
  "message": "User updated successfully",
  "data": { updated user object }
}
```

### Students

#### Get All Students
```
GET /students?page=1&limit=20&classId=class-id&search=query

Response:
{
  "success": true,
  "data": {
    "students": [...],
    "total": 150,
    "page": 1
  }
}
```

#### Get Student Details
```
GET /students/:id
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "id": "student-id",
    "userId": "user-id",
    "admissionNumber": "ADM001",
    "dateOfBirth": "2008-05-15",
    "classId": "class-id",
    "currentGPA": 3.8,
    "guardianName": "Jane Doe",
    "guardianPhone": "+254123456789"
  }
}
```

#### Create Student
```
POST /students
Authorization: Bearer <token>
Role: admin, teacher

Request Body:
{
  "email": "student@example.com",
  "name": "John Student",
  "password": "SecurePass123",
  "admissionNumber": "ADM001",
  "dateOfBirth": "2008-05-15",
  "guardianName": "Jane Doe",
  "guardianPhone": "+254123456789",
  "classId": "class-id"
}

Response:
{
  "success": true,
  "message": "Student created successfully",
  "data": { student object }
}
```

#### Update Student
```
PUT /students/:id
Authorization: Bearer <token>
Role: admin, teacher

Request Body:
{
  "classId": "new-class-id",
  "guardianName": "Updated Guardian"
}
```

#### Delete Student
```
DELETE /students/:id
Authorization: Bearer <token>
Role: admin

Response:
{
  "success": true,
  "message": "Student deleted successfully"
}
```

### Attendance

#### Get Attendance Records
```
GET /attendance?studentId=id&classId=id&startDate=2024-01-01&endDate=2024-12-31&page=1

Response:
{
  "success": true,
  "data": {
    "records": [
      {
        "id": "att-id",
        "studentId": "student-id",
        "date": "2024-01-15",
        "status": "PRESENT",
        "remarks": null
      }
    ],
    "total": 50
  }
}
```

#### Record Attendance
```
POST /attendance
Authorization: Bearer <token>
Role: teacher, admin

Request Body:
{
  "studentId": "student-id",
  "classId": "class-id",
  "date": "2024-01-15",
  "status": "PRESENT",
  "remarks": "Optional remarks"
}

Response:
{
  "success": true,
  "message": "Attendance recorded",
  "data": { attendance record }
}
```

#### Bulk Upload Attendance
```
POST /attendance/bulk
Authorization: Bearer <token>
Role: teacher, admin
Content-Type: application/json

Request Body:
{
  "records": [
    {
      "studentId": "id1",
      "classId": "class-id",
      "date": "2024-01-15",
      "status": "PRESENT"
    },
    ...
  ]
}

Response:
{
  "success": true,
  "message": "Bulk attendance recorded",
  "data": {
    "success": 100,
    "failed": 2,
    "errors": [...]
  }
}
```

### Assessments

#### Get Assessments
```
GET /assessments?studentId=id&subjectId=id&page=1&limit=20

Response:
{
  "success": true,
  "data": {
    "assessments": [
      {
        "id": "assess-id",
        "studentId": "student-id",
        "subjectId": "subject-id",
        "type": "EXAM",
        "marks": 85,
        "totalMarks": 100,
        "percentage": 85.0,
        "grade": "A"
      }
    ]
  }
}
```

#### Record Assessment
```
POST /assessments
Authorization: Bearer <token>
Role: teacher

Request Body:
{
  "studentId": "student-id",
  "subjectId": "subject-id",
  "type": "EXAM",
  "marks": 85,
  "totalMarks": 100,
  "comments": "Good performance"
}

Response:
{
  "success": true,
  "message": "Assessment recorded",
  "data": { assessment record }
}
```

### Classes

#### Get All Classes
```
GET /classes?page=1&limit=20&academicYear=2024

Response:
{
  "success": true,
  "data": {
    "classes": [
      {
        "id": "class-id",
        "name": "Form 1A",
        "level": "Form 1",
        "stream": "A",
        "capacity": 40,
        "academicYear": "2024",
        "classTeacherId": "teacher-id"
      }
    ]
  }
}
```

#### Get Class Details
```
GET /classes/:id

Response:
{
  "success": true,
  "data": {
    "id": "class-id",
    "name": "Form 1A",
    "students": [...],
    "studentCount": 35,
    "classTeacher": { teacher object },
    "timetable": [...]
  }
}
```

#### Create Class
```
POST /classes
Authorization: Bearer <token>
Role: admin

Request Body:
{
  "name": "Form 1A",
  "level": "Form 1",
  "stream": "A",
  "capacity": 40,
  "classTeacherId": "teacher-id",
  "academicYear": "2024"
}
```

## Rate Limiting

API is rate limited to prevent abuse:
- **Per IP**: 100 requests per 15 minutes
- **Per User**: 1000 requests per hour

Rate limit headers included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1234567890
```

## Pagination

Endpoints supporting pagination:
```
GET /endpoint?page=1&limit=20&sort=createdAt&order=desc

Response includes:
{
  "data": [...],
  "total": 500,
  "page": 1,
  "limit": 20,
  "pages": 25
}
```

## Filtering & Search

Most list endpoints support filtering:
```
GET /students?classId=class-id&search=john&role=student&isActive=true

Supported filters vary by endpoint - check specific endpoint documentation.
```

## Webhooks (Future)

Webhook events for real-time notifications:
- `student.created`
- `attendance.marked`
- `grade.recorded`
- `class.updated`

Subscribe to webhooks via admin panel.

## SDKs

Official SDKs available:
- JavaScript/TypeScript (npm: `school-management-sdk`)
- Python (pip: `school-management-sdk`)

## Support

For API support, contact: api-support@schoolmanagement.com
