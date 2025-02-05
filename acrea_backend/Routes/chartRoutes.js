const express = require("express");
const router = express.Router();
const { getUserTypeCount,
    getPropertyTypeAndCityCount,
    // getUserRegistrationTrend,
    getPriceDistribution,
    getTopFavoriteProperties } = require("../controller/chartController");



// router.get("/registrationTrend", getUserRegistrationTrend);
router.get("/priceDistribution", getPriceDistribution);
router.get("/topFavoriteProperties", getTopFavoriteProperties);

router.get("/userTypeCount", getUserTypeCount);
router.get("/propertyTypeCount", getPropertyTypeAndCityCount);

module.exports = router;
