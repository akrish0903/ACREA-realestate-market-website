const mongoose = require("mongoose");

const userFavoritePropertySchema = new mongoose.Schema({
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAuthModel",
        required: true,
    },
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserPropertiesModel",
        required: true,
    }
});

const UserFavoritePropertiesModel = mongoose.model("UserFavoriteProperties", userFavoritePropertySchema);
module.exports = UserFavoritePropertiesModel;
