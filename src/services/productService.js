import * as productModel from '../models/productModels.js';

async function getProducts(data) {
  return await productModel.getProducts(data);
}
async function createProduct(params) {
  return await productModel.createProduct(params);
}
async function getProductById(params) {
  return await productModel.getProductById(params);
}
async function updateProduct(id, params) {
  return await productModel.updateProduct(id, params);
}
async function deleteProduct(id) {
  return await productModel.deleteProduct(id);
}

export { getProducts, createProduct, getProductById, updateProduct, deleteProduct };
