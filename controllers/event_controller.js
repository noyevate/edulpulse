const UpcomingEvent = require('../models/events');

async function createEvent (req, res) {
  try {
    const {
      title,
      description,
      eventDate,
      location,
      targetAudience,
      createdBy,
      isPublished
    } = req.body;

    if (!title || !eventDate || !createdBy) {
      return res.status(400).json({ message: "Missing required fields: title, eventDate, createdBy" });
    }

    const event = new UpcomingEvent({
      title,
      description,
      eventDate,
      location,
      targetAudience,
      createdBy,
      isPublished
    });

    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

async function getSchoolEvents (req, res) {
  try {
    const events = await UpcomingEvent.find({ isPublished: true });
    if (!events || events.length === 0) {
      return res.status(404).json({ message: "No events found" });
    }
    res.status(200).json(events);
  } catch (error) {
    console.error("Error in fetching event:", error);
    res.status(500).json({ message: "Internal server error" });
  }

}

async function updateEventById (req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedEvent = await UpcomingEvent.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

async function deleteEventById (req, res) {
  try {
    const { id } = req.params;

    const deletedEvent = await UpcomingEvent.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createEvent,
  updateEventById,
  deleteEventById,
  getSchoolEvents
};
