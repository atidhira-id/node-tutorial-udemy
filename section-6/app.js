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
const adminRoutes = require("./routes/admin");
app.use("/admin", adminRoutes);

const shopRoutes = require("./routes/shop");
app.use(shopRoutes);

// HANDLING 404
app.use((req, res) => {
  res.status(404).render("404", { docTitle: "Page not found" });
});

app.listen(3000);
