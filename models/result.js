const mongoose = require("mongoose");

const SubjectResultSchema = new mongoose.Schema({
  subject: { type: String, required: true }, // e.g. 'Mathematics'
  caScore: { type: Number, required: true }, // Continuous Assessment score
  examScore: { type: Number, required: true },
  totalScore: { type: Number, required: true }, // ca + exam
  grade: { type: String, required: true }, // A, B, C, D, etc.
  remark: { type: String }, // e.g. Excellent, Good
}, { _id: false });

const ResultSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  fullName: { type: String, required: true },
  gradeLevel: { type: String, required: true }, 
  term: { type: String, required: true, enum: [ '1semester', '2semester'] },
  session: { type: String, required: true }, // e.g. '2024/2025'
  subjects: [SubjectResultSchema], // Array of subject result objects
  average: { type: Number, required: true },
  position: { type: Number, required: false }, // optional if not yet computed
  classTeacherRemark: { type: String },
  principalRemark: { type: String },
  createdBy: { type: String, required: true }, // user ID of teacher/admin
}, {
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      delete ret.__v;
    }
  }
});

module.exports = mongoose.model("Result", ResultSchema);
