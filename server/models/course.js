const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  title: {
    type: String,
    min: 10
  },
  feature_image: {
    type: String,
    default:
      "http://www.vacation2thailand.com/wp-content/themes/vacationthilland/images/no-video.jpg"
  },
  owner_id: {
    type: String
  },
  rate_id: {
    type: String
  },
  category_name: {
    type: String
  },
  status: {
    type: String,
    default: "private"
    // private, public, pending
  },
  tags: {
    type: [String]
  },
  price: {
    type: Number
  },
  description: {
    type: String
  },
  created_at: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("COURSE", CourseSchema);
