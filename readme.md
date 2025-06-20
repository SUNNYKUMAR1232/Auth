# 🚀 Auth System

> **A modern, multi-provider authentication system built with Node.js, Express, TypeScript, Passport.js, MongoDB, and Redis.**

---

## 📚 Reference

- [Building a TypeScript REST API with OOP](https://dev.to/drsimplegraffiti/building-a-typescript-rest-api-with-an-object-oriented-programming-oop-approach-3o0n)
- [Node and Passport.js GitHub Authentication](https://medium.com/swlh/node-and-passport-js-github-authentication-e33dbd0558c)
- [Advanced Error Handling in Node.js](https://dev.to/amritak27/advanced-error-handling-in-nodejs-1ep8)
- [Google Auth with Passport.js](https://medium.com/@prashantramnyc/how-to-implement-google-authentication-in-node-js-using-passport-js-9873f244b55e)
- [Dotenv for Node.js](https://thegeekplanets.medium.com/managing-environment-variables-in-node-js-using-the-dotenv-package-2a5c8eee61a8)
- [Redis with TypeScript](https://medium.com/@alessandro.traversi/integrating-redis-with-typescript-using-the-official-redis-library-9cf121da3fb9)

---

## ✨ Description

A robust authentication system supporting:
- 🔑 Local, GitHub, Google, Twitter, LinkedIn, Facebook logins
- 🛡️ Secure session management with Redis
- 🗄️ MongoDB for user data
- 🧩 Modular, scalable TypeScript codebase

---

## 🗂️ Table of Contents

- [Setup](#setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Routes & Restrictions](#api-routes--restrictions)
- [Environment Variables](#environment-variables)

---

## ⚙️ Setup

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

```bash
git clone https://github.com/your-repo/auth.git
cd auth
npm install
# or
yarn install
```

Create `.env.development`, `.env.test`, `.env.staging`, and `.env.production` as needed and add the required environment variables.

---

## 🏃 Usage

### Running the Server

```bash
npm run dev
# or
yarn dev
```

### Running with Docker

```bash
docker-compose up
```

---

## 🏗️ Project Structure

```
Auth/
├── src/
│   ├── config/           # App configuration (passport, cors, etc.)
│   ├── controllers/      # Route controllers
│   ├── interfaces/       # TypeScript interfaces/types
│   ├── middlewares/      # Express middlewares
│   ├── models/           # Mongoose models
│   ├── routes/           # Express route definitions
│   ├── services/         # Passport strategies, business logic
│   ├── utils/            # Utility functions
│   ├── views/            # EJS templates
│   ├── app.ts            # Express app setup
│   ├── server.ts         # Server entry point
├── public/               # Static assets (images, CSS, JS)
├── dist/                 # Compiled output
├── .env.development      # Environment variables
├── docker-compose.yml    # Docker config
└── package.json
```

---

## 🌐 API Routes & Restrictions

| Route                                 | Method | Description                | Restriction         |
|----------------------------------------|--------|----------------------------|---------------------|
| `/api/v1/auth/login`                   | GET    | Login page                 | Public              |
| `/api/v1/auth/register`                | GET    | Registration page          | Public              |
| `/api/v1/auth/logout`                  | GET    | Logout                     | Authenticated only  |
| `/api/v1/auth/profile`                 | GET    | User profile               | Authenticated only  |
| `/api/v1/auth/github`                  | GET    | GitHub OAuth start         | Public              |
| `/api/v1/auth/github/callback`         | GET    | GitHub OAuth callback      | Public              |
| `/api/v1/auth/google`                  | GET    | Google OAuth start         | Public              |
| `/api/v1/auth/google/callback`         | GET    | Google OAuth callback      | Public              |
| `/api/v1/auth/twitter`                 | GET    | Twitter OAuth start        | Public              |
| `/api/v1/auth/twitter/callback`        | GET    | Twitter OAuth callback     | Public              |
| `/api/v1/auth/linkedin`                | GET    | LinkedIn OAuth start       | Public              |
| `/api/v1/auth/linkedin/callback`       | GET    | LinkedIn OAuth callback    | Public              |
| `/api/v1/auth/facebook`                | GET    | Facebook OAuth start       | Public              |
| `/api/v1/auth/facebook/callback`       | GET    | Facebook OAuth callback    | Public              |
| `/api/v1/user/me`                      | GET    | Current user info          | Authenticated only  |
| `/api/v1/user/update`                  | POST   | Update user profile        | Authenticated only  |

---

## 🔒 Route Restrictions

- **Public:** Anyone can access (login, register, OAuth start/callback)
- **Authenticated only:** User must be logged in (profile, logout, user info)
- **Admin only:** (If implemented) Only admin users

---

## 🛠️ Environment Variables

- `MONGO_URI` – MongoDB connection string
- `REDIS_URL` – Redis connection string
- `PORT` – Server port
- `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `GITHUB_CALLBACK_URL`
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_CALLBACK_URL`
- `TWITTER_CONSUMER_KEY`, `TWITTER_CONSUMER_SECRET`, `TWITTER_CALLBACK_URL`
- `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`, `LINKEDIN_CALLBACK_URL`
- `FACEBOOK_CLIENT_ID`, `FACEBOOK_CLIENT_SECRET`, `FACEBOOK_CALLBACK_URL`

---

##
