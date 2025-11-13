import Student from "../models/Student.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register a new student
export const register = async (req, res) => {
  try {
    const { name, email, password, rollNumber, department, year, role } = req.body;

    // Validate required fields
    if (!name || !email || !password || !rollNumber || !department || !year) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if JWT_SECRET is configured
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "Server configuration error. Please contact administrator." });
    }

    // Check if student already exists
    const existingStudent = await Student.findOne({ $or: [{ email }, { rollNumber }] });
    if (existingStudent) {
      return res.status(400).json({ message: "Student with this email or roll number already exists" });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new student
    const student = new Student({
      name,
      email,
      password: hashedPassword,
      rollNumber,
      department,
      year,
      role: role || "student"
    });

    await student.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: student._id, email: student.email, role: student.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return student data (without password) and token
    res.status(201).json({
      message: "Registration successful",
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        rollNumber: student.rollNumber,
        department: student.department,
        year: student.year,
        role: student.role
      }
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message).join(', ');
      return res.status(400).json({ message: messages });
    }
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ message: `${field} already exists` });
    }
    res.status(500).json({ message: error.message || 'Registration failed' });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find student by email
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: student._id, email: student.email, role: student.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return student data (without password) and token
    res.json({
      message: "Login successful",
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        rollNumber: student.rollNumber,
        department: student.department,
        year: student.year,
        role: student.role
      }
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message).join(', ');
      return res.status(400).json({ message: messages });
    }
    res.status(500).json({ message: error.message || 'Login failed' });
  }
};

