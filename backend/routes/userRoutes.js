import express from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.delete("/users/:id", deleteUserById);

export default router;
