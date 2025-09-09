
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as productService from "../services/productService.js";
import { sanitizeName } from "../middlewares/uploadImage.js"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getProducts(req, res) {
  try {
    const products = await productService.getProducts();
    const imagesDir = path.join(__dirname, "../utils/image");

    const productsWithImages = products.map(product => {
      const files = fs.readdirSync(imagesDir);
      const imageFile = files.find(file =>
        file.toLowerCase().startsWith(product.nombre_producto.toLowerCase()) ||
        file.startsWith(String(product.id))
      );

      const imagen_url = imageFile ? `/utils/image/${imageFile}` : null;

      return { ...product, imagen_url };
    });

    res.json(productsWithImages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
export async function createProduct(req, res) {
  try {
    const { nombre_producto, descripcion, precio, stock, id_categoria, id_estado } = req.body;

    if (!nombre_producto || !precio || !stock || !id_categoria || !id_estado) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    if (!req.file) {
      console.warn("No se subió imagen, solo se guardará el producto en la BD.");
    }

    const newProduct = await productService.createProduct({
      nombre_producto,
      descripcion,
      precio,
      stock,
      id_categoria,
      id_estado
    });

    res.status(201).json({
      mensaje: "Producto creado correctamente",
      producto: newProduct,
      imagen_guardada: req.file ? `/utils/image/${req.file.filename}` : null
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}


export async function getProductById(req, res) {
  
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
  
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Error interno del servidor" });
  }


}

export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { nombre_producto, descripcion, precio, stock, id_categoria, id_estado } = req.body;

    if (!nombre_producto || !precio || !stock || !id_categoria || !id_estado) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    
    const currentProduct = await productService.getProductById(id);
    if (!currentProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

  let imagePath = null; 

    if (req.file) {

      const baseName = sanitizeName(nombre_producto);
      const dir = path.resolve(process.cwd(), "src/utils/image");

      const files = fs.readdirSync(dir);


      files.forEach(file => {
        const fileBase = path.basename(file, path.extname(file));

        if (fileBase.toLowerCase() === baseName.toLowerCase()) {
          if (req.file && file === req.file.filename) {
            return; 
          }

          
          const filePath = path.join(dir, file);
          try {
            fs.unlinkSync(filePath);
          } catch (err) {
            console.error("⚠️ Error al eliminar:", filePath, err);
          }
        }
      });

      imagePath = `utils/image/${req.file.filename}`;
    }


    const updatedProduct = await productService.updateProduct(id, {
      nombre_producto,
      descripcion,
      precio,
      stock,
      id_categoria,
      id_estado,
      imagen: imagePath
    });

    res.json({
      mensaje: "Producto actualizado correctamente",
      producto: updatedProduct,
      imagen_guardada: imagePath
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const product = await productService.getProductById(id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const imagesDir = path.join(__dirname, "../utils/image");

    const files = fs.readdirSync(imagesDir);
    const imageFile = files.find(file =>
      file.startsWith(product.nombre_producto) || file.startsWith(id)
    );

    if (imageFile) {
      const imagePath = path.join(imagesDir, imageFile);
      fs.unlinkSync(imagePath);
    } else {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    await productService.deleteProduct(id);

    res.json({ message: "Producto e imagen eliminados correctamente" });

  } catch (err) {
    
    res.status(500).json({ error: "Error interno del servidor" });
  }
}