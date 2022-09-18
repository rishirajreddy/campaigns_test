const express = require('express');
const router = express.Router();
const campController = require("../controllers/campController");
const productController = require("../controllers/productController");
const serviceController = require("../controllers/serviceController");

router.post("/add_product", productController.addProduct);
router.get("/get_products", productController.getProducts);

router.post("/add_service", serviceController.createService);
router.get("/get_services", serviceController.getAllServices);

router.post("/add", campController.addCampaign);
router.delete("/delete/:id", campController.deleteCampaign);
router.get("/get_all", campController.getAllCampaigns);
router.get("/get_campaign/:id", campController.getCampaign);

module.exports = router;