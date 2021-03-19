// "use strict";;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { strict } = require("assert");

const ProjectSchema = new Schema({
  user:{ 
  type:  mongoose.Schema.Types.ObjectId,
  ref: "User"
  },
  name : { type: String },
  startDate: { type: Date },
  statusDate: { type: Date },
  finishDate: { type: Date },
  duration : { type: String },
  budgetedCost: { type: Number },
  actualCost: { type: Number },
  totalCost: { type: Number },
  plannedWorkPercentage: { type: Number },
  workDonePercentage: { type: Number },
  budgetAtCompletion: { type: Number },
  costForRemainder: { type: Number },
  estimatedEndCost: { type: Number },
  variance: { type: Number },
  estimatedCompletionDate: { type: Date },
  remainingWork : { type: String },
  remainingWorkCost : { type: String },
  actualWork: { type: String },
  bcws: {type: Number},
  bcwp: {type: Number},
  acwp: {type: Number},
  isDeleted: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Project", ProjectSchema);
