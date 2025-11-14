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
  // Backwards-compatible fields: some controllers expect `roomNumber` and `occupants`
  number: { type: String },
  roomNumber: { type: String, unique: true },
  block: { type: String, default: "" },
  capacity: { type: Number, required: true },

  // Occupants (legacy controllers expect this)
  occupants: { type: [mongoose.Schema.Types.ObjectId], ref: "Student", default: [] },

  // Status for quick availability checks
  status: { type: String, enum: ["Available", "Occupied"], default: "Available" },

  // New fields
  beds: { type: [bedSchema], default: [] },
  allocations: { type: [allocationSchema], default: [] }
});

// When creating a room automatically generate beds
// Keep backwards compatibility between `number` and `roomNumber`, and
// ensure `beds` are generated based on capacity when creating a new room.
roomSchema.pre("save", function (next) {
  // Sync roomNumber <-> number
  if (this.roomNumber && !this.number) this.number = this.roomNumber;
  if (this.number && !this.roomNumber) this.roomNumber = this.number;

  if (this.isNew && this.beds.length === 0) {
    for (let i = 1; i <= this.capacity; i++) {
      this.beds.push({ bedNumber: i });
    }
  }

  // Keep status in sync with occupants/beds
  if (Array.isArray(this.occupants)) {
    this.status = this.occupants.length === 0 ? "Available" : "Occupied";
  } else if (Array.isArray(this.beds)) {
    const occupiedBeds = this.beds.filter(b => b.occupied).length;
    this.status = occupiedBeds === 0 ? "Available" : "Occupied";
  }

  next();
});

export default mongoose.model("Room", roomSchema);
