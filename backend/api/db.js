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

export default { getAllUsers, getUserById, createUser, updateUser, deleteUser };
