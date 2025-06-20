const FeeDetails = require('../models/fee');

// CREATE a new fee
async function createFee(req, res) {
  try {
    const {
      gradeLevel,
      term,
      amount,
      dueDate,
      description,
      createdBy
    } = req.body;

    const newFee = new FeeDetails({
      gradeLevel,
      term,
      amount,
      dueDate,
      description,
      createdBy
    });

    const savedFee = await newFee.save();
    res.status(201).json(savedFee);
  } catch (error) {
    console.error('Error creating fee:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

async function getFeesByGradeLevel(req, res) {
  try {
    const { gradeLevel } = req.params;
    const fees = await FeeDetails.find({ gradeLevel });

    if (fees.length === 0) {
      return res.status(404).json({ message: 'No fees found for this grade level' });
    }

    res.status(200).json( fees );
  } catch (error) {
    console.error('Error fetching fees:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// UPDATE fee by grade level
async function updateFeeByGradeLevel(req, res) {
  try {
    const { gradeLevel } = req.params;
    const updateData = req.body;

    const updatedFees = await FeeDetails.updateMany(
      { gradeLevel },
      { $set: updateData }
    );

    if (updatedFees.modifiedCount === 0) {
      return res.status(404).json({ message: 'No fees updated for this grade level' });
    }

    res.status(200).json( updatedFees );
  } catch (error) {
    console.error('Error updating fees:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// DELETE fee by grade level
async function deleteFeeByGradeLevel(req, res) {
  try {
    const { gradeLevel } = req.params;

    const deleted = await FeeDetails.deleteMany({ gradeLevel });

    if (deleted.deletedCount === 0) {
      return res.status(404).json({ message: 'No fees found to delete for this grade level' });
    }

    res.status(200).json({ message: 'Fees deleted successfully' });
  } catch (error) {
    console.error('Error deleting fees:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

async function updateFeeByGradeLevelAndTerm (req, res) {
  try {
    const { gradeLevel, term } = req.params;
    const updateFields = req.body;

    const updatedFee = await FeeDetails.findOneAndUpdate(
      { gradeLevel, term },
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedFee) {
      return res.status(404).json({ message: "Fee not found for the specified grade level and term." });
    }

    res.status(200).json(updatedFee);
  } catch (error) {
    console.error("Error updating fee:", error);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};


module.exports = {createFee, getFeesByGradeLevel, updateFeeByGradeLevel, deleteFeeByGradeLevel, updateFeeByGradeLevelAndTerm}