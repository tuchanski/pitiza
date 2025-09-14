import db from "../db.js";

export async function getAllOrders(req, res) {
  const userId = req.params.user_id;
  try {
    const orders = await db.getAllOrders(userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
}

export async function getOrderById(req, res) {
  const userId = req.params.user_id;
  const orderId = req.params.id;
  try {
    const order = await db.getOrderById(orderId, userId);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve order" });
  }
}

export async function createOrder(req, res) {
  const userId = req.params.user_id;
  const orderData = req.body;

  try {
    const result = await db.createOrder(orderData, userId);
    res.status(201).json({
      message: "Order created successfully",
      orderId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
}

export async function updateOrder(req, res) {
  const userId = req.params.user_id;
  const orderId = req.params.id;
  const newData = req.body;

  try {
    const result = await db.updateOrder(orderId, userId, newData);
    if (result) {
      res.status(200).json({ message: "Order updated successfully" });
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update order" });
  }
}

export async function deleteOrder(req, res) {
  const orderId = req.params.id;
  try {
    const result = await db.deleteOrder(orderId);
    if (result) {
      res.status(200).json({ message: "Order deleted successfully" });
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order" });
  }
}
