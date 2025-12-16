import { ObjectId } from "mongodb";
import { productsDb } from "../utils/database.js";

class Product {
  constructor(_title, _price, _description, _imageUrl) {
    this.title = _title;
    this.price = _price;
    this.description = _description;
    this.imageUrl = _imageUrl;
  }

  async save() {
    try {
      const result = await productsDb().insertOne(this);
      if (result) {
        console.log("Successfully inserted product");
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  }

  async update(id) {
    const productId = new ObjectId(id);
    try {
      const result = await productsDb().updateOne(
        { _id: productId },
        {
          $set: this,
        }
      );
      if (result) {
        console.log("Successfully updated product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  }

  static async fetchAll() {
    try {
      const products = await productsDb().find().toArray();
      return products;
    } catch (error) {
      console.log("error:", error);
    }
  }

  static async getProductById(id) {
    const productId = new ObjectId(id);
    try {
      const product = await productsDb().findOne({ _id: productId });
      return product;
    } catch (error) {
      console.log("error:", error);
    }
  }

  static async deleteProductById(id) {
    const productId = new ObjectId(id);
    try {
      await productsDb().deleteOne({ _id: productId });
      console.log("Successfully deleted product");
    } catch (error) {
      console.log("error:", error);
    }
  }
}

export default Product;
