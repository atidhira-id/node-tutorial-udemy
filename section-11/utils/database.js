const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("section11", "root", "atidhira123", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
