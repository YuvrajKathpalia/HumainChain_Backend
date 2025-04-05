const mongoose = require('mongoose');

const severityEnum = ['Low', 'Medium', 'High'];

const IncidentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title!'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description!']
  },
  severity: {
    type: String,
    required: [true, 'Please specify severity level!'],
    enum: {
      values: severityEnum,
      message: '{VALUE} is not a valid severity level, try again!'
    }
  },
  reported_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Incident', IncidentSchema);