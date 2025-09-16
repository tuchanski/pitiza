import db from "../db.js";

export const getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM user");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const [rows] = await db.query(
      `SELECT * FROM user WHERE id_user = ${userId}`
    );
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "User not found " });
  }
};
