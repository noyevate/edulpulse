// models/timetable_model.js

const mongoose = require('mongoose');

const TimetableSchema = new mongoose.Schema(
  {
    gradeLevel: {
      type: String,
      required: true,
      enum: [
        'JSS_1', 'JSS_2', 'JSS_3', 'SS_1', 'SS_2', 'SS_3',
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
