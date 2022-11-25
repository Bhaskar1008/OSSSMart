const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    name: { type: String, require },
    address: { type: String, require },
    state: { type: String, require },
    city: { type: String, require },
    zipcode: { type: String, require },
    contactnumber: { type: String, require },
    default: { type: String, require },

}, {
    timestamps: true
})

module.exports = mongoose.model('Address', addressSchema)