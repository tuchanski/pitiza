import express from "express";
import {
  createOrderToUser,
  deleteOrderById,
  getAllOrdersByUserId,
  getOrderById,
  updateOrderById,
  getOrderByUserIdAndOrderIdFunc,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.get("/users/:id_user/orders", getAllOrdersByUserId);
orderRouter.get("/users/:id_user/orders/:id_order", getOrderByUserIdAndOrderIdFunc);
orderRouter.post("/users/:id_user/orders", createOrderToUser);
orderRouter.patch("/users/:id_user/orders/:id_order", updateOrderById);
orderRouter.get("/orders/:id", getOrderById);
orderRouter.delete("/orders/:id", deleteOrderById);

export default orderRouter;
