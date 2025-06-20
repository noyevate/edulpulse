// helpers/otp.js
const crypto = require('crypto');
const bcrypt = require('bcrypt')

// Function to generate a random OTP
function generateOTP() {
    return crypto.randomInt(1000, 9999).toString();
}

async function hashPIN(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

module.exports = { generateOTP, hashPIN };
