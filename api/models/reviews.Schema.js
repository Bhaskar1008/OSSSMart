const reviewsSchema = mongoose.Schema({
    productid: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    reviewtitle: { type: String, require },
    reviewdescription: { type: String, require },
    rating: { type: number, require },
    customername: { type: mongoose.Schema.Types.ObjectId, ref: 'Customers' },

}, {
    timeStamps: true
})

module.exports = mongoose.model('reviews', reviewsSchema)
