import db from "../db.js";

export const getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM user");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const [rows] = await db.query(
      `SELECT * FROM user WHERE id_user = ${userId}`
    );
    if (rows.length !== 0) {
      res.json(rows);
    } else {
      res.status(500).json({ error: "User not found." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const createUser = async (req, res) => {
  const values = [
    req.body.username,
    req.body.name,
    req.body.password,
    req.body.restaurant_name,
  ];

  const sql = `INSERT INTO user (username, name, password, restaurant_name) VALUES (?, ?, ?, ?)`;

  try {
    const result = await db.query(sql, values);

    if (result) {
      res.status(200).json({ message: "User created successfully " });
    }
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "Username already registered." });
    }

    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
};
