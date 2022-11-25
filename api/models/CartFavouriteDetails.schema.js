const mongoose = require('mongoose');
const cartFavouriteDetailsSchema = mongoose.Schema({
    productid:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
    customerid:{type:mongoose.Schema.Types.ObjectId,ref:'Customer'},
    type:'Cart or Favourite'

},{
    timeStamps:true
})

module.exports = mongoose.model('CartFavouriteDetails', cartFavouriteDetailsSchema)