const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    
    userId: {type: String, required:true, },
    s_name: {type: String, required:true},
    s_dob: {type: String, required:true},
    s_gender: {type: String, required:false, default:'male', enum: ["male", "female"]},
    s_blood_group: {type: String, required:false, default: "non"},
    s_father_name: {type: String, required:false, default: "non"},
    s_mother_name: {type: String, required:false, default: "non"},
    s_class: {type: String, default:false, },
    s_address: {type: String, required:false, default: "non"},
    s_img: {type: String, required:false, default: "non"},
    s_id: {type: String, required:false, default: "non"},
    
},{
    toJSON: {
        transform(doc, ret){
            delete ret.__v;
        }
    },
    timestamps: true
});

module.exports = mongoose.model('Student', StudentSchema)