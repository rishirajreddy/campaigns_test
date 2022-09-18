const Sequelize = require('sequelize');
const db = require('../config/db');

const Campaign = db.define('campaigns', {
    campaign: {
        type: Sequelize.STRING
    },
    date_range:{
        type:Sequelize.STRING
    },
    clicks: {
        type: Sequelize.INTEGER
    },
    budget: {
        type:Sequelize.STRING
    },
    location:{
        type:Sequelize.STRING
    },
    platform: {
        type:Sequelize.STRING
    },
    status:{
        type:Sequelize.STRING
    },
    image:{
        type:Sequelize.STRING
    },
    createdAt:{
        type:Sequelize.STRING,
    }
})

module.exports = Campaign;