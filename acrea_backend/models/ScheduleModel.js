const { default: mongoose } = require('mongoose');

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
  receipt: {
    type: String,
  },
  agentName: {
    type: String,
    required: true,
  },
  agentPhone: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SchedulesModel = mongoose.model(process.env.MONGO_TABLE_Schedule_PROPERTIES_visit, ScheduleSchema);
console.log("-------------working properties-----")
module.exports = SchedulesModel;
