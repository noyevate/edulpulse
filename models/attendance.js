const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    
    studentId: {type: String, required:true},
    date: {type: Date, default: Date.now},
    status: {type: String, required:true, enum: ["present", "absent", "late", "excused"]},
    note: {type: String, required:false, default:'none'},
    createdBy: {type: String, required:true},
    
},{
    toJSON: {
        transform(doc, ret){
            delete ret.__v;
        }
    },
    timestamps: true
});

module.exports = mongoose.model('Attendance', AttendanceSchema)