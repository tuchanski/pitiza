import mysql from "mysql2/promise";
import dotenv from "dotenv";

const envFound = dotenv.config();
const client = mysql.createPool(process.env.CONNECTION_STRING);

// User CRUD operations

async function getAllUsers() {
  const result = await client.query("SELECT * FROM user");
  return result[0];
}

async function getUserById(id) {
  const result = await client.query("SELECT * FROM user WHERE id = ?", [id]);
  return result[0][0] || null;
}

async function createUser(user) {
  const values = [
    user.username,
    user.name,
    user.email,
    user.password,
    user.restaurant,
  ];
  const result = await client.query(
    "INSERT INTO user (username, name, email, password, restaurant) VALUES (?, ?, ?, ?, ?)",
    values
  );
  return result[0];
}

async function updateUser(id, newData) {
  const user = await getUserById(id);

  if (!user) return null;

  const values = [
    newData.username || user.username,
    newData.name || user.name,
    newData.email || user.email,
    newData.password || user.password,
    newData.restaurant || user.restaurant,
    id,
  ];

  const result = await client.query(
    "UPDATE user SET username = ?, name = ?, email = ?, password = ?, restaurant = ? WHERE id = ?",
    values
  );

  return result[0];
}

async function deleteUser(id) {
  const user = await getUserById(id);

  if (!user) return false;

  const result = await client.query("DELETE FROM user WHERE id = ?", [id]);
  return true;
}

// Order CRUD operations

// Filtering by User
async function getAllOrders(userId) {
  const result = await client.query("SELECT * FROM `order` WHERE user_id = ?", [
    userId,
  ]);
  return result[0];
}

// Filtering by User
async function getOrderById(orderId, userId) {
  const result = await client.query(
    "SELECT * FROM `order` WHERE id = ? AND user_id = ?",
    [orderId, userId]
  );
  return result[0][0] || null;
}

// Creating order for a specific User
async function createOrder(order, userId) {
  const values = [order.customer_name, order.items, order.total_price, userId];
  const result = await client.query(
    "INSERT INTO `order` (customer_name, items, total_price, user_id) VALUES (?, ?, ?, ?)",
    values
  );
  return result[0];
}

async function updateOrder(orderId, userId, newData) {
  const order = await getOrderById(orderId, userId);

  if (!order) return null;

  const values = [
    newData.customer_name || order.customer_name,
    newData.items || order.items,
    newData.total_price || order.total_price,
    orderId,
    userId,
  ];

  const result = await client.query(
    "UPDATE `order` SET customer_name = ?, items = ?, total_price = ? WHERE id = ? AND user_id = ?",
    values
  );
  return result[0];
}

async function deleteOrder(orderId, userId) {
  const order = await getOrderById(orderId, userId);

  if (!order) return false;

  const result = await client.query(
    "DELETE FROM `order` WHERE id = ? AND user_id = ?",
    [orderId, userId]
  );
  return true;
}

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
