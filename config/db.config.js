const mongoose = require('mongoose')
var mongoURL = 'mongodb+srv://geetha:geethaadk@geethamadhuri.5hyoe.mongodb.net/OSSSMART'
mongoose.connect(mongoURL,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
var db = mongoose.connection
db.on('connected', () => {
    console.log('MongoDB connection established')
})
db.on('error', () => {
    console.log('MongoDB connection failed')
})

module.exports = mongoose