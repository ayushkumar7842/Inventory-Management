import express from "express";
import path from "path";
import ProductController from "./src/controllers/productController.js";

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Sets up the EJS view engine to be used by the app and specifies the directory where the views are located.
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));

// Configures the app to use EJS Layouts, which is a middleware that allows the use of templates with multiple views.
// app.use(ejsLayouts);

//  middleware that serves the static files from the views directory to the browser.
app.use(express.static("public"));

// instance of the product controller
const productController = new ProductController();

// View all products
app.get("/products", productController.getAllProducts);

// Render the create product form
app.get("/products/create", productController.renderCreateProduct);

// Handle form submission to create a product
app.post("/products", productController.createProduct);

app.listen(PORT, () => {
  console.log("server is running at PORT", PORT);
});
