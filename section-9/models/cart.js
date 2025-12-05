const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path");

const p = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
  static addProduct = (productId, price) => {
    fs.readFile(p, (err, cartData) => {
      let cart = {
        products: [],
        totalPrice: 0,
      };

      if (!err) {
        cart = JSON.parse(cartData);
      }

      // check if productId exist in cart
      const existingProduct = cart.products.find((p) => p.id === productId);

      if (existingProduct) {
        cart.products.map((p) => {
          if (p.id === productId) {
            p.quantity += 1;
          }
        });
      } else {
        cart.products.push({
          id: productId,
          quantity: 1,
        });
      }
      cart.totalPrice += price;

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  };
};
