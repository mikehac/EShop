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

## 🧩 Local Setup Instructions

To run the project locally, follow these steps **after cloning the repository**:

### Run Environment Setup Script

Simply run the provided batch script to set up all necessary environment files:

```bash
envGenerator.bat
```

This script will:
1. Check if the `eshop.db` folder exists, create it if needed
2. Create database configuration files in the `eshop.db` folder
3. Create a root `.env` file with Postgres volume paths
4. Set up appropriate `.env` or `.env.local` files in each service directory

> ⚠️ After running the script, you may want to review the generated files and replace default values like `VERY_SECURED_PASSWORD` and `VERY_SECRET_AND_LONG_KEY` with your own secure credentials.

For reference, here are the environment variables that will be configured:

#### Database Configuration

The script creates these files in the `eshop.db` folder:

##### `eshop.db/.env`
```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=VERY_SECURED_PASSWORD
POSTGRES_DB=eshop
```

##### `eshop.db/.env.order`
```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=VERY_SECURED_PASSWORD
POSTGRES_DB=eshop.orders
```

#### Service Configuration

Each service will have its own `.env.local` file with environment variables similar to:

##### `eshop.auth`

```
PORT=3001
DB_HOST=eshop.db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=VERY_SECURED_PASSWORD
DB_NAME=eshop
REDIS_HOST=eshop.redis
REDIS_PORT=6379
CORS_ORIGINS=http://localhost:5173,http://localhost:5174
DB_SSL=false
JWT_SECRET=VERY_SECRET_AND_LONG_KEY
```
