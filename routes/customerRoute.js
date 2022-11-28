const express = require('express');
const router = express.Router();
const User = require('../models/Customer.schema')
const Otp = require('../models/otp.schema')
const otpGenerator = require('otp-generator');
const axios = require("axios");

router.post('/registerUser', async (req, res) => {
    const { firstname, lastname, email, mobileNumber, password, confirmpassword } = req.body
    const newUser = new User({ firstname, lastname, email, mobileNumber, password, confirmpassword })
    try {
        if (mobileNumber === '') {
            return res.status(400).json({ message: "Enter Mobile no" });
        }
        const user = await User.findOne({ mobileNumber: mobileNumber })
        if (user) {
            return res.status(400).json({ message: "MobileNumber Already Registered" });
        }
        if (password === confirmpassword) {
            console.log('Success')
            newUser.save();
            res.send('User Registered Successfully')
        }
        else {
            res.send('Both the password and confirm password should be the same')
        }
    }
    catch (error) {
        return res.status(400).json({ message: error })
    }
})

router.post('/loginUser', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.find({ email, password })
        if (user.length > 0) {
            const currentUser = {
                firstname: user[0].firstname,
                lastname: user[0].lastname,
                email: user[0].email,
                mobileNumber: user[0].mobileNumber,
            }
            res.send(currentUser)
        }
        else {
            return res.status(400).json({ message: 'User Login Failed' })
        }
    }
    catch (err) {
        return res.status(400).json({ message: err })
    }
})


router.post('/forgotpassword', async (req, res) => {
    const { mobileNumber } = req.body
    console.log(mobileNumber, "mobileNumber")
    try {
        const number = mobileNumber
        let doc = await User.find({ mobileNumber: number })
        const response = await axios.get(`https://2factor.in/API/V1/a6c5190d-6ee3-11ed-9c12-0200cd936042/SMS/${number}/AUTOGEN`)
        //console.log(response.data, "response")

        const otp = await Otp({
            mobileNumber: number,
            id: response.data.Details
        });

        console.log(otp, "otp")
        if (doc.length > 0) {
            await otp.save();
            res.status(200).send({ message: "Otp send successfully!", otp });
        }
        else {
            res.status(200).send({ message: "mobile Number not Found" });
        }
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ message: err })
    }

})

router.post('/verifyOtp', async (req, res) => {
    const { password } = req.body
    console.log("password", password)
    console.log(req.body.id, req.body.number, "hello")
    //const response = axios.get(`https://2factor.in/API/V1/a6c5190d-6ee3-11ed-9c12-0200cd936042/SMS/VERIFY/${req.body.id}/${req.body.otp}`)
    //console.log("responseverify", response.data)
    const checkMobileNumberInOTP = await Otp.find({
        mobileNumber: req.body.number,
    })

    if (checkMobileNumberInOTP.length > 0) {
        const response = await axios.get(`https://2factor.in/API/V1/a6c5190d-6ee3-11ed-9c12-0200cd936042/SMS/VERIFY/${req.body.id}/${req.body.otp}`)
        console.log(response.data,"response")
        if (response.data.Details === 'OTP Matched') {
            const result = await User.updateOne({ mobileNumber: req.body.number }, { $set: { password: password, confirmpassword: password } })
            console.log(result, "result")
            return res.status(200).send({
                message: "Password Updated Successfully!",
            })

        } else {
            return res.status(400).send({
                message: 'OTP is Mismatched'
            })
        }

    }
    else {
        return res.status(400).send({
            message: 'OTP is Expired'
        })
    }
   
})


module.exports = router

