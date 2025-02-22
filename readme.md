<!-- @format -->

# YGG HACKATHON

## Start this project

- run `docker-compose up -d` to start the database
- `cd backend && npm run start:dev` to start the backend
- `cd frontend && npm run dev` to start the frontend
- `cd frontend-partner && npm start` to start the partner platform

## Purpose

This hackathon project focuses on building a robust Partner Management Platform with a multi-tenancy architecture. The platform is designed for internal use by YGG to efficiently manage partners, partner payments, and related operations.

### Key features include:

- Multi-Tenancy Architecture: Each partner is provided with a separate, dedicated database and a distinct domain (e.g., localhost:4200, localhost:4300). This allows partners to:
  - Point their own domains to the server.
  - Independently manage their Quest Managers, Games, and Quests.
  - Request database backups without affecting other partners.
  - Secure Authentication: User authentication is strictly domain-specific. For example, a user from partner vypham2 can only log in to localhost:4300, while partner vypham1 can only log in to localhost:4200.
- GraphQL and RESTful APIs: The backend is developed using NestJS, incorporating both RESTful APIs (documented with Swagger and validated with DTOs) and GraphQL.
- Custom GraphQL Decorators: Custom decorators like Mutation, QuerySingle, and QueryList are implemented to standardize GraphQL responses, ensuring each query and mutation returns data and error responses.
- Token-Based Database Routing: Upon login, the system generates a token associated with the partner's database. This token is used in subsequent requests, ensuring the correct database is accessed regardless of the domain.
- Frontend Error Handling: The frontend can easily handle GraphQL responses by checking the \_\_typename to determine if an error occurred.
- Nestjs common package: A custom package is made to handle multi database connection, and other common functions inside the nestjs framework.
