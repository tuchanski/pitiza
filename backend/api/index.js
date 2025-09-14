import dotenv from "dotenv";
import express from "express";
import * as userController from "./controllers/userController.js";

const envFound = dotenv.config();
const app = express();

app.use(express.json());

// User routes
app.get("/users", userController.getAllUsers);
app.get("/users/:id", userController.getUserById);
app.post("/users", userController.createUser);
app.patch("/users/:id", userController.updateUser);
app.delete("/users/:id", userController.deleteUser);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
