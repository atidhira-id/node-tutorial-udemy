const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path");

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
    this.title = requestBody.title;
    this.imageUrl = requestBody.imageUrl;
    this.price = requestBody.price;
    this.description = requestBody.description;
  }

  save() {
    getProductsFromFile((products) => {
      this.id = products.length + 1;
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }
};
