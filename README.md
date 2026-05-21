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

Building this lab surfaced a number of real-world challenges that go beyond the curriculum material.

The first major hurdle was environment configuration. Getting `dotenv` to load correctly required `require("dotenv").config()` to be the very first line in `server.js` — before any other imports. A misplaced require statement caused `MONGO_URI` to return `undefined`, which produced a cryptic Mongoose error that had nothing to do with the connection string itself. Understanding the load order of Node.js modules was the real lesson here.

The most instructive bug was in the Mongoose pre-save hook. The curriculum shows `next` as a parameter in the middleware function, but newer versions of Mongoose handle async middleware differently — `next` is not needed and calling it throws a `TypeError`. Removing it and allowing the async function to resolve naturally fixed the issue. This was a case where the curriculum and the actual library behavior diverged, requiring independent debugging.

From an IAM perspective, several concepts in this lab map directly to enterprise security patterns. The JWT signing and verification flow mirrors SAML token assertions used in enterprise SSO — a signed, self-contained token that proves identity without requiring a session lookup. The bcrypt pre-save hook is conceptually similar to a one-way credential vault — you can verify against it but never retrieve the original value, which is the same principle behind privileged account password management in Privileged Access Management (PAM) platforms. The deliberate use of a generic error message for both wrong password and non-existent email directly mirrors account enumeration attack prevention — a standard control in any hardened authentication system.
