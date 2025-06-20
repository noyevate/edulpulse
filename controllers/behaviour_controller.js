const StudentBehavior = require("../models/behaviour");

async function createBehavior (req, res){
  try {
    const {
      studentId,
      gradeLevel,
      incidentType,
      description,
      date,
      reportedBy,
      actionTaken,
      parentNotified
    } = req.body;

    if (!studentId || !gradeLevel || !incidentType || !description || !reportedBy) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const behavior = new StudentBehavior({
      studentId,
      gradeLevel,
      incidentType,
      description,
      date,
      reportedBy,
      actionTaken,
      parentNotified
    });

    const savedBehavior = await behavior.save();
    res.status(201).json({ message: "Behavior record created successfully", data: savedBehavior });
  } catch (error) {
    console.error("Error creating behavior record:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

async function updateBehaviorById (req, res){
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedBehavior = await StudentBehavior.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedBehavior) {
      return res.status(404).json({ message: "Behavior record not found" });
    }

    res.status(200).json({ message: "Behavior record updated successfully", data: updatedBehavior });
  } catch (error) {
    console.error("Error updating behavior record:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

async function deleteBehaviorById (req, res){
  try {
    const { id } = req.params;

    const deletedBehavior = await StudentBehavior.findByIdAndDelete(id);

    if (!deletedBehavior) {
      return res.status(404).json({ message: "Behavior record not found" });
    }

    res.status(200).json({ message: "Behavior record deleted successfully" });
  } catch (error) {
    console.error("Error deleting behavior record:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

async function getStudentBehaviour(req, res) {
  try {
    const { studentId } = req.params;

    const behaviors = await StudentBehavior.find({ studentId }).sort({ date: -1 });

    if (!behaviors || behaviors.length === 0) {
      return res.status(404).json({ message: "No behavior records found for this student." });
    }

    res.status(200).json({ message: "Behavior records retrieved successfully", data: behaviors });
  } catch (error) {
    console.error("Error fetching behavior by studentId:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  createBehavior,
  updateBehaviorById,
  deleteBehaviorById,
  getStudentBehaviour
};
