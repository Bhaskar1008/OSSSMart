const express = require('express');
const app = express();

const db = require('./api/config/db.config.js')

app.use(express.json());

const userRoute = require('./api/routes/userRoute')
app.use('/api/users', userRoute)
app.get('/', (req, res) => {
    res.send('Server Working' + port)
})
const port = process.env.PORT || 5000;
app.listen(port, () => 'Server running on port ');


