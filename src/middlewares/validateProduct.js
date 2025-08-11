export function validateProduct(req, res, next) {
  const { nombre_producto, precio, stock, id_categoria, id_estado } = req.body;
  if (!nombre_producto || !precio || !stock || !id_categoria || !id_estado) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }
  next();
}