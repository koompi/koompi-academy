const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StrRequire = {
  type: String,
  required: true
};

const ListeItemSchema = new Schema({
  course_id: StrRequire,
  title: StrRequire,
  type: {
    type: String,
    default: "point"
  },
  section: Number,
  point: Number,
  preview: {
    type: Boolean,
    default: false
  },
  description: StrRequire,
  created_at: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("LISTITEM", ListeItemSchema);
