const express = require('express');
const router = express.Router();
const Address = require("../models/AddressDetails.schema")

router.post('/', async (req, res) => {
    const { customer_id, name, address, state, city, zipcode, contactnumber } = req.body;

    try {
        const newAddress = new Address({
            customer_id: customer_id,
            name: name,
            address: address,
            state: state,
            city: city,
            zipcode: zipcode,
            contactnumber: contactnumber,
            default: false
        })
        await newAddress.save()
        res.status(200).json({ msg: "new Address Added SuccessFully", newAddress: newAddress });
    }
    catch (err) {
        return res.status(400).json({ message: err })
    }
})

router.get('/', async (req, res) => {
    try {
        const address = await Address.find({})
        res.status(200).json({ msg: "Address Fetched Successsfully", address: address });
    }
    catch (err) {
        return res.status(400).json({ message: err })
    }
})

router.post('/deleteAddress', async (req, res) => {
    const addressid = req.body.addressid
    const defaultaddressid = req.body.defaultaddressid
    try {
        await Address.findOneAndDelete({ _id: addressid })
        res.status(200).json({ msg: "Address Deleted Successsfully" });
    }
    catch (err) {
        return res.status(400).json({ message: err })
    }
})

module.exports = router