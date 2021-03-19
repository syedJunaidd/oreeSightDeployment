const mongoose = require("mongoose");

const EmailTemplateSchema = new mongoose.Schema({
  email: { type: String, required: true, allowNull: false },
  styles: String,
  css: String,
  components: String,
  html: String,
  assets: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  IsSent: { type: Boolean, default: false },
  isDeleted:{type:Boolean,default:false},
  body: String,
  date: Date,
  yearWeekNo: Number,
  userId: String,
  type: String,
  images: [String],
});

module.exports = mongoose.model('EmailTemplate', EmailTemplateSchema);