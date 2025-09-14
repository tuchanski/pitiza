import bcrypt from "bcrypt";
import db from "../db.js";

export async function login(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await db.getUserByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      res
        .status(200)
        .json({ message: "Login successful", userId: user.id_user });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
