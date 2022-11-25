const mongoose = require('mongoose')
const orderDetailsSchema =new  mongoose.Schema({
    productid: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    addressid: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
    ordercreatedon: { type: Date, require },
    ordercreatedby: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    orderstatus: { type: String, require },
    paymentmode: { type: String, require },
    paymentstatus: { type: String, require },
    amountdue: { type: Number, require },
    amountpaid: { type: Number, require },
    transactionDetails:{type:String,require}

}, {
    timeStamps: true
})


module.exports = mongoose.model('OrderDetails', orderDetailsSchema)

