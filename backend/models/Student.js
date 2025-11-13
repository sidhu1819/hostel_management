import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "admin"], default: "student" },
  rollNumber: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  year: { type: Number, required: true },
  roomNumber: { type: String },
  phone: { type: String },
  guardianName: { type: String },
  guardianPhone: { type: String },
  dateOfJoining: { type: Date, default: Date.now }
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
