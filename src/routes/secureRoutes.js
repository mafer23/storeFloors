import express from "express";
import { authorizeRole } from "../middlewares/rolMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { ROLES } from "../config/roles.js";


const router = express.Router();


router.get("/admin-dashboard", authMiddleware, authorizeRole(ROLES.admin), (req, res) => {
  res.json({ message: "Bienvenido al panel de administrador", user: req.user });
});

router.get("/user-profile", authMiddleware, authorizeRole(ROLES.user), (req, res) => {
  res.json({ message: "Bienvenido a tu perfil de usuario", user: req.user });
});



export default router;
