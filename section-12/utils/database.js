import mongodb from "mongodb";

const MongoClient = mongodb.MongoClient;

const mongoConnect = async (callback) => {
  try {
    const connection = await MongoClient.connect(
      "mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.it4y23n.mongodb.net/?appName=Cluster0"
    );

    callback(connection);
  } catch (err) {
    console.log(err);
  }
};

export default mongoConnect;
