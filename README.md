# 🛒 EShop

**EShop** is a modular, full-stack e-commerce application designed with a microservices architecture. It leverages a combination of modern web technologies to provide a scalable and maintainable platform for online shopping experiences.

## 🚀 Features

- **User Authentication & Authorization**: Secure user management system.
- **Admin Dashboard**: Manage products, orders, and users.
- **Client Interface**: User-friendly shopping experience.
- **Order Management**: Handle order processing and tracking.
- **Microservices Architecture**: Decoupled services for scalability.
- **Dockerized Deployment**: Containerized services for easy deployment.
- **Full CI/CD pipeline**: The CI/CD pipeline identifies changes and deploys only those services where changes occurred.
  It includes building Docker images, publishing them to Docker Hub, and deploying to <a href="https://render.com/" target="_blank">render.com</a> hosting service.

## 🌐 Hosting

The application is hosted on [Render](https://render.com) with the following URLs:

- **Client Site**: [https://eshop-iec7.onrender.com](https://eshop-iec7.onrender.com)
  - Username: test.user@eshop.com
  - Password: test123
- **Admin Dashboard**: [https://eshop-98jn.onrender.com](https://eshop-98jn.onrender.com)
  - Username: test@eshop.com
  - Password: test123

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, SCSS
- **Backend**: Node.js, Express (NestJS implied)
- **Database**: PostgresSQL, Redis
- **Authentication**: Custom auth service
- **Asynchronous communication between services**: RabbitMQ
- **Containerization**: Docker, Docker Compose
- **Personal NPM Packages**:
  - [mqmanager-nestjs](https://www.npmjs.com/package/mqmanager-nestjs): For RabbitMQ integration
  - [redissolution](https://www.npmjs.com/package/redissolution): For Redis in-memory database integration
  - [@mike_hac/eshop-sharedauth](https://www.npmjs.com/package/@mike_hac/eshop-sharedauth): For sharing JWT strategy and JwtAuthGuard logic between services

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/mikehac/EShop.git
   cd EShop
   ```

2. **Run script**:

   ```bash
   envGenerator.bat
   ```

\_Note: This script will generate file .env.local for every sub folder with its environment variables.

3. **Start services using Docker Compose**:

   ```bash
   docker-compose up -d --build
   ```

4. **Access the application**:

   - Client: `http://localhost`
   - Admin: `http://localhost:85`

_Note: Port numbers are illustrative; please refer to `docker-compose.yml` for actual configurations._

## 📄 License

This project is licensed under the [MIT License](LICENSE).
