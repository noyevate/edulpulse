const Timetable = require('../models/timetable');

// Create a new timetable
async function createTimetable(req, res) {
  try {
    const { gradeLevel, day, periods, createdBy } = req.body;

    const newTimetable = new Timetable({
      gradeLevel,
      day,
      periods,
      createdBy,
    });

    await newTimetable.save();
    res.status(201).json(newTimetable);
  } catch (error) {
    console.error('Error creating timetable:', error);
    res.status(500).json({ message: 'Error creating timetable', error: error.message });
  }
};

// Get timetable by ID
async function getTimetableById(req, res) {
  try {
    const { id } = req.params;
    const timetable = await Timetable.findById(id);

    if (!timetable) {
      return res.status(404).json({ message: 'Timetable not found' });
    }

    res.status(200).json(timetable);
  } catch (error) {
    console.error('Error fetching timetable by ID:', error);
    res.status(500).json({ message: 'Error fetching timetable by ID', error: error.message });
  }
};

// Get timetables by grade level
async function getTimetablesByGradeLevel(req, res) {
  try {
    const { gradeLevel } = req.params;
    const timetables = await Timetable.find({ gradeLevel });

    res.status(200).json(timetables);
  } catch (error) {
    console.error('Error fetching timetable by grade level:', error);
    res.status(500).json({ message: 'Error fetching timetable by grade level', error: error.message });
  }
};

// Update timetable by grade level
async function updateTimetableByGradeLevel(req, res) {
  try {
    const { gradeLevel } = req.params;
    const updatedData = req.body;

    const updated = await Timetable.updateMany({ gradeLevel }, updatedData);

    if (updated.modifiedCount === 0) {
      return res.status(404).json({ message: 'No timetables found for this grade level' });
    }

    res.status(200).json({ message: 'Timetables updated successfully' });
  } catch (error) {
    console.error('Error updating timetable:', error);
    res.status(500).json({ message: 'Error updating timetable', error: error.message });
  }
};

// Delete timetables by grade level
async function deleteTimetableByGradeLevel(req, res) {
  try {
    const { gradeLevel } = req.params;

    const deleted = await Timetable.deleteMany({ gradeLevel });

    if (deleted.deletedCount === 0) {
      return res.status(404).json({ message: 'No timetables found to delete for this grade level' });
    }

    res.status(200).json({ message: 'Timetables deleted successfully' });
  } catch (error) {
    console.error('Error deleting timetable:', error);
    res.status(500).json({ message: 'Error deleting timetable', error: error.message });
  }
};

module.exports = {
  createTimetable,
  getTimetableById,
  getTimetablesByGradeLevel,
  updateTimetableByGradeLevel,
  deleteTimetableByGradeLevel,
};
