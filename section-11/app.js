const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");
const errorController = require("./controllers/error");

const app = express();
app.set("view engine", "pug");
app.set("views", "views");

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

// ROUTES
app.use("/admin", adminRoute);
app.use("/", shopRoute);
app.use(errorController.get404Page);

// MODELS RELATION
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

Cart.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasOne(Cart);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// STARTING THE SERVER
const startApp = async () => {
  try {
    await sequelize.sync();

    let user = await User.findByPk(1);
    if (!user) {
      user = await User.create({
        name: "Atidhira",
        email: "test@email.com",
      });
    }

    let userCart = await user.getCart();
    if (!userCart) {
      userCart = await user.createCart();
    }

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  } catch (err) {
    console.error(err);
  }
};

startApp();
