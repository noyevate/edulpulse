const mongoose = require("mongoose");

const BehaviorSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
    },
    gradeLevel: {
      type: String,
      required: true,
    },
    incidentType: {
      type: String,
      enum: ["Positive", "Warning", "Disciplinary", "Suspension"], // customizable
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    reportedBy: {
      type: String,
      ref: "User", // likely a teacher or admin
      required: true,
    },
    actionTaken: {
      type: String,
    },
    parentNotified: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Behaviour", BehaviorSchema);
