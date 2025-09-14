import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as userController from "./controllers/userController.js";
import * as orderController from "./controllers/orderController.js";
import * as loginController from "./controllers/loginController.js";

const envFound = dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// User routes
app.get("/users", userController.getAllUsers);
app.get("/users/:id", userController.getUserById);
app.post("/users", userController.createUser);
app.patch("/users/:id", userController.updateUser);
app.delete("/users/:id", userController.deleteUser);

// Order routes
app.get("/users/:user_id/orders", orderController.getAllOrders);
app.get("/users/:user_id/orders/:id", orderController.getOrderById);
app.post("/users/:user_id/orders", orderController.createOrder);
app.patch("/users/:user_id/orders/:id", orderController.updateOrder);
app.delete("/users/:user_id/orders/:id", orderController.deleteOrder);

// Login route
app.post("/login", loginController.login);

// Start server

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
