const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
  clockIn: {type: Date},
  // clockInHumanReadable: {type: Date, required: true},
  clockOut: {type: Date},
  // clockOutHumanReadable: {type: Date, required: true},
  sessionTotal: {type: Number},
  tags: [String],
  notes: String
});

// add method to return representation of data in database
sessionSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    clockIn: this.clockIn,
    // clockInHumanReadable: this.clockInHumanReadable,
    clockOut: this.clockOut,
    // clockOutHumanReadable: this.clockOutHumanReadable,
    sessionTotal: this.sessionTotal,
    tags: this.tags,
    notes: this.notes
  };
}

const Session = mongoose.model('sessions', sessionSchema);

module.exports = { Session };
