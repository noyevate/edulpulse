const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    
    
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isbn: {
      type: String,
      unique: true,
      sparse: true,
    },
    subject: {
      type: String,
      trim: true,
    },
    gradeLevel: {
      type: String,
      trim: true,
    },
    addedBy: {
      type: String, 
      required: true,
    },
    fileUrl: {
      type: String, 
    },
    coverImageUrl: {
      type: String, 
    },
    availability: {
      type: Boolean,
      default: true,
    },
    
},{
    toJSON: {
        transform(doc, ret){
            delete ret.__v;
        }
    },
    timestamps: true
});

module.exports = mongoose.model('Books', BookSchema)