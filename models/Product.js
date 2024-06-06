// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // id field same as Category model
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // name for prodct
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // price in decimal form of max 8 digits before decimal and 2 after decimal: 12345678.12
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      // Makes sure stored data IS a decimal.
      validate: {
        isDecimal: true,
      },
    },
    // stock amount for admin to keep track, default 10 if undefined
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      // makes sure stored value is a number
      validate: {
        isNumeric: true,
      },
    },
    // defines the category that THIS product belongs to
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // How category_id should be grabbed and stored on the product
      references: {
        model: 'category',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
