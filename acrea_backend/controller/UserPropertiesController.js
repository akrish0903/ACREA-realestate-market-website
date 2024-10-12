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

const showBuyerFourRecentPropertyController = async (req, res, next) => {

    var userId = req.payload.aud;
    var { limit } = req.body;
    var fetchedUserData = await UserAuthModel.findById(userId);

    if (fetchedUserData.usrType === "buyer"  || fetchedUserData.usrType === null) {

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

const showBuyerTwoFeaturesPropertyController = async (req, res, next) => {
    var userId = req.payload.aud;
    var { limit } = req.body;
    var fetchedUserData = await UserAuthModel.findById(userId);

    // Ensure only "buyer" or if user type is not set can access this feature
    if (fetchedUserData.usrType === "buyer" || fetchedUserData.usrType === null) {
        try {
            // Fetch the two properties with the highest price, sorting by usrPrice in descending order
            const topProperties = limit
                ? await UserPropertiesModel.find().sort({ usrPrice: -1 }).limit(limit)
                : await UserPropertiesModel.find().sort({ usrPrice: -1 });

            console.log("Fetched properties (sorted by price):", topProperties); // Debugging log

            res.status(200).json({
                message: "Top properties fetched successfully.",
                user_property_arr: topProperties
            });
        } catch (error) {
            console.error("Error fetching top properties: ", error);
            next(httpErrors.BadRequest());
        }
    } else {
        res.status(403).json({
            message: "You are not authorized to view this resource."
        });
    }
}

const showAdimFourRecentPropertyController = async (req, res, next) => {

    var userId = req.payload.aud;
    var { limit } = req.body;
    var fetchedUserData = await UserAuthModel.findById(userId);
    if (fetchedUserData.usrType === "admin") {
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

const showAgentRecentPropertyController = async (req, res, next) => {
    var userId = req.payload.aud;
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

const showByTypeAgentPropertyController = async (req, res, next) => {
    const userId = req.payload.aud;
    const { type, searchText } = req.body; // Capture both type and searchText
    const fetchedUserData = await UserAuthModel.findById(userId);

    try {
        if (fetchedUserData.usrType === "agent") {
            let query = { agentId: userId };

            // Add filtering by type
            if (type && type !== 'All') {
                query.userListingType = type;
            }

            // Add filtering by searchText (if provided)
            if (searchText) {
                query = {
                    ...query,
                    $or: [
                        { usrListingName: { $regex: searchText, $options: 'i' } }, // Case-insensitive match for name
                        { "location.street": { $regex: searchText, $options: 'i' } },
                        { "location.city": { $regex: searchText, $options: 'i' } },
                        { "location.state": { $regex: searchText, $options: 'i' } },
                        { "location.pinCode": { $regex: searchText, $options: 'i' } }
                    ]
                };
            }

            const usrPropertiesArr = await UserPropertiesModel.find(query).sort({ usrPropertyTime: -1 });

            res.status(200).json({
                message: "Properties fetched successfully based on the type and search.",
                user_property_arr: usrPropertiesArr
            });
        } else {
            return next(httpErrors.Unauthorized("Unauthorized access."));
        }
    } catch (error) {
        console.error("Error fetching agent properties:", error); // Add logging
        next(httpErrors.BadRequest("Failed to fetch properties"));
    }
};

const showByTypeBuyerPropertyController = async (req, res, next) => {
    const userId = req.payload.aud;
    const { type, searchText } = req.body; // Capture both type and searchText
    const fetchedUserData = await UserAuthModel.findById(userId);

    try {
        if (fetchedUserData.usrType === "buyer") {
            let query = {}; // Remove buyerId filter

            // Add filtering by type
            if (type && type !== 'All') {
                query.userListingType = type;
            }

            // Add filtering by searchText (if provided)
            if (searchText) {
                query = {
                    ...query,
                    $or: [
                        { usrListingName: { $regex: searchText, $options: 'i' } }, // Case-insensitive match for name
                        { "location.street": { $regex: searchText, $options: 'i' } },
                        { "location.city": { $regex: searchText, $options: 'i' } },
                        { "location.state": { $regex: searchText, $options: 'i' } },
                        { "location.pinCode": { $regex: searchText, $options: 'i' } }
                    ]
                };
            }

            const usrPropertiesArr = await UserPropertiesModel.find(query).sort({ usrPropertyTime: -1 });

            res.status(200).json({
                message: "Properties fetched successfully based on the type and search.",
                user_property_arr: usrPropertiesArr
            });
        } else {
            return next(httpErrors.Unauthorized("Unauthorized access."));
        }
    } catch (error) {
        console.error("Error fetching buyer properties:", error); // Add logging
        next(httpErrors.BadRequest("Failed to fetch properties"));
    }
};


const showByTypeAdminPropertyController = async (req, res, next) => {
    const userId = req.payload.aud;
    const { type, searchText } = req.body; // Capture both type and searchText
    const fetchedUserData = await UserAuthModel.findById(userId);

    try {
        if (fetchedUserData.usrType === "admin") {
            let query = {}; // Remove adminId filter

            // Add filtering by type
            if (type && type !== 'All') {
                query.userListingType = type;
            }

            // Add filtering by searchText (if provided)
            if (searchText) {
                query = {
                    ...query,
                    $or: [
                        { usrListingName: { $regex: searchText, $options: 'i' } }, // Case-insensitive match for name
                        { "location.street": { $regex: searchText, $options: 'i' } },
                        { "location.city": { $regex: searchText, $options: 'i' } },
                        { "location.state": { $regex: searchText, $options: 'i' } },
                        { "location.pinCode": { $regex: searchText, $options: 'i' } }
                    ]
                };
            }

            const usrPropertiesArr = await UserPropertiesModel.find(query).sort({ usrPropertyTime: -1 });

            res.status(200).json({
                message: "Properties fetched successfully based on the type and search.",
                user_property_arr: usrPropertiesArr
            });
        } else {
            return next(httpErrors.Unauthorized("Unauthorized access."));
        }
    } catch (error) {
        console.error("Error fetching admin properties:", error); // Add logging
        next(httpErrors.BadRequest("Failed to fetch properties"));
    }
};

module.exports = { addPropertyController, showBuyerFourRecentPropertyController, showBuyerTwoFeaturesPropertyController,
      showAdimFourRecentPropertyController, showAgentRecentPropertyController, showByTypeAgentPropertyController,
      showByTypeBuyerPropertyController, showByTypeAdminPropertyController }