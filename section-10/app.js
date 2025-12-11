const path = require("path");
const express = require("express");

const app = express();
app.set("view engine", "pug");
app.set("views", "views");

// MIDDLEWARE
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
const adminRoute = require("./routes/admin");
app.use("/admin", adminRoute);

const shopRoute = require("./routes/shop");
app.use("/", shopRoute);

const errorController = require("./controllers/error");
app.use(errorController.get404Page);

app.listen(3000);
