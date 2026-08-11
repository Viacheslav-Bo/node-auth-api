# auth-api

REST API with JWT authentication and role-based access control (`user` / `admin`) for books and users resources.

## Stack

- Node.js + TypeScript + Express
- MongoDB Atlas + Mongoose
- JWT authentication
- bcryptjs for password hashing
- Zod for request validation
- Helmet
- CORS
- Morgan
- Playwright for API-level tests
- Postman collection for manual API testing

## Project Structure

```text
src/
├── models/                  # Mongoose models (User, Book)
├── services/
│   ├── authServices/        # Signup and login
│   ├── bookServices/
│   └── userServices/
├── controllers/
│   ├── authControllers/
│   ├── bookControllers/
│   └── userControllers/
├── routes/                  # Auth, book and user routes
├── middlewares/
│   ├── authenticate.ts      # JWT authentication
│   ├── authorize.ts         # Role-based authorization
│   ├── validateBody.ts      # Zod request validation
│   ├── errorHandler.ts
│   └── notFoundHandler.ts
├── validation/              # Zod schemas
├── constants/               # Application constants
├── types/                   # Express Request type augmentation
├── db/                      # MongoDB connection
├── app.ts                   # Express application
└── server.ts                # Server startup and process handlers

scripts/
└── seed.ts                  # Creates the initial admin user

tests/
└── *.spec.ts                # Playwright API tests

tsconfig.json                # TypeScript configuration
tsconfig.build.json          # Build configuration for src/

## Getting Started

### 1. Install dependencies

npm install

### 2. Configure environment variables

The project includes the required environment configuration so it can be run after cloning, as requested in the assignment.

Required variables:

MONGO_URI=your-mongodb-atlas-uri
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-admin-password

> In a production environment, secrets should not be committed to the repository and should be provided through the deployment environment.

### 3. Create the initial admin

npm run seed

The seed script creates the first admin using `ADMIN_EMAIL` and `ADMIN_PASSWORD`.

If the admin already exists, the seed script does not create a duplicate account.

### 4. Start the development server

npm run dev

The API will be available at:

http://localhost:3000

## Authentication

Authentication is implemented using JWT.

After login, include the token in the `Authorization` header:

Authorization: Bearer <token>

There are two user roles:

- `user` — can read books
- `admin` — can read and manage books and users

`POST /signup` always creates a regular `user` account. The `role` field is not accepted during public signup.

Only an authenticated admin can create users through `POST /users` and assign the `admin` role.

## Routes

| Method | Endpoint     | Access        |
| ------ | ------------ | ------------- |
| POST   | `/signup`    | Public        |
| POST   | `/login`     | Public        |
| GET    | `/books`     | Authenticated |
| GET    | `/books/:id` | Authenticated |
| POST   | `/books`     | Admin         |
| PATCH  | `/books/:id` | Admin         |
| DELETE | `/books/:id` | Admin         |
| GET    | `/users`     | Admin         |
| POST   | `/users`     | Admin         |
| GET    | `/users/:id` | Admin         |
| PATCH  | `/users/:id` | Admin         |
| DELETE | `/users/:id` | Admin         |

## Error Handling

The API includes centralized error handling for:

- Validation errors
- Invalid MongoDB ObjectIds
- Mongoose validation errors
- Duplicate email errors
- Invalid or expired JWTs
- Authentication and authorization errors
- Unknown routes
- Unexpected server errors

Unhandled promise rejections and uncaught exceptions are also handled at the server level.

## Testing

### Playwright API Tests

Start the server first:

npm run dev

Make sure the initial admin has been created:

npm run seed

Then run:

npx playwright test

The tests create their own temporary regular users through `/signup`, so repeated test runs do not depend on previously created test users.

Admin credentials are read from environment variables.

### Postman

The repository also contains a Postman collection:

auth-api.postman_collection.json

Import the collection into Postman.

Collection variables:

- `baseUrl` — defaults to `http://localhost:3000`
- `adminToken`
- `userToken`

The login requests automatically save the received tokens to the corresponding collection variables.

For the admin login request, use the password configured in `ADMIN_PASSWORD`.

## Available Scripts

npm run dev # Start development server
npm run build # Build the application
npm start # Start production server
npm run seed # Create the initial admin
npm test # Placeholder test command

## What I Would Add With More Time

- Refresh tokens and access token rotation
- Dedicated password change endpoint
- Rate limiting for authentication endpoints
- Pagination and filtering for books and users
```
