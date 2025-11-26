const path = require("path");
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

const adminRoutes = require("./routes/admin");
app.use("/admin", adminRoutes);

const shopRoutes = require("./routes/shop");
app.use(shopRoutes);

// Handling 404
const rootDir = require("./utils/path");
app.use((req, res) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

app.listen(3000);
