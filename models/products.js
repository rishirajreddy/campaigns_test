const Sequelize = require('sequelize');
const db = require("../config/db");

const Product = db.define('products', {
    product:{
        type:Sequelize.STRING
    },
    price:{
        type:Sequelize.INTEGER
    },
    image: {
        type:Sequelize.STRING
    }
})

module.exports = Product;