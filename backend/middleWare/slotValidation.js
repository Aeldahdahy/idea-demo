const allowedDays = ['Monday', 'Tuesday', 'Wednesday'];
const allowedTimes = ['09:00-11:00', '12:00-14:00'];

const validateSlot = (slot) => {
  const { day, time } = slot; // Make sure 'time' is used here
  return allowedDays.includes(day) && allowedTimes.includes(time); // Validate using 'time'
};

const validateMeetingSlots = (req, res, next) => {
  const slots = req.body.slots || req.body.slot || [];
  const slotArray = Array.isArray(slots) ? slots : [slots];

  const invalidSlots = slotArray.filter(slot => !validateSlot(slot));

  if (invalidSlots.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid slots detected. Please choose valid days and times.',
      invalidSlots
    });
  }

  next();
};

module.exports = { validateMeetingSlots };
