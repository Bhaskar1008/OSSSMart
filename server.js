const express = require('express');
const app = express();

const db = require('./api/config/db.config.js')
const Address=require('./api/models/AddressDetails.schema')
const CartFavouriteDetails=require('./api/models/CartFavouriteDetails.schema')
const Categories=require('./api/models/Categories.schema')
const Customer=require('./api/models/Customer.schema')
const ItemConfiguration=require('./api/models/ItemConfiguration.schema')
const OrderDetails=require('./api/models/OrderDetails.schema')
const reviews=require('./api/models/reviews.schema')
const Thumbnails=require('./api/models/Thumbnails.schema')
app.use(express.json());

const userRoute = require('./api/routes/customerRoute')
app.use('/api/users', userRoute)
app.get('/', (req, res) => {
    res.send('Server Working' + port)
})
const port = process.env.PORT || 5000;
app.listen(port, () => 'Server running on port ');


