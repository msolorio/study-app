const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
  clockIn: {type: Date, required: true},
  clockInHumanReadable: {type: Date, required: true},
  clockOut: {type: Date, required: true},
  clockOutHumanReadable: {type: Date, required: true},
  totalTime: {type: Number, required: true},
  tags: [String],
  notes: String
});

// add method to return representation of data in database
sessionSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    clockIn: this.clockIn,
    clockInHumanReadable: this.clockInHumanReadable,
    clockOut: this.clockOut,
    clockOutHumanReadable: this.clockOutHumanReadable,
    totalTime: this.totalTime,
    tags: this.tags,
    notes: this.notes
  };
}

const Session = mongoose.model('Sessions', sessionSchema);

module.exports = { Session };
