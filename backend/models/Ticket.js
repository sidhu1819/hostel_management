import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["Open", "In Progress", "Closed"], default: "Open" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Ticket", ticketSchema);
