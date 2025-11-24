// models/timetable_model.js

const mongoose = require('mongoose');

const TimetableSchema = new mongoose.Schema(
  {
    gradeLevel: {
      type: String,
      required: true,
      enum: [
        '100L', '200L', '300L', '400L', '500L', '600L',
      ],
    },
    day: {
      type: String,
      required: true,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    },
    periods: [
      {
        subject: { type: String, required: true },
        startTime: { type: String, required: true }, // e.g. "08:00"
        endTime: { type: String, required: true },   // e.g. "08:40"
      },
    ],
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Timetable', TimetableSchema);
