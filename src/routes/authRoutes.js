import express from "express";
import { register, login } from "../controllers/userControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Registro y login
router.post("/register", register);
router.post("/login", login);

// Ruta protegida de ejemplo
router.get("/me", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

export default router;
