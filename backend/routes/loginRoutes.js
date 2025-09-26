import express from "express";
import { login, verifyToken, me } from "../controllers/loginController.js";

const loginRouter = express.Router();

loginRouter.post("/login", login);
loginRouter.get("/verify", verifyToken);
loginRouter.get("/me", me);

export default loginRouter;
