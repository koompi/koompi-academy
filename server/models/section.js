const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StrRequire = {
  type: String,
  required: true
};

const SectionSchema = new Schema({
  course_id: StrRequire,
  no: StrRequire,
  title: StrRequire,
  created_at: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("SECTION", SectionSchema);
