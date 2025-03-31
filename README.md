# Restaurant Management System

A full-stack web application for managing restaurants where customers can order and managers can review the food items and customers in the dashboard.

## Features

- Admin dashboard for managing menu items and users
- User authentication and account management

## Technology Stack

- **Frontend**:

  - React
  - Tailwind CSS
  - Vite
  - ShadCN/UI

- **Backend**:

  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - JWT Authentication

- **DevOps**:

  - Docker
  - Docker Compose

- **Libraries & Tools**:
  - Nodemailer (for email notifications)
  - Swagger (API documentation)
  - Pino (logging)

## Setup

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository

```
git clone https://github.com/mitkiflemariam/restaurant.git
```

2. Install dependencies

```
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Set up environment variables
   Create a `.env` file in the server directory with the following variables:

```
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```

4. Start the application

```
# Start the server
cd server
npm start

# Start the client
cd ../client
npm run dev
```

## Project Structure

- `client/`: React frontend application
- `server/`: Node.js backend API
- `server/models/`: Database models
- `server/routers/`: API routes
