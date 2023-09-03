const db = require("./db");

const Sequelize = require("sequelize");

const ToDo = db.define("To_Do_List", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  task: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  details: {
    type: Sequelize.STRING,
    defaultValue: "No Details",
  },
});

module.exports = ToDo;
