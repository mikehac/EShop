# 🛒 EShop

**EShop** is a modular, full-stack e-commerce application designed with a microservices architecture. It leverages a combination of modern web technologies to provide a scalable and maintainable platform for online shopping experiences.

## 🚀 Features

- **User Authentication & Authorization**: Secure user management system.
- **Admin Dashboard**: Manage products, orders, and users.
- **Client Interface**: User-friendly shopping experience.
- **Order Management**: Handle order processing and tracking.
- **Microservices Architecture**: Decoupled services for scalability.
- **Dockerized Deployment**: Containerized services for easy deployment.

## 🧱 Project Structure

```
eShop.shared.auth/        # Shared authentication utilities
eshop.admin/              # Admin dashboard frontend
eshop.auth/               # Authentication service
eshop.client/             # Customer frontend
eshop.order.server/       # Order backend service - serves admin dashboard
eshop.order/              # Order background service
eshop.server/             # Customer backend
eshop.user.server/        # User management backend service
docker-compose.yml        # Docker Compose configuration
*.bat                     # Batch scripts for service management
```

## 🛠️ Tech Stack

- **Frontend**: TypeScript, React, SCSS
- **Backend**: Node.js, Express (NestJS implied)
- **Authentication**: Custom auth service
- **Containerization**: Docker, Docker Compose

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

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start services using Docker Compose**:

   ```bash
   docker-compose up --build
   ```

4. **Access the application**:

   - Client: `http://localhost:3000`
   - Admin: `http://localhost:3001`
   - API Server: `http://localhost:5000`

_Note: Port numbers are illustrative; please refer to `docker-compose.yml` for actual configurations._

## 🧪 Scripts

The repository includes several batch scripts to manage services:

- `admin.bat`
- `auth.bat`
- `client.bat`
- `order.server.bat`
- `server.bat`
- `updatePackages.bat`
- `delete_packages.bat`

These scripts facilitate starting, stopping, and updating various services.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
