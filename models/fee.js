const mongoose = require('mongoose');

const FeeDetailsSchema = new mongoose.Schema(
  {
    gradeLevel: {
      type: String,
      enum: [
        '100L', '200L', '300L', '400L', '500L', '600L',
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
