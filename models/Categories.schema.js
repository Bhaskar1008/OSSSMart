const mongoose = require('mongoose');

const categoriesSchema =new  mongoose.Schema({
    categoryname: { type: String, require },
    categorydescription: { type: String, require },
},{
    timeStamps: true
})

module.exports = mongoose.model('Categories', categoriesSchema)