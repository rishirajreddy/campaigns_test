const Sequelize = require('sequelize');
const db = require("../config/db");

const Service = db.define('services', {
    service:{
        type:Sequelize.STRING
    },
    description:{
        type:Sequelize.INTEGER
    },
    platform: {
        type: Sequelize.STRING
    },
    icon: {
        type:Sequelize.STRING
    }
})

module.exports = Service;