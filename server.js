const express = require('express');
const app = express();

const db = require('./config/db.config')
const Address=require('./models/AddressDetails.schema')
const CartFavouriteDetails=require('./models/CartFavouriteDetails.schema')
const Categories=require('./models/Categories.schema')
const Customer=require('./models/Customer.schema')
const ItemConfiguration=require('./models/ItemConfiguration.schema')
const OrderDetails=require('./models/OrderDetails.schema')
const reviews=require('./models/reviews.schema')
const Thumbnails=require('./models/Thumbnails.schema')
app.use(express.json());

const userRoute = require('./routes/customerRoute')
const addressRoute=require('./routes/addressRoute')
app.use('/api/users', userRoute)
app.use('/api/address',addressRoute)
app.get('/', (req, res) => {
    res.send('Server Working' + port)
})
const port = process.env.PORT || 5000;
app.listen(port, () => 'Server running on port '+port);


