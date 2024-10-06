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

const showPropertyController = async (req, res, next) => {

    var userId = req.payload.aud;
    var { limit } = req.body;
    var fetchedUserData = await UserAuthModel.findById(userId);

    if (fetchedUserData.usrType === "buyer") {
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


module.exports = { addPropertyController, showPropertyController }