import mongoose from "mongoose";

const bedSchema = new mongoose.Schema({
  bedNumber: { type: Number, required: true },
  occupied: { type: Boolean, default: false },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", default: null }
});

const allocationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  bedNumber: Number,
  assignedAt: { type: Date, default: Date.now },
  releasedAt: { type: Date, default: null }
});

const roomSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true },
  block: { type: String, required: true },
  capacity: { type: Number, required: true },

  // New fields
  beds: { type: [bedSchema], default: [] },
  allocations: { type: [allocationSchema], default: [] }
});

// When creating a room automatically generate beds
roomSchema.pre("save", function (next) {
  if (this.isNew && this.beds.length === 0) {
    for (let i = 1; i <= this.capacity; i++) {
      this.beds.push({ bedNumber: i });
    }
  }
  next();
});

export default mongoose.model("Room", roomSchema);
