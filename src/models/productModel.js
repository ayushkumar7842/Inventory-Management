export default class ProductModel {
  constructor(id, name, description, price, imageUrl) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
  }

  static get() {
    return products;
  }

  // add the product
  static addProduct(product) {
    // create the instance for new product
    const newProduct = new ProductModel(
      products.length + 1,
      product.name,
      product.description,
      product.price,
      product.imageUrl
    );
    // push the new product into the array
    products.push(newProduct);
    return products;
  }

  // get the product details by ID
  static getProductDetailsById(productID) {
    const product = products.find((product) => {
      return product.id === productID;
    });

    return product;
  }

  // save the product by ID
  static updateById(productId, productData) {
    const product = this.getProductDetailsById(productId);

    if (!product) {
      return false;
    }

    product.name = productData.name;
    product.description = productData.description;
    product.price = productData.price;
    product.imageUrl = productData.imageUrl;

    // the product is updated and saved
    return true;
  }

  // delete the product by ID
  static deleteById(productId) {
    const product = this.getProductDetailsById(productId);
    // if product is not found
    if (!product) {
      return false;
    }

    products = products.filter((product) => {
      return product.id !== productId;
    });

    return true;
  }
}

let products = [
  new ProductModel(
    1,
    "Product 1",
    "Description for Product 1",
    19.99,
    "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg"
  ),
  new ProductModel(
    2,
    "Product 2",
    "Description for Product 2",
    29.99,
    "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg"
  ),
  new ProductModel(
    3,
    "Product 3",
    "Description for Product 3",
    39.99,
    "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200 _.jpg"
  ),
];
