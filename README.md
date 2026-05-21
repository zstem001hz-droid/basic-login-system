# Basic Login System

## Tech Stack
- Node.js
- Express
- MongoDB / Mongoose
- bcrypt
- jsonwebtoken
- dotenv

## Project Structure
```
basic-login-system/
├── models/
│   ├── index.js
│   └── User.js
├── routes/
│   ├── api/
│   │   ├── index.js
│   │   └── userRoutes.js
│   └── index.js
├── utils/
│   └── auth.js
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## Getting Started

### Prerequisites
- Node.js
- MongoDB Atlas account

### Installation
1. Clone the repository
2. Run `npm install`
3. Copy `.env.example` to `.env` and fill in your values
4. Run `nodemon server.js`

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB Atlas connection string |
| `PORT` | Port the server runs on |
| `JWT_SECRET` | Secret key for signing JWTs |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register a new user |
| POST | `/api/users/login` | Login and receive JWT |

## Usage Examples

### Register a New User
**POST** `/api/users/register`
```json
{
  "username": "testuser",
  "email": "test@test.com",
  "password": "password123"
}
```
**Response — 201 Created:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "username": "testuser",
    "email": "test@test.com"
  }
}
```

### Login
**POST** `/api/users/login`
```json
{
  "email": "test@test.com",
  "password": "password123"
}
```

**Response — 200 OK:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "username": "testuser",
    "email": "test@test.com"
  }
}
```

### Failed Login — Wrong Credentials
**Response — 400 Bad Request:**
```json
{
  "message": "Incorrect email or password."
}
```

## References

- [Mongoose pre() Middleware](https://mongoosejs.com/docs/middleware.html#pre)
- [bcrypt on npm](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken on npm](https://www.npmjs.com/package/jsonwebtoken)
- [How To Safely Store A Password](https://codahale.com/how-to-safely-store-a-password/)
- [Express.js Routing Documentation](https://expressjs.com/en/guide/routing.html)
- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)

## Reflection

> 🚧 Work in progress
