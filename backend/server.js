const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Classroom = require("./models/Classroom");
const User = require("./models/User");

const app = express();
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("Classroom Availability Checker Backend is Running!");
});

// Test API route
app.get("/api/test", (req, res) => {
    res.json({
        message: "Frontend connected to backend successfully!"
    });
});

// Get all classrooms
app.get("/api/classrooms", async (req, res) => {
    try {
        const classrooms = await Classroom.find();
        res.json(classrooms);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching classrooms",
            error: error.message
        });
    }
});
// Update classroom
app.put("/api/classrooms/:id", async (req, res) => {
    try {
        const classroom = await Classroom.findOneAndUpdate(
            { id: Number(req.params.id) },
            req.body,
            { new: true }
        );

        if (!classroom) {
            return res.status(404).json({
                message: "Classroom not found"
            });
        }

        res.json(classroom);

    } catch (error) {
        res.status(500).json({
            message: "Error updating classroom",
            error: error.message
        });
    }
});
// Reset all classrooms
app.put("/api/classrooms/reset", async (req, res) => {
    try {
        await Classroom.updateMany(
            {},
            {
                status: "Available",
                currentSubject: "N/A",
                nextAvailable: "Now"
            }
        );

        res.json({
            message: "All classrooms reset successfully!"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error resetting classrooms",
            error: error.message
        });
    }
});

// Server port
const PORT = 5000;
// Add new user
app.post("/api/users", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        res.json({
            message: "User added successfully!",
            user: user
        });

    } catch (error) {
        res.status(500).json({
            message: "Error adding user",
            error: error.message
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:5000`);
});