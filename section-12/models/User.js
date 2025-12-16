import { ObjectId } from "mongodb";
import { usersDb } from "../utils/database.js";

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  async save() {
    try {
      await usersDb().insertOne(this);
      console.log("User saved successfully");
    } catch (err) {
      console.log(err);
    }
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
