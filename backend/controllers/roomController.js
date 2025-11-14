import Room from "../models/Room.js";
import Student from "../models/Student.js";

// ======================================================
// Get all rooms
// ======================================================
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate("occupants", "name email rollNumber");
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ======================================================
// Get single room by ID
// ======================================================
export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate("occupants", "name email rollNumber");
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ======================================================
// Create a new room
// ======================================================
export const createRoom = async (req, res) => {
  try {
    const { roomNumber, capacity } = req.body;

    const existingRoom = await Room.findOne({ roomNumber });
    if (existingRoom) {
      return res.status(400).json({ message: "Room with this number already exists" });
    }

    const room = new Room({
      roomNumber,
      capacity,
      occupants: [],
      status: "Available",
    });

    await room.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ======================================================
// Update a room
// ======================================================
export const updateRoom = async (req, res) => {
  try {
    const { roomNumber, capacity, occupants } = req.body;
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (roomNumber) room.roomNumber = roomNumber;
    if (capacity !== undefined) room.capacity = capacity;
    if (occupants) room.occupants = occupants;

    // Update status correctly
    room.status = room.occupants.length === 0 ? "Available" : "Occupied";

    await room.save();

    const updatedRoom = await Room.findById(req.params.id).populate("occupants", "name email rollNumber");
    res.json(updatedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ======================================================
// Delete a room
// ======================================================
export const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Remove room reference from students
    if (room.occupants.length > 0) {
      await Student.updateMany(
        { _id: { $in: room.occupants } },
        { $unset: { roomNumber: "" } }
      );
    }

    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ======================================================
// Assign a student to a specific room
// ======================================================
export const assignStudentToRoom = async (req, res) => {
  try {
    const { studentId } = req.body;
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Check room full
    if (room.occupants.length >= room.capacity) {
      return res.status(400).json({ message: "Room is full" });
    }

    // Remove student from old room
    if (student.roomNumber) {
      const oldRoom = await Room.findOne({ roomNumber: student.roomNumber });
      if (oldRoom) {
        oldRoom.occupants = oldRoom.occupants.filter(
          (id) => id.toString() !== studentId
        );
        oldRoom.status = oldRoom.occupants.length === 0 ? "Available" : "Occupied";
        await oldRoom.save();
      }
    }

    // Add student to room
    room.occupants.push(studentId);
    room.status = room.occupants.length === 0 ? "Available" : "Occupied";
    await room.save();

    // Update student
    student.roomNumber = room.roomNumber;
    await student.save();

    const updatedRoom = await Room.findById(req.params.id).populate("occupants", "name email rollNumber");
    res.json(updatedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ======================================================
// Remove student from room
// ======================================================
export const removeStudentFromRoom = async (req, res) => {
  try {
    const { studentId } = req.body;
    const room = await Room.findById(req.params.id);

    if (!room) return res.status(404).json({ message: "Room not found" });

    room.occupants = room.occupants.filter(
      (id) => id.toString() !== studentId
    );
    room.status = room.occupants.length === 0 ? "Available" : "Occupied";
    await room.save();

    const student = await Student.findById(studentId);
    if (student) {
      student.roomNumber = null;
      await student.save();
    }

    const updatedRoom = await Room.findById(req.params.id).populate("occupants", "name email rollNumber");
    res.json(updatedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ======================================================
// Auto-assign student to next available room
// ======================================================
export const autoAssignRoom = async (req, res) => {
  try {
    const { studentId } = req.body;

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Find room with free bed
    const room = await Room.findOne({
      $expr: { $lt: [{ $size: "$occupants" }, "$capacity"] }
    });

    if (!room) {
      return res.status(400).json({ message: "No rooms available" });
    }

    // Push student into room
    room.occupants.push(studentId);
    room.status = "Occupied";
    await room.save();

    student.roomNumber = room.roomNumber;
    await student.save();

    res.json({
      message: "Student assigned automatically",
      room,
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
