const mysql = require("mysql2");
const Sequelize = require("sequelize");

module.exports = new Sequelize('zocket_task', 'root', 'fsociety', {
    host: 'localhost',
    dialect: 'mysql',
    define:{
        timestamps:false
    },
    pool: {
        max:5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

});


// module.exports = {mysqlConnection: connection};