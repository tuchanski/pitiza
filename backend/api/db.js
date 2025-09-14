import mysql from "mysql2/promise";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

const envFound = dotenv.config();
const client = mysql.createPool(process.env.CONNECTION_STRING);
const salt = 10;

// User CRUD operations

async function getAllUsers() {
  const result = await client.query("SELECT * FROM user");
  return result[0];
}

async function getUserById(id) {
  const result = await client.query("SELECT * FROM user WHERE id_user = ?", [
    id,
  ]);
  return result[0][0] || null;
}

async function createUser(user) {
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;

  const values = [
    user.username,
    user.name || null,
    user.password,
    user.restaurant_name || null,
  ];

  const result = await client.query(
    "INSERT INTO user (username, name, password, restaurant_name) VALUES (?, ?, ?, ?)",
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
    newData.password || user.password,
    newData.restaurant_name || user.restaurant_name,
    id,
  ];
  const result = await client.query(
    "UPDATE user SET username = ?, name = ?, password = ?, restaurant_name = ? WHERE id_user = ?",
    values
  );
  return result[0];
}

async function deleteUser(id) {
  const user = await getUserById(id);
  if (!user) return false;
  await client.query("DELETE FROM user WHERE id_user = ?", [id]);
  return true;
}

// Order CRUD operations

async function getAllOrders(userId) {
  const result = await client.query(
    "SELECT * FROM `order` WHERE user_user_id = ?",
    [userId]
  );
  return result[0];
}

async function getOrderById(orderId) {
  const result = await client.query(
    "SELECT * FROM `order` WHERE id_order = ?",
    [orderId]
  );
  return result[0][0] || null;
}

async function createOrder(order, userId) {
  const values = [order.customer_name, order.items, order.total_price, userId];
  const result = await client.query(
    "INSERT INTO `order` (customer_name, items, total_price, user_user_id) VALUES (?, ?, ?, ?)",
    values
  );
  return result[0];
}

async function updateOrder(orderId, newData) {
  const order = await getOrderById(orderId);
  if (!order) return null;
  const values = [
    newData.customer_name || order.customer_name,
    newData.items || order.items,
    newData.total_price || order.total_price,
    orderId,
    userId,
  ];
  const result = await client.query(
    "UPDATE `order` SET customer_name = ?, items = ?, total_price = ? WHERE id_order = ?",
    values
  );
  return result[0];
}

async function deleteOrder(orderId) {
  const order = await getOrderById(orderId);
  if (!order) return false;
  await client.query("DELETE FROM `order` WHERE id_order = ?", [orderId]);
  return true;
}

async function getUserByUsername(username) {
  const result = await client.query("SELECT * FROM user WHERE username = ?", [
    username,
  ]);
  return result[0][0] || null;
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
  getUserByUsername,
};
