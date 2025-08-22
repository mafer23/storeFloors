import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/utils/image");
  },
  filename: (req, file, cb) => {
    let nombreProducto = req.body.nombre_producto || "producto";
    nombreProducto = nombreProducto
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_\-]/g, ""); 

    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${nombreProducto}${ext}`); 
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedTypes.test(file.mimetype);
  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten imágenes JPG, PNG o WEBP."));
  }
};

export default multer({ storage, fileFilter });
