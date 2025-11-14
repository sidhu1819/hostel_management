import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  preferredBlock: { type: String, default: null },
  preferredRoomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", default: null },
  message: { type: String, default: "" },
  // Use TitleCase status values to match controller checks
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  assignedRoom: { type: mongoose.Schema.Types.ObjectId, ref: "Room", default: null },
  assignedBed: { type: Number, default: null },
  createdAt: { type: Date, default: Date.now },
  processedAt: { type: Date }
});

export default mongoose.model("Request", requestSchema);
