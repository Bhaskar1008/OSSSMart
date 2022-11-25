const mongoose = require('mongoose')

const itemConfigurationSchema = mongoose.Schema({
    brand: { type: String, require },
    modelname: { type: String, require },
    color: { type: String, require },
    formfactor: { type: String, require },
    specialfeature: { type: String, require },
    connectivitytechnology: { type: String, require },
    itemdimensions_L_W_H: '3.58 x 0.6 x 3.64 inches',
    itemweight: { type: String, require },
    finalprice: { type: numbers, require },
    mrpprice: { type: numbers, require },
    discountpercentage: { type: numbers, require },

}, {
    timeStamps: true
})


module.exports = mongoose.model('ItemConfiguration', itemConfigurationSchema)


