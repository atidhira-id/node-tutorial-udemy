const express = require("express");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

const usersRoute = require("./routes/users");
app.use(usersRoute);

app.listen(3000);
