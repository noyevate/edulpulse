const User = require("../models/users")
const Student =require("../models/student")

const { generateOTP, hashPIN } = require('../utils/generate_otp');
const { sendEmail } = require('../utils/smtp_function');
const bcrypt = require('bcrypt');
const CryptoJs = require("crypto-js");

const jwt = require('jsonwebtoken')

const validateEmail = async (email) => {


    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return { status: false, message: 'Email already exists. Login to continue' };
    }

    return { status: true, message: 'Email is available' };
}


async function createAccount(req, res) {
    const { name, email, password, phone, role } = req.body;

    try {
        const emailValidation = await validateEmail(email);
        if (!emailValidation.status) {
            return res.status(400).json(emailValidation);
        }
       
        const nwePassword = await hashPIN(password);
        console.log(nwePassword)

        const otp = generateOTP();

        const user = new User({
            name,
            email,
            phone,
            role,
            password: nwePassword,
        });

        await user.save();

        // await sendEmail(email, otp);

        res.status(201).json(user);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

async function loginParent(req, res) {

    try {
       
        const user = await User.findOne({ email: req.body.email });
        

        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        if (user.role !== "Parent") {
            return res.status(404).json({ status: false, message: "User not a parent" });
        }
        console.log(user)
        // Check if password is defined
        if (!user.password || user.password === "non") {
            return res.status(404).json({ status: false, message: "Password not set" });
        }

        try {
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ status: false, message: 'Wrong Passord' });
            }

        } catch (error) {
            console.error("Decryption error:", error); // Log decryption error
            return res.status(500).json({ status: false, message: "Error decrypting password" });
        }
        
        let student = await Student.findOne({ userId: user._id }).lean(); 

        const userToken = jwt.sign(
            {
                id: user._id,
                nme: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "50d" }
        );

        const { password, otp, createdAt, updatedAt, otpExpires, ...others } = user._doc;
        res.status(201).json({ ...others, userToken, students: student });
    } catch (error) {
        console.error("Login error:", error); // Log login error
        return res.status(500).json({ status: false, message: error.message });
    }

}


module.exports = { createAccount, loginParent };