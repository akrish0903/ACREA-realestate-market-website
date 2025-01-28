//acrea_backend/models/UserAuthModel.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    usrFullName: {
        type: String,
        required: true,
    },
    usrEmail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
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
    },
    usrProfileUrl: {
        type: String,
    },
    userBio: {
        type: String,
    }
    ,
    usrStatus: {
        type: Boolean,
    }
})

userSchema.pre("save", async function (next) {
    try {
        console.log("This is middleware is called before the user save is done")
        console.log(this.usrPassword)
        if (this.isModified("usrPassword")) {
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(this.usrPassword, salt);
            this.usrPassword = hashPass;
            console.log(this.usrPassword);
        }
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
})

userSchema.post("save", async function (next) {
    try {
        console.log("This is middleware is called when the user save is done")
    } catch (error) {
    }
})

// password checker method with own name
userSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.usrPassword)
    } catch (error) {
        throw error;
    }
}

const UserAuthModel = mongoose.model(process.env.MONGO_TABLE_USERS, userSchema);
console.log("-------------working-----")
module.exports = UserAuthModel;