import db from "../db.js";

export const getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM user");
    return res.status(200).json({ users: rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const sql = "SELECT * FROM user WHERE id_user = ?";
    const [rows] = await db.query(sql, [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(200).json({ user: rows[0] });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const createUser = async (req, res) => {
  const values = [
    req.body.username,
    req.body.name,
    req.body.password,
    req.body.restaurant_name,
  ];

  if (
    req.body.username === undefined ||
    req.body.name === undefined ||
    req.body.password === undefined ||
    req.body.restaurant_name === undefined
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const sql = `INSERT INTO user (username, name, password, restaurant_name) VALUES (?, ?, ?, ?)`;

  try {
    await db.query(sql, values);
    return res.status(201).json({ message: "User created successfully." });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "Username already registered." });
    }

    console.error(err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const deleteUserById = async (req, res) => {
  const userId = req.params.id;
  const sql = `DELETE FROM user WHERE id_user = ?`;

  try {
    const [result] = await db.query(sql, [userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(200).json({ message: "User deleted successfully." });
  } catch (err) {
    console.log(err);

    if (err.code === "ER_ROW_IS_REFERENCED_2") {
      return res
        .status(409)
        .json({ error: "Cannot delete user with existing orders." });
    }

    return res.status(500).json({ error: "Internal server error." });
  }
};

export const updateUserById = async (req, res) => {
  const userId = req.params.id;
  let desiredUser = "";

  const desiredUserSql = "SELECT * FROM user WHERE id_user = ?";

  try {
    const [result] = await db.query(desiredUserSql, userId);

    if (result.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    desiredUser = result[0];
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error." });
  }

  const values = [
    req.body.username || desiredUser.username,
    req.body.name || desiredUser.name,
    req.body.password || desiredUser.password,
    req.body.restaurant_name || desiredUser.restaurant_name,
    userId,
  ];

  const updateSql =
    "UPDATE user SET username = ?, name = ?, password = ?, restaurant_name = ? WHERE id_user = ?";

  try {
    await db.query(updateSql, values);
    return res.status(200).json({ message: "User updated successfully." });
  } catch (err) {
    console.log(err);

    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "Username already registered." });
    }

    return res.status(500).json({ error: "Internal server error." });
  }
};
