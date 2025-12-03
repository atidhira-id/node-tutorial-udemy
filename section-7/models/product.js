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
  constructor(_title) {
    this.title = _title;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products));
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }
};
