const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    mobileNumber: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    otp: {
        type: String,
    },
    createdAt: { type: Date, default: Date.now, index: { expires: 600 } }
},
    {
        timestamps: true
    });


module.exports = mongoose.model("Otp", otpSchema);