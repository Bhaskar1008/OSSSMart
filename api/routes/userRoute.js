const express = require('express');
const router = express.Router();
const User = require('../models/usermodel')
const Otp = require('../models/otpmodel')
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
        const OTP = otpGenerator.generate(6, {
            digits: true, alphabets: false, upperCase: false, specialChars: false
        });
        console.log(OTP);
        const number = mobileNumber
        let doc = await User.find({ mobileNumber: number })
        await axios.post('http://api.greenweb.com.bd/api.php')

        const otp = await Otp({
            mobileNumber: number,
            otp: OTP
        });
        if (doc.length > 0) {
            await otp.save();
            res.status(200).send({ message: "Otp send successfully!", otp });
        }
        else {
            res.status(200).send({ message: "mobile Number not Found" });
        }

        // if (doc.length > 0) {
        //     // await User.updateOne({ mobileNumber: mobileNumber }, { $set: { password: newpassword, confirmpassword: newpassword } })
        //     // res.send('password updated successfully')


        // }
        // else {
        //     res.send('Mobile Number Not Found')
        // }
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ message: err })
    }

})


router.post('/verifyOtp', async (req, res) => {
    const { password } = req.body
    console.log("password", password)
    const otpHolder = await Otp.find({
        mobileNumber: req.body.number
    })
    if (otpHolder[0].otp !== req.body.otp) return res.status(400).send("Enter Correct OTP!");
    console.log(otpHolder, "otpHolder")

    const rightOtpFind = otpHolder[otpHolder.length - 1];
    console.log(rightOtpFind, "rightotpFind")

    if (rightOtpFind.mobileNumber === req.body.number) {
        // const rightNumber = User.find({ mobileNumber: number })
        // console.log(rightNumber)
        // const user= new User.find({})
        // const user = new User({ password: password, confirmpassword: password })
        // await user.save()

        const result = await User.updateOne({ mobileNumber: req.body.number }, { $set: { password: password, confirmpassword: password } })
        console.log("result of ...", result)
        return res.status(200).send({
            message: "Password Updated Successfully!",
        });

    }
    else {
        return res.status(400).send("Your OTP was wrong!")
    }

})


module.exports = router

