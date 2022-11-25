const mongoose=require('mongoose');

const aboutItemsSchema = new mongoose.Schema({
    productid:{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    seqno:{type:Number,require},
    description:{type:String,require},

},{
    timeStamps:true
})
const AboutItems= mongoose.model('AboutItems', aboutItemsSchema)

module.exports=AboutItems

