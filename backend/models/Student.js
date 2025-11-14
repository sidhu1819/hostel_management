import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  year: { type: String, required: true },
  role: { type: String, default: "student" },

  // NEW FIELDS for room allocation
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    default: null
  },
  bedNumber: {
    type: Number,
    default: null
  }
  ,
  // Backwards-compatible roomNumber field used by older controllers
  roomNumber: { type: String, default: null }
});

export default mongoose.model("Student", studentSchema);
