import ProductModel from "../models/productModel.js";
import { validateProduct } from "../utils/validateProduct.js";

export default class ProductController {
  // get all the products
  getAllProducts = (req, res) => {
    const products = ProductModel.get();
    // Use the res.render() method to render the 'products' view, and pass in the products data
    return res.render("products", { products: products });
  };

  // render the form of the create product page
  renderCreateProduct = (req, res) => {
    res.render("createProduct");
  };

  // create the product
  createProduct = (req, res) => {
    const { name, description, price, imageUrl } = req.body;

    const errors = validateProduct({ name, description, price, imageUrl });

    if (errors.length > 0) {
      return res.status(400).render("createProduct", {
        errors,
        product: { name, description, price, imageUrl },
      });
    }

    // Save product
    ProductModel.addProduct({ name, description, price, imageUrl });

    res.redirect("/products");
  };

  // get product with ID
  getProductById = (req, res) => {
    // get the data
    const { id } = req.params;

    // validate the data
    const productId = Number(id);

    const product = ProductModel.getProductDetailsById(productId);

    const { name, description, price, imageUrl } = product;
    res.render("createProduct", {
      product: { productId, name, description, price, imageUrl },
      isEdit: true,
    });
  };

  // save the product by ID
  updateProductById = (req, res) => {
    // get the data
    const { name, description, price, imageUrl } = req.body;

    const { id } = req.params;

    const productId = parseInt(id);
    // validate the data
    const errors = validateProduct({ name, description, price, imageUrl });

    if (errors.length > 0) {
      return res.status(400).render("createProduct", {
        errors,
        product: { productId, name, description, price, imageUrl },
        isEdit: true,
      });
    }

    // perform the operation
    const isUpdated = ProductModel.updateById(productId, req.body);

    if (!isUpdated) {
      return res.render("error", { error: "product is not updated" });
    }

    res.redirect("/products");
  };

  // delete the product by ID
  deleteProductById = (req, res) => {
    // get the product Id
    const { id } = req.params;
    // validate the product ID
    if (!id) {
      return res.render("error", { error: "Invalid Product ID" });
    }

    // parse the product ID
    const productId = parseInt(id);

    const isDelete = ProductModel.deleteById(productId);

    if (!isDelete) {
      return res.render("error", { error: "Invalid Product ID" });
    }

    res.redirect("/products");
  };
}
