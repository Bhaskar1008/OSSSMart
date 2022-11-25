const mongoose=require('mongoose');

const aboutItemsSchema = mongoose.Schema({
    productid:{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    seqno:{type:Number,require},
    description:{type:String,require},

},{
    timeStamps:true
})
module.exports = mongoose.model('AboutItems', aboutItemsSchema)

