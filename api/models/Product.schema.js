const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    categoryid: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories' },
    productname: { type: String, require },
    productdescription: { type: String, require },
    itemid: { type: mongoose.Schema.Types.ObjectId, ref: 'ItemConfiguration' },
    colors: { type: Array, require },
    rating: { type: Number, require },
    
}, {
    timeStamps: true
})

module.exports = mongoose.model('Product', productSchema)
