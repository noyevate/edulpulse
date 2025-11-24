const mongoose = require('mongoose');

const FeeDetailsSchema = new mongoose.Schema(
  {
    gradeLevel: {
      type: String,
      enum: [
        '100', '200', '300', '400', '500', '600',
      ],
      required: true
    },
    term: 
      { type: String, required: true, enum: [ '1semester', '2semester'] },
    
    amount: {
      type: Number,
      required: true
    },
    dueDate: {
      type: Date,
      required: true
    },
    description: {
      type: String
    },
    createdBy: {
      type: String,
      required: true
    },
    updatedBy: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model( 'FeeDetails', FeeDetailsSchema );
