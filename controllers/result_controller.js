const Result = require('../models/result')

async function addResult(req, res) {
    try {
    const {
      studentId,
      fullName,
      gradeLevel,
      term,
      session,
      subjects,
      classTeacherRemark,
      principalRemark,
      createdBy
    } = req.body;

    // Calculate totalScore and average
    let total = 0;
    const updatedSubjects = subjects.map(subject => {
      const ca = subject.caScore || 0;
      const exam = subject.examScore || 0;
      const totalScore = ca + exam;

      total += totalScore;

      // Grade logic
      let grade = 'F';
      let remark = 'Poor';

      if (totalScore >= 70) {
        grade = 'A';
        remark = 'Excellent';
      } else if (totalScore >= 60) {
        grade = 'B';
        remark = 'Good';
      } else if (totalScore >= 50) {
        grade = 'C';
        remark = 'Fair';
      } else if (totalScore >= 40) {
        grade = 'D';
        remark = 'Weak';
      }

      return {
        subject: subject.subject,
        caScore: ca,
        examScore: exam,
        totalScore,
        grade,
        remark
      };
    });

    const average = total / subjects.length;

    const result = new Result({
      studentId,
      fullName,
      gradeLevel,
      term,
      session,
      subjects: updatedSubjects,
      average,
      classTeacherRemark,
      principalRemark,
      createdBy
    });

    await result.save();

    res.status(201).json( result );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


async function getStudentResult( req, res) {
    try {
    const { studentId } = req.params;
    const results = await Result.find({ studentId }).sort({ createdAt: -1 });

    if (results.length === 0) {
      return res.status(404).json({ message: "No results found for this student." });
    }

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}




module.exports = {addResult, getStudentResult}