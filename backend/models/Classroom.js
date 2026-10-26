const mongoose = require("mongoose");

const classroomSchema = new mongoose.Schema({
    id: Number,
    name: String,
    building: String,
    department: String,
    floor: String,
    capacity: Number,
    status: String,
    currentSubject: String,
    currentTimeSlot: String,
    nextAvailable: String,
    features: [String]
});

module.exports = mongoose.model("Classroom", classroomSchema);