export function authorizeRole(...rolesPermitidos) {
  return (req, res, next) => {
    try {
      const userRole = req.user.role; // 👈 ahora es un string, ej. "admin"
      console.log("Rol del usuario:", userRole);

      if (!rolesPermitidos.includes(userRole)) {
        return res.status(403).json({ message: "Acceso denegado" });
      }

      next();
    } catch (err) {
      res.status(500).json({ message: "Error en autorización", error: err.message });
    }
  };
}

