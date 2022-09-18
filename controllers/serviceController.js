const Service = require("../models/services");

exports.createService = async(req,res) => {
    const {service, description, icon} = req.body;

    Service.create({
        service,
        description,
        icon
    })
    .then((result) => {
        res.status(200).json("Record Inserted Successfully");
        console.log(result.dataValues);
    }).catch((err) => {
        res.json(err);
        console.log(err.message);
    });
}

exports.getAllServices = async(req,res) => {
    await Service.findAll()
        .then((result) => {
            res.status(200).json(result);
            console.log("Fetched all services");
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        })
}