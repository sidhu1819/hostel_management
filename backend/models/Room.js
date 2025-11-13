import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  occupants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  status: { type: String, enum: ["Available", "Occupied"], default: "Available" }
});

export default mongoose.model("Room", roomSchema);
