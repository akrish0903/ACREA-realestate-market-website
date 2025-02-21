const express = require("express");
const router = express.Router();
const { getUserTypeCount,
    getPropertyTypeAndCityCount,
    // getUserRegistrationTrend,
    getPriceDistribution,
    getTopFavoriteProperties,
    getPropertyInsights } = require("../controller/chartController");



// router.get("/registrationTrend", getUserRegistrationTrend);
router.get("/priceDistribution", getPriceDistribution);
router.get("/topFavoriteProperties", getTopFavoriteProperties);

router.get("/userTypeCount", getUserTypeCount);
router.get("/propertyTypeCount", getPropertyTypeAndCityCount);
router.get("/insights", getPropertyInsights);

module.exports = router;
