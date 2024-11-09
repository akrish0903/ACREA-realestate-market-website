const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  propertyId: {
    type: Object,
    required: true,
  },
  agentId: {
    type: Object,
    required: true,
  },
  buyerId: {
    type: Object,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  buyerName: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
