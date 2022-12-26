const express = require('express');
const router = express.Router();
const Category = require("../models/Categories.schema")


router.post('/', async (req, res) => {
    const { categoryname, categorydescription } = req.body

    try {
        const newCategory = new Category({
            categoryname: categoryname,
            categorydescription: categorydescription
        })
        await newCategory.save()
        res.status(200).json({ msg: "new Category Added SuccessFully", newCategory: newCategory });
    }
    catch (err) {
        return res.status(400).json({ message: err })
    }
})

router.get('/', async (req, res) => {
    try {
        const address = await Category.find({})
        res.status(200).json({ msg: "Address Fetched Successsfully", address: address });
    }
    catch (err) {
        return res.status(400).json({ message: err })
    }
})














module.exports = router