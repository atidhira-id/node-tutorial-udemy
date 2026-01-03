import { ObjectId } from "mongodb";
import { productsDb, usersDb } from "../utils/database.js";

class User {
  constructor(id, name, email, cart) {
    this._id = id;
    this.name = name;
    this.email = email;
    this.cart = cart;
  }

  async save() {
    try {
      await usersDb().insertOne(this);
      console.log("User saved successfully");
    } catch (err) {
      console.log(err);
    }
  }

  async addToCart(product) {
    let quantity = 1;
    const productIndex = this.cart.items.findIndex((item) => {
      return item.productId.toString() == product._id.toString();
    });

    const updatedCartItems = [...this.cart.items];
    if (productIndex >= 0) {
      quantity = this.cart.items[productIndex].quantity + 1;
      updatedCartItems[productIndex] = {
        productId: new ObjectId(product._id),
        quantity: quantity,
      };
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: quantity,
      });
    }

    const updatedCart = { items: updatedCartItems };
    try {
      await usersDb().updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
      console.log("Successfully added to cart");
    } catch (err) {
      console.log(err);
    }
  }

  async getCart() {
    const cartItems = this.cart.items;
    const productIds = cartItems.map((item) => item.productId);

    let total = 0;
    let products = await productsDb()
      .find({ _id: { $in: productIds } })
      .toArray();

    products = products.map((product) => {
      const quantity = cartItems.find(
        (item) => item.productId.toString() === product._id.toString()
      ).quantity;

      total += product.price * quantity;
      return {
        ...product,
        quantity: quantity,
      };
    });

    return {
      products: products,
      total: total,
    };
  }

  static async findById(id) {
    const userId = new ObjectId(id);
    try {
      return await usersDb().findOne({ _id: userId });
    } catch (err) {
      console.log(err);
    }
  }
}

export default User;
