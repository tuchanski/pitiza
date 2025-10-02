import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  const sql = "SELECT * FROM user WHERE username = ?";

  try {
    const result = await db.query(sql, [username]);
    const user = result[0][0];

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    const token = jwt.sign(
      { id_user: user.id_user, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    return res
      .status(200)
      .json({ message: "Login successful.", user: user, token: token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error." });
  }
};
