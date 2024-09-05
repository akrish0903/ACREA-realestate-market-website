const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    usrFullName: {
        type: String,
        required: true,
        required: true,
    },
    usrEmail: {
        type: String,
        required: true,
        unique: true,
    },
    usrMobileNumber: {
        type: String,
        required: true,
        unique: true,
    },
    usrPassword: {
        type: String,
        required: true,
    },
    usrType: {
        type: String,
        required: true,
    }
})
const UserAuthModel = mongoose.model("All User", userSchema);
console.log("-------------working-----")
module.exports = UserAuthModel;