const mongoose = require('mongoose');

const FeeDetailsSchema = new mongoose.Schema(
  {
    gradeLevel: {
      type: String,
      enum: [
        'JSS_1', 'JSS_2', 'JSS_3', 'SS_1', 'SS_2', 'SS_3',
      ],
      required: true
    },
    term: {
      type: String,
      enum: ['first_term', 'second_term', 'third_term'],
      required: true
    },
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

module.exports = mongoose.model('FeeDetails', FeeDetailsSchema);
