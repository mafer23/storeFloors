// src/middlewares/multerConfig.js
import multer from "multer";
import path from "path";

export function sanitizeName(nombre) {
  return (nombre || "producto")
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_\-]/g, "");
}

const uploadDir = path.resolve(process.cwd(), "src/utils/image");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const nombreProducto = sanitizeName(req.body.nombre_producto);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${nombreProducto}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extOk = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeOk = allowedTypes.test(file.mimetype);
  if (extOk && mimeOk) cb(null, true);
  else cb(new Error("Solo se permiten imágenes JPG, PNG o WEBP."));
};

export default multer({ storage, fileFilter });
