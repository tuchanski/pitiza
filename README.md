# Pitiza 🍕

A small order management system for pizzerias, built with a **Node.js/Express + MySQL backend** and a **React frontend**.

## Overview

- **Backend:** Node.js + Express
- **Frontend:** React + Vite
- **Authentication:** JWT (token stored in `localStorage` on the frontend)

The app allows you to create, list, search, update, and delete orders linked to users/restaurants.

## Prerequisites

- Node.js (>=16)
- npm or yarn
- MySQL

## Repository Structure (summary)

```
pitiza-remake/
├─ backend/
│  ├─ controllers/       # controllers: user, order, login
│  ├─ routes/            # routes (mounted under /api)
│  ├─ db.js              # mysql2 connection pool
│  ├─ index.js           # express app entry point
│  ├─ package.json
│  └─ .env               # (not committed) DB env vars
├─ frontend/
│  ├─ src/
│  │  ├─ components/     # React components (Card, Modal, Header...)
│  │  ├─ pages/          # pages (Dashboard, Login, Register)
│  │  ├─ main.jsx        # app entry
│  │  └─ App.jsx
│  ├─ package.json
│  └─ vite.config.js
└─ README.md
```

## Screenshots

### 🟢 Login Screen

<img width="1470" height="956" alt="Login" src="https://github.com/user-attachments/assets/4480879f-d479-4cfc-a86d-34d4b3f01da1" />

### 🟢 Register Screen

<img width="1470" height="956" alt="Register" src="https://github.com/user-attachments/assets/4840d05d-4ad5-486f-bfa6-78d7a5f68ed6" />

### 🟢 Dashboard Screen

<img width="1470" height="956" alt="Dashboard" src="https://github.com/user-attachments/assets/22c1437d-0156-4bb4-9c14-2112cc6e9f49" />

### 🟢 Create Order Screen

<img width="1470" height="956" alt="Create Order" src="https://github.com/user-attachments/assets/31fbd66a-825d-4b01-837c-365406c3ae1a" />

### 🟢 Search Order Screen

<img width="1470" height="956" alt="Search Order" src="https://github.com/user-attachments/assets/9e304b78-d6fb-4e05-82db-802c425fcda1" />

### 🟢 Update Screen

<img width="1470" height="956" alt="Update Order" src="https://github.com/user-attachments/assets/cfbf1418-1bde-440a-a07d-0c290360c159" />

## Database

The project uses **MySQL**.  
There is no SQL script included in this repo, so below is a minimal snippet to create the schema and tables required by the backend.

> Tip: adjust `pitiza` to match your database name (the one set in `DB_NAME`).

```sql
CREATE DATABASE IF NOT EXISTS pitiza;
USE pitiza;

CREATE TABLE IF NOT EXISTS `user` (
  `id_user` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `restaurant_name` VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS `order` (
  `id_order` INT AUTO_INCREMENT PRIMARY KEY,
  `customer_name` VARCHAR(255) NOT NULL,
  `items` TEXT NOT NULL,
  `total_price` DECIMAL(10,2) NOT NULL,
  `id_user` INT NOT NULL,
  FOREIGN KEY (id_user) REFERENCES `user` (id_user) ON DELETE CASCADE
);
```

Copy this SQL into a file and run it in MySQL before starting the backend — or create the tables manually.

## Environment Variables

Inside the `backend/` directory, create a `.env` file with:

```
PORT=3000
DB_HOST=localhost
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=pitiza
JWT_SECRET=your_secret_key
```

Adjust `PORT` and `JWT_SECRET` as needed.

## Running the Project

### 1. Backend

```bash
cd backend
npm install
npm start
```

- The `start` script in `backend/package.json` runs `nodemon index.js` for development.
- Default server: **http://localhost:3000**

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

- The frontend uses **Vite** and runs by default on **http://localhost:5173**

## Main Endpoints

> All routes are mounted under `/api` (see `backend/index.js`)

### 👤 Users

- `GET /api/users/:id` — Get user data
- `POST /api/users` — Create user (register)
- `PATCH /api/users/:id` — Update user
- `DELETE /api/users/:id` — Delete user

### 🍕 Orders

- `GET /api/users/:id_user/orders` — List all orders for a user
- `GET /api/users/:id_user/orders/:id_order` — Get a specific order
- `POST /api/users/:id_user/orders` — Create an order for the user
- `PATCH /api/users/:id_user/orders/:id_order` — Update an existing order
- `DELETE /api/orders/:id` — Delete an order by ID

### 🔐 Authentication

- `POST /api/login` — Log in and receive a JWT token

## Author

**Guilherme Tuchanski Rocha**
