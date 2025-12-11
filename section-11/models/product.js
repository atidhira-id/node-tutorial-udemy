const db = require("../utils/database");
const Cart = require("./cart");

module.exports = class Product {
  constructor(requestBody) {
    this.id = requestBody.id ? requestBody.id : null;
    this.title = requestBody.title;
    this.image_url = requestBody.image_url;
    this.price = requestBody.price;
    this.description = requestBody.description;
  }

  save() {
    return db.execute(
      `INSERT INTO products (title, image_url, price, description) VALUES (?, ?, ?, ?)`,
      [this.title, this.image_url, this.price, this.description]
    );
  }

  update() {
    return db.execute(
      `UPDATE products SET title=?, image_url=?, price=?, description=? WHERE products.id=?`,
      [this.title, this.image_url, this.price, this.description, this.id]
    );
  }

  static fetchAll() {
    return db.execute(`SELECT * FROM products`);
  }

  static getProductById(productId) {
    return db.execute(`SELECT * FROM products WHERE products.id = ?`, [
      productId,
    ]);
  }

  static deleteProductById(productId) {
    return db.execute("DELETE FROM products WHERE products.id = ?", [
      productId,
    ]);
  }
};
