const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path");
const Cart = require("./cart");

const p = path.join(rootDir, "data", "product.json");
const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, data) => {
    if (err) {
      return cb([]);
    }
    return cb(JSON.parse(data));
  });
};

module.exports = class Product {
  constructor(requestBody) {
    this.id = requestBody.id ? requestBody.id : null;
    this.title = requestBody.title;
    this.imageUrl = requestBody.imageUrl;
    this.price = requestBody.price;
    this.description = requestBody.description;
  }

  save() {
    getProductsFromFile((products) => {
      if (!this.id) {
        this.id = (products.length + 1).toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      } else {
        const newProducts = products.map((product) => {
          return product.id === this.id ? this : product;
        });
        fs.writeFile(p, JSON.stringify(newProducts), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }

  static getProductById(productId, callback) {
    getProductsFromFile((products) => {
      const product = products.find((product) => product.id === productId);
      callback(product);
    });
  }

  static deleteProductById(productId, callback) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === productId);
      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );

      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(productId, product.price);
        }
        console.log(err);
      });

      const response = {
        isSuccess: true,
        message: `Product with id: ${productId} successfully deleted.`,
      };

      callback(response);
    });
  }
};
