const mongoose = require("mongoose");

const OperatorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, default: "operator" }
}, { timestamps: true });

module.exports = mongoose.model("Operator", OperatorSchema);
