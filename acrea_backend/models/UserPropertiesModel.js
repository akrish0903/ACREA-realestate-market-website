const { default: mongoose } = require("mongoose");

const userPropertySchema = new mongoose.Schema({
    agentId: {
        type: String,
        required: true,
    },
    usrPropertyTime: {
        type: Date,
        default: Date.now,
    },
    usrPropertyFavorites: {
        type: Number
    },
    usrPropertyLiveStatus: {
        type: Boolean,  
    },
    usrPropertySoldTime: {
        type: Date,
        default: null,
    },
    userListingType: {
        type: String,
        required: true,
        default: "Land",
    },
    usrListingName: {
        type: String,
        required: true,
    },
    usrListingDescription: {
        type: String,
    },
    usrListingSquareFeet: {
        type: Number,
        required: true,
        default: 0,
    },
    location: {
        street: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        pinCode: {
            type: Number,
        },
    },
    usrAmenities: {
        type: [String],
    },
    usrExtraFacilities: {
        beds: {
            type: Number,
            default: 0,
        },
        bath: {
            type: Number,
            default: 0,
        },
    },
    usrPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    userListingImage: {
        type: String,
    },
    
});


const UserPropertiesModel = mongoose.model(process.env.MONGO_TABLE_PROPERTIES, userPropertySchema);
console.log("-------------working properties-----")
module.exports = UserPropertiesModel;