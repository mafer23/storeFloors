import e from "cors";
import * as productService from "../services/productService.js";

export async function getProducts(req, res) {
  try {
    const products = await productService.getProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function createProduct(req, res) {
  try {
    const { nombre_producto, descripcion, precio, stock, id_categoria, id_estado } = req.body;

    if (!nombre_producto || !precio || !stock || !id_categoria || !id_estado) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const newProduct = await productService.createProduct({
      nombre_producto,
      descripcion,
      precio,
      stock,
      id_categoria,
      id_estado
    });

    res.status(201).json(newProduct);
  } catch (err) {
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

    const updatedProduct = await productService.updateProduct(id, {
      nombre_producto,
      descripcion,
      precio,
      stock,
      id_categoria,
      id_estado
    });

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id);
    res.json({ message: "Producto eliminado" });
  } catch (err) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
