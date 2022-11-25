const mongoose = require('mongoose');

const thumbnailsSchema = mongoose.Schema({
    itemid: { type: mongoose.Schema.Types.ObjectId, ref: 'ItemConfiguration' },
    imagename: { type: String, require },
    imagelink: { type: String, require },
}, {
    timeStamps: true
})

module.exports = mongoose.model('Thumbnails', thumbnailsSchema)
