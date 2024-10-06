const UserAuthModel = require("../models/UserAuthModel");
const UserPropertiesModel = require("../models/UserPropertiesModel");
const httpErrors = require("http-errors");

const addPropertyController = async (req, res, next) => {
    var userId = req.payload.aud;
    var {
        userListingType,
        usrListingName,
        usrListingDescription,
        usrListingSquareFeet,
        location,
        usrAmenities,
        usrExtraFacilities,
        usrPrice,
        userListingImage
    } = req.body;

    try {
        var fetchedUserData = await UserAuthModel.findById(userId);
        if (fetchedUserData.usrType === "agent") {
            const newPropertySetup = new UserPropertiesModel({
                agentId: userId,
                userListingType,
                usrListingName,
                usrListingDescription,
                usrListingSquareFeet,
                location,
                usrAmenities,
                usrExtraFacilities,
                usrPrice,
                userListingImage,
                usrPropertyTime: new Date(),
                usrPropertyFavorites: 0,
                usrPropertyLiveStatus: true,
                usrPropertySoldTime: null
            });
            var savedUserDetails = await newPropertySetup.save();
            res.status(200).json({
                message: "Property added Success.",
                user_property_details: savedUserDetails
            });
        } else {
            next(httpErrors.Unauthorized("Invalid UserType"))
        }

    } catch (error) {
        next(httpErrors.BadRequest())
    }



}

const showBuyerPropertyController = async (req, res, next) => {

    var userId = req.payload.aud;
    var { limit } = req.body;
    var fetchedUserData = await UserAuthModel.findById(userId);

    if (fetchedUserData.usrType === "buyer"  || UserAuthModel.usrType === null) {

        try {
            const usrPropertiesArr = limit
                ? await UserPropertiesModel.find().sort({ usrPropertyTime: -1 }).limit(limit)
                : await UserPropertiesModel.find().sort({ usrPropertyTime: -1 });
            res.status(200).json({
                message: "Property record fetched success.",
                user_property_arr: usrPropertiesArr
            });
        } catch (error) {
            next(httpErrors.BadRequest())
        }
    }
}

const showPropertyController = async (req, res, next) => {

    var userId = req.payload.aud;
    var { limit } = req.body;
    var fetchedUserData = await UserAuthModel.findById(userId);
        try {
            const usrPropertiesArr = limit
                ? await UserPropertiesModel.find().sort({ usrPropertyTime: -1 }).limit(limit)
                : await UserPropertiesModel.find().sort({ usrPropertyTime: -1 });
            res.status(200).json({
                message: "Property record fetched success.",
                user_property_arr: usrPropertiesArr
            });
        } catch (error) {
            next(httpErrors.BadRequest())
        }
}

const showAgentPropertyController = async (req, res, next) => {
    var userId = req.payload.aud; // Assuming userId is stored in the payload
    var { limit } = req.body;
    var fetchedUserData = await UserAuthModel.findById(userId);
    
    try {
        
        if (fetchedUserData.usrType === "agent") {
            const  agentId  = userId;
            const usrPropertiesArr = limit
                ? await UserPropertiesModel.find({ agentId }).sort({ usrPropertyTime: -1 }).limit(limit)
                : await UserPropertiesModel.find({ agentId }).sort({ usrPropertyTime: -1 });

            res.status(200).json({
                message: "Property record fetched successfully.",
                user_property_arr: usrPropertiesArr
            });
        } else {
            return next(httpErrors.Unauthorized("Your Property record fetched success."));
        }
    } catch (error) {
        next(httpErrors.BadRequest());
    }
};



module.exports = { addPropertyController, showBuyerPropertyController, showPropertyController, showAgentPropertyController }