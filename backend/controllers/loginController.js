import bcrypt from "bcrypt";
import db from "../db.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

export async function login(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await db.getUserByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id_user }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
      });
      res.cookie("token", token, { httpOnly: true });
      res
        .status(200)
        .json({ message: "Login successful", userId: user.id_user, token });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token." });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
}

export async function me(req, res) {
  try {
    const user = await db.getUserById(req.userId);
    if (user) {
      res
        .status(200)
        .json({
          id: user.id_user,
          name: user.name,
          username: user.username,
          restaurantName: user.restaurant_name,
        });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Fetch user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
