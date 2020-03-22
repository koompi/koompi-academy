const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StrRequire = {
  type: String,
  required: true
};

const PointSchema = new Schema({
  section_id: StrRequire,
  no: StrRequire,
  title: StrRequire,
  video_link: StrRequire,
  preview: false,
  created_at: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("POINT", PointSchema);
