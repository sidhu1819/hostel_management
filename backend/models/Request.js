import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  preferredBlock: { type: String, default: null },
  preferredRoomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", default: null },
  message: { type: String, default: "" },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  assignedRoom: { type: mongoose.Schema.Types.ObjectId, ref: "Room", default: null },
  assignedBed: { type: Number, default: null },
  createdAt: { type: Date, default: Date.now },
  processedAt: { type: Date }
});

export default mongoose.model("Request", requestSchema);
