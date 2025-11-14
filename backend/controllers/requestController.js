import Request from "../models/Request.js";
import Room from "../models/Room.js";
import Student from "../models/Student.js";

// Approve a request and assign room
export const approveRequest = async (req, res) => {
  try {
    const { roomId } = req.body;
    const request = await Request.findById(req.params.id).populate("student");

    if (!request) return res.status(404).json({ message: "Request not found" });
    if (request.status !== "Pending")
      return res.status(400).json({ message: "Request already processed" });

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    // Check if room has space
    if (room.occupants.length >= room.capacity)
      return res.status(400).json({ message: "Room is full" });

    const student = request.student;

    // Remove student from old room if assigned
    if (student.roomNumber) {
      const oldRoom = await Room.findOne({ _id: student.roomNumber });
      if (oldRoom) {
        oldRoom.occupants = oldRoom.occupants.filter(
          (id) => id.toString() !== student._id.toString()
        );
        await oldRoom.save();
      }
    }

    // Assign student to new room
    room.occupants.push(student._id);
    await room.save();

    student.roomNumber = room._id;
    await student.save();

    request.status = "Approved";
    await request.save();

    res.json({ message: "Request approved and room assigned", request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reject request
export const rejectRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });
    if (request.status !== "Pending")
      return res.status(400).json({ message: "Request already processed" });

    request.status = "Rejected";
    await request.save();

    res.json({ message: "Request rejected", request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
