const Holiday = require("../models/holiday");

async function createHoliday (req, res) {
  try {
    const { title, description, startDate, endDate, createdBy } = req.body;

    if (!title || !startDate || !endDate || !createdBy) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const holiday = new Holiday({
      title,
      description,
      startDate,
      endDate,
      createdBy,
    });

    const savedHoliday = await holiday.save();
    res.status(201).json(savedHoliday);
  } catch (error) {
    console.error("Error creating holiday:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

async function updateHolidayById (req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedHoliday = await Holiday.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedHoliday) {
      return res.status(404).json({ message: "Holiday not found" });
    }

    res.status(200).json(updatedHoliday);
  } catch (error) {
    console.error("Error updating holiday:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

async function deleteHolidayById (req, res) {
  try {
    const { id } = req.params;

    const deletedHoliday = await Holiday.findByIdAndDelete(id);

    if (!deletedHoliday) {
      return res.status(404).json({ message: "Holiday not found" });
    }

    res.status(200).json({ message: "Holiday deleted successfully" });
  } catch (error) {
    console.error("Error deleting holiday:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createHoliday,
  updateHolidayById,
  deleteHolidayById,
};
