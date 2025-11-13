import Ticket from "../models/Ticket.js";
import Student from "../models/Student.js";

// Create a new ticket/complaint
export const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    const studentId = req.user._id;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const ticket = new Ticket({
      student: studentId,
      title,
      description,
      status: "Open"
    });

    await ticket.save();
    const populatedTicket = await Ticket.findById(ticket._id).populate(
      "student",
      "name email rollNumber"
    );

    res.status(201).json(populatedTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tickets (admin can see all, students see only their own)
export const getTickets = async (req, res) => {
  try {
    let tickets;

    if (req.user.role === "admin") {
      // Admin can see all tickets
      tickets = await Ticket.find()
        .populate("student", "name email rollNumber")
        .sort({ createdAt: -1 });
    } else {
      // Students can only see their own tickets
      tickets = await Ticket.find({ student: req.user._id })
        .populate("student", "name email rollNumber")
        .sort({ createdAt: -1 });
    }

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single ticket by ID
export const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate(
      "student",
      "name email rollNumber"
    );

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Students can only view their own tickets
    if (req.user.role !== "admin" && ticket.student._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update ticket status (admin only)
export const updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can update ticket status" });
    }

    const validStatuses = ["Open", "In Progress", "Closed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status. Must be: Open, In Progress, or Closed" });
    }

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.status = status;
    await ticket.save();

    const updatedTicket = await Ticket.findById(req.params.id).populate(
      "student",
      "name email rollNumber"
    );

    res.json(updatedTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a ticket (admin only, or student can delete their own)
export const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Check if user has permission
    if (req.user.role !== "admin" && ticket.student.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ message: "Ticket deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

