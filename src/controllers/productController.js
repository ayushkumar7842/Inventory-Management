import path from "path";
import ProductModel from "../models/productModel.js";

export default class ProductController {
  // get all the products
  getAllProducts = (req, res) => {
    const products = ProductModel.get();
    // Use the res.render() method to render the 'products' view, and pass in the products data
    return res.render("products", { products: products });
  };

  // render the form of the create product page
  renderCreateProduct = (req, res) => {
    res.render("createProduct", {
      errors: [],
      formData: {},
    });
  };

  // create the product
  createProduct = (req, res) => {
    const { name, description, price, imageUrl } = req.body;

    const errors = [];

    // Validations
    if (!name || name.trim() === "") {
      errors.push("Name is required.");
    }
    if (!description || description.trim() === "") {
      errors.push("Description is required.");
    }
    if (!price || isNaN(price) || Number(price) <= 0) {
      errors.push("Price must be a positive number.");
    }
    if (!imageUrl) {
      errors.push("Image URL is not valid.");
    }

    console.log(errors);
    // If errors, show them in form
    if (errors.length > 0) {
      return res.status(400).render("createProduct", {
        errors,
        formData: { name, description, price, imageUrl },
      });
    }

    // Save product
    const products = ProductModel.addProduct({
      name,
      description,
      price,
      imageUrl,
    });

    console.log(products);
    res.redirect("/products");
  };
}
