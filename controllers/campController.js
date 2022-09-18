const mysql = require('mysql2');
const Campaign = require("../models/campaign");
// const mysqlConnection = require("../config/db");
const {format} = require('date-fns');
let date = format(new Date(), "dd LLLL");

exports.addCampaign = async(req,res)=> {
    if(!req.body){
        res.status(400).send("Content cannot be empty");
    }

    let {campaign, budget, platform, status, date_range,image, location} = req.body;
    let currDate = date.substring(0, 6)
    Campaign.create({
        campaign,
        budget,
        platform,
        status,
        date_range,
        image,
        location,
        clicks:100,
        createdAt: currDate
    })  
    .then((result) => {
        res.status(200).send(result)
        console.log("Data Inserted")})
    .catch(err => {
        res.send(err.message);
        console.log(err)})
}

exports.deleteCampaign  = async(req,res) => {
    await Campaign.destroy({
        where: {id: req.params.id}
    })
    .then((result) => {
        res.status(200).json({data:result, msg:"Campaign Deleted!!"});
        console.log("Deleted");
    })
    .catch(err => {
        res.send(err.message);
        console.log(err.message);
    })
}

exports.getAllCampaigns = async(req,res) => {
    await Campaign.findAll()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getCampaign = async(req,res) => {
    const id = req.params.id;

    await Campaign.findByPk(id)
        .then((result) => {
            res.status(200).json(result)
            console.log("Fetched");
        })
        .catch(err => {
            res.status(500).json(err);
            console.log(err);
        })
}