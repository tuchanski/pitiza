import express from "express";
import {
  createOrderToUser,
  getAllOrdersByUserId,
  getOrderById,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.get("/users/:id_user/orders", getAllOrdersByUserId);
orderRouter.get("/orders/:id", getOrderById);
orderRouter.post("/users/:id_user/orders", createOrderToUser);

export default orderRouter;
