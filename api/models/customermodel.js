const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    firstname: { type: String, require },
    lastname: { type: String, require },
    email: { type: String, require },
    mobileNumber: { type: String, require },
    password: { type: String, require },
    confirmpassword: { type: String, require }
}, {
    timestamps: true
})

module.exports = mongoose.model('Customer', customerSchema)

