# WTWR (What to Wear?) — Backend API

## 🌐 Live API

Base URL: https://api-wtwr.fredlai.dev

---

## 📌 Project Description

This is the backend API for the WTWR (What to Wear?) application.

It provides endpoints for user authentication and clothing item management, and serves data to a React frontend. The application is deployed in a production environment using Docker and a cloud-based virtual machine.

---

## 🚀 Deployment (Dockerized Production Setup)

This backend is fully containerized using Docker and deployed on a Google Cloud VM.

### 🏗️ Architecture

Nginx (host)
↓
Backend (Docker container)
↓
MongoDB (Docker container + volume)

### Key Characteristics

- Containerized Node.js backend
- MongoDB running in a separate container with persistent storage
- Multi-container orchestration using Docker Compose
- Reverse proxy handled by Nginx
- Environment-based configuration via `.env` files
- Automatic restart policy (`restart: always`)
- No reliance on host-installed Node.js or MongoDB

---

## 🐳 Running with Docker (Production)

```bash
docker compose -f docker-compose.production.yml up -d --build
```

### Services

- `backend` → Express API
- `database` → MongoDB

---

## 💾 Data Persistence

MongoDB data is stored using Docker volumes:

```
mongo_data:/data/db
```

This ensures data persists across container restarts and redeployments.

---

## 🔐 Environment Configuration

Environment variables are managed using:

- `.env.docker.local`
- `.env.docker.production`
- `.env.docker.example` (template)

Sensitive data is not committed to the repository.

---

## 🛠️ Tech Stack

- Node.js
- Express
- MongoDB
- Docker
- Docker Compose
- Nginx
- Google Cloud VM

---

## ✨ Features

- RESTful API design
- Modular routing structure
- MongoDB database integration
- User authentication with hashed passwords
- JWT-based authorization
- Protected routes
- Centralized error handling with custom error classes
- Request validation using `celebrate` / `Joi`
- Rate limiting to protect against abuse
- Structured logging using `winston`

---

## 🔗 Frontend

Live frontend:
https://wtwr.fredlai.dev

Frontend repository:
https://github.com/fdlai/se_project_react

---

## 🔮 Future Improvements

- CI/CD pipeline for automated deployment
- Enhanced monitoring and alerting
- Horizontal scaling and load balancing
- Expanded API functionality

---

## 📬 Contact

Fred Lai
[fdlai@yahoo.com](mailto:fdlai@yahoo.com)
