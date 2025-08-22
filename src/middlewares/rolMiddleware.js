export function authorizeRole(...rolesPermitidos) {
  return (req, res, next) => {
    try {
      const userRole = req.user.role.id_rol; // viene del token decodificado en authMiddleware
      if (!rolesPermitidos.includes(userRole)) {
        return res.status(403).json({ message: "Acceso denegado" });
      }
      next();
    } catch (err) {
      res.status(500).json({ message: "Error en autorización", error: err.message });
    }
  };
}
