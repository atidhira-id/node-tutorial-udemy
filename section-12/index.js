import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { mongoConnect } from "./utils/database.js";
import User from "./models/User.js";
import adminRouter from "./routes/admin.js";
import shopRouter from "./routes/shop.js";
import { get404Page } from "./controllers/error.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// MIDDLEWARE
app.set("view engine", "pug");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(async (req, res, next) => {
  const user = await User.findById("69420788df15b1b9bf2fcf4e");
  req.user = new User(user._id, user.name, user.email, user.cart);
  next();
});

app.use("/admin", adminRouter);
app.use(shopRouter);
app.use(get404Page);

mongoConnect(process.env.MONGO_ID, process.env.MONGO_PASSWORD, () => {
  app.listen(process.env.PORT);
});
