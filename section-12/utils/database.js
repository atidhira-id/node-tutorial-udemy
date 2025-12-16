import mongodb from "mongodb";

const MongoClient = mongodb.MongoClient;

let _db;

export const mongoConnect = async (id, password, callback) => {
  try {
    const client = await MongoClient.connect(
      `mongodb+srv://${id}:${password}@cluster0.it4y23n.mongodb.net/?appName=Cluster0`
    );

    _db = client.db("section12");

    callback();
  } catch (err) {
    console.log(err);
  }
};

export const getDb = () => {
  return _db ? _db : "No Database";
};

export const productsDb = () => {
  return getDb().collection("products");
};
