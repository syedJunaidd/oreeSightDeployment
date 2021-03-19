const mongoose = require("mongoose");

const SentEmailsSchema = new mongoose.Schema({
  senderEmail: { type: String, required: true, allowNull: false },
  emailMessage: String,
  token: String,
  createdAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("SentEmails", SentEmailsSchema);
