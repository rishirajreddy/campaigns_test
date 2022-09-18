const Product = require("../models/products");

exports.addProduct = async(req,res) => {
    const {product, price, image} = req.body;

    Product.create({
        product,
        price,
        image
    })
    .then((result) => {
        console.log(result.dataValues);
        res.status(200).send("Product Added");   
    }).catch((err) => {
        console.log(err);
        res.json(err.message);
    });
}

exports.getProducts = async(req,res) => {
    await Product.findAll()
        .then((result) => res.status(200).json(result))
        .catch(err => {
            res.json(err.message);
            console.log(err);
        })
}