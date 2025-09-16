import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);

router.post("/users", createUser);

export default router;
