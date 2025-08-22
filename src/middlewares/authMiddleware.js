import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "mi_clave_secreta";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  try {
    const payload = jwt.verify(token, SECRET); 
    req.user = { id: payload.id, name: payload.name, role: payload.role };
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
}
