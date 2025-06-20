const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    
    name: {type: String, required:true},
    email: {type: String, required:true},
    phone: {type: String, required:true},
    otp: {type: String, required:false, default:'none'},
    password: {type: String, required:false, default: "non"},
    otpExpires: {type: Date},
    verification: {type: Boolean, default:false},
    role: {type: String, default: "Parent", enum: ["Parent", "Teacher"]},
    
},{
    toJSON: {
        transform(doc, ret){
            delete ret.__v;
        }
    },
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema)