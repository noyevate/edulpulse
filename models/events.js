const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
    },
    targetAudience: {
      type: [String], // e.g., ["All", "Parents", "Teachers", "Grade 5"]
      default: ["All"],
    },
    createdBy: {
      type: String,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", EventSchema);
