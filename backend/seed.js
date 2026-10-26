const mongoose = require("mongoose");
require("dotenv").config();
const Classroom = require("./models/Classroom");

const classrooms = [
    // IT Department - Ground Floor
    {
        id: 1,
        name: "ig1",
        building: "IT Block",
        department: "IT Department",
        floor: "Ground Floor",
        capacity: 60,
        status: "Available",
        currentSubject: "N/A",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "Now",
        features: ["Projector", "Smart Board", "Wi-Fi"]
    },
    {
        id: 2,
        name: "ig2",
        building: "IT Block",
        department: "IT Department",
        floor: "Ground Floor",
        capacity: 60,
        status: "Occupied",
        currentSubject: "Data Structures & Algorithms",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "10:30 AM",
        features: ["Projector", "Wi-Fi", "AC"]
    },
    {
        id: 3,
        name: "ig3",
        building: "IT Block",
        department: "IT Department",
        floor: "Ground Floor",
        capacity: 65,
        status: "Available",
        currentSubject: "N/A",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "Now",
        features: ["Smart Board", "Wi-Fi"]
    },
    {
        id: 4,
        name: "ig4",
        building: "IT Block",
        department: "IT Department",
        floor: "Ground Floor",
        capacity: 60,
        status: "Occupied",
        currentSubject: "Web Programming (AngularJS)",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "11:20 AM",
        features: ["Projector", "Wi-Fi"]
    },
    {
        id: 5,
        name: "ig5",
        building: "IT Block",
        department: "IT Department",
        floor: "Ground Floor",
        capacity: 70,
        status: "Available",
        currentSubject: "N/A",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "Now",
        features: ["Projector", "Audio System", "Wi-Fi"]
    },
    {
        id: 6,
        name: "ig6",
        building: "IT Block",
        department: "IT Department",
        floor: "Ground Floor",
        capacity: 60,
        status: "Occupied",
        currentSubject: "Database Management Systems",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "09:20 AM",
        features: ["Smart Board", "Wi-Fi"]
    },

    // IT Department - First Floor
    {
        id: 7,
        name: "if1",
        building: "IT Block",
        department: "IT Department",
        floor: "First Floor",
        capacity: 60,
        status: "Available",
        currentSubject: "N/A",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "Now",
        features: ["Projector", "Wi-Fi"]
    },
    {
        id: 8,
        name: "if2",
        building: "IT Block",
        department: "IT Department",
        floor: "First Floor",
        capacity: 60,
        status: "Occupied",
        currentSubject: "Operating Systems",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "10:30 AM",
        features: ["Smart Board", "Wi-Fi"]
    },
    {
        id: 9,
        name: "if3",
        building: "IT Block",
        department: "IT Department",
        floor: "First Floor",
        capacity: 75,
        status: "Available",
        currentSubject: "N/A",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "Now",
        features: ["Projector", "AC", "Wi-Fi"]
    },
    {
        id: 10,
        name: "if4",
        building: "IT Block",
        department: "IT Department",
        floor: "First Floor",
        capacity: 60,
        status: "Occupied",
        currentSubject: "Computer Networks",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "11:20 AM",
        features: ["Projector", "Wi-Fi"]
    },
    {
        id: 11,
        name: "if5",
        building: "IT Block",
        department: "IT Department",
        floor: "First Floor",
        capacity: 60,
        status: "Available",
        currentSubject: "N/A",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "Now",
        features: ["Wi-Fi", "Smart Board"]
    },
    {
        id: 12,
        name: "if6",
        building: "IT Block",
        department: "IT Department",
        floor: "First Floor",
        capacity: 60,
        status: "Available",
        currentSubject: "N/A",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "Now",
        features: ["Projector", "Wi-Fi"]
    },

    // IT Department - Second Floor
    {
        id: 13,
        name: "is1",
        building: "IT Block",
        department: "IT Department",
        floor: "Second Floor",
        capacity: 60,
        status: "Occupied",
        currentSubject: "Cloud Computing",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "09:20 AM",
        features: ["Smart Board", "Wi-Fi"]
    },
    {
        id: 14,
        name: "is2",
        building: "IT Block",
        department: "IT Department",
        floor: "Second Floor",
        capacity: 60,
        status: "Available",
        currentSubject: "N/A",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "Now",
        features: ["Projector", "Wi-Fi"]
    },
    {
        id: 15,
        name: "is3",
        building: "IT Block",
        department: "IT Department",
        floor: "Second Floor",
        capacity: 80,
        status: "Occupied",
        currentSubject: "Artificial Intelligence",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "10:30 AM",
        features: ["Projector", "AC", "Smart Board"]
    },
    {
        id: 16,
        name: "is4",
        building: "IT Block",
        department: "IT Department",
        floor: "Second Floor",
        capacity: 60,
        status: "Available",
        currentSubject: "N/A",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "Now",
        features: ["Wi-Fi"]
    },
    {
        id: 17,
        name: "is5",
        building: "IT Block",
        department: "IT Department",
        floor: "Second Floor",
        capacity: 60,
        status: "Occupied",
        currentSubject: "Cyber Security",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "11:20 AM",
        features: ["Projector", "Wi-Fi"]
    },
    {
        id: 18,
        name: "is6",
        building: "IT Block",
        department: "IT Department",
        floor: "Second Floor",
        capacity: 60,
        status: "Available",
        currentSubject: "N/A",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "Now",
        features: ["Smart Board", "Wi-Fi"]
    },

    // B Halls
    {
        id: 19,
        name: "b1",
        building: "B Block",
        department: "B Halls",
        floor: "Ground Floor",
        capacity: 100,
        status: "Available",
        currentSubject: "N/A",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "Now",
        features: ["Audium Seating", "Projector", "Mic System"]
    },
    {
        id: 20,
        name: "b2",
        building: "B Block",
        department: "B Halls",
        floor: "Ground Floor",
        capacity: 100,
        status: "Occupied",
        currentSubject: "Engineering Physics",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "09:20 AM",
        features: ["Projector", "Mic System"]
    },
    {
        id: 21,
        name: "b3",
        building: "B Block",
        department: "B Halls",
        floor: "Ground Floor",
        capacity: 90,
        status: "Available",
        currentSubject: "N/A",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "Now",
        features: ["Projector", "Wi-Fi"]
    },
    {
        id: 22,
        name: "b4",
        building: "B Block",
        department: "B Halls",
        floor: "Ground Floor",
        capacity: 90,
        status: "Occupied",
        currentSubject: "Engineering Chemistry",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "10:30 AM",
        features: ["Smart Board"]
    },
    {
        id: 23,
        name: "b5",
        building: "B Block",
        department: "B Halls",
        floor: "First Floor",
        capacity: 110,
        status: "Available",
        currentSubject: "N/A",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "Now",
        features: ["AC", "Projector", "Sound System"]
    },
    {
        id: 24,
        name: "b6",
        building: "B Block",
        department: "B Halls",
        floor: "First Floor",
        capacity: 85,
        status: "Occupied",
        currentSubject: "Matrices & Calculus",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "11:20 AM",
        features: ["Projector"]
    },
    {
        id: 25,
        name: "b7",
        building: "B Block",
        department: "B Halls",
        floor: "First Floor",
        capacity: 85,
        status: "Available",
        currentSubject: "N/A",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "Now",
        features: ["Projector", "Wi-Fi"]
    },
    {
        id: 26,
        name: "b8",
        building: "B Block",
        department: "B Halls",
        floor: "First Floor",
        capacity: 90,
        status: "Occupied",
        currentSubject: "Basic Electrical Engg",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "09:20 AM",
        features: ["Smart Board"]
    },
    {
        id: 27,
        name: "b9",
        building: "B Block",
        department: "B Halls",
        floor: "Second Floor",
        capacity: 120,
        status: "Available",
        currentSubject: "N/A",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "Now",
        features: ["Large Auditorium", "AC", "Projector"]
    },
    {
        id: 28,
        name: "b10",
        building: "B Block",
        department: "B Halls",
        floor: "Second Floor",
        capacity: 90,
        status: "Occupied",
        currentSubject: "English Communication",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "10:30 AM",
        features: ["Audio System"]
    },
    {
        id: 29,
        name: "b11",
        building: "B Block",
        department: "B Halls",
        floor: "Second Floor",
        capacity: 90,
        status: "Available",
        currentSubject: "N/A",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "Now",
        features: ["Projector"]
    },
    {
        id: 30,
        name: "b12",
        building: "B Block",
        department: "B Halls",
        floor: "Second Floor",
        capacity: 100,
        status: "Available",
        currentSubject: "N/A",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "Now",
        features: ["Smart Board", "Wi-Fi"]
    },

    // Mechanical Department
    {
        id: 31,
        name: "m1",
        building: "Mech Block",
        department: "Mechanical",
        floor: "Ground Floor",
        capacity: 75,
        status: "Occupied",
        currentSubject: "Thermodynamics",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "09:20 AM",
        features: ["Projector", "Models Demo Area"]
    },
    {
        id: 32,
        name: "m2",
        building: "Mech Block",
        department: "Mechanical",
        floor: "Ground Floor",
        capacity: 75,
        status: "Available",
        currentSubject: "N/A",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "Now",
        features: ["Projector", "Wi-Fi"]
    },
    {
        id: 33,
        name: "m3",
        building: "Mech Block",
        department: "Mechanical",
        floor: "Ground Floor",
        capacity: 80,
        status: "Occupied",
        currentSubject: "Fluid Mechanics",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "11:20 AM",
        features: ["Smart Board"]
    },
    {
        id: 34,
        name: "m4",
        building: "Mech Block",
        department: "Mechanical",
        floor: "First Floor",
        capacity: 70,
        status: "Available",
        currentSubject: "N/A",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "Now",
        features: ["Projector"]
    },
    {
        id: 35,
        name: "m5",
        building: "Mech Block",
        department: "Mechanical",
        floor: "First Floor",
        capacity: 70,
        status: "Occupied",
        currentSubject: "Kinematics of Machinery",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "10:30 AM",
        features: ["Projector", "Wi-Fi"]
    },
    {
        id: 36,
        name: "m6",
        building: "Mech Block",
        department: "Mechanical",
        floor: "First Floor",
        capacity: 75,
        status: "Available",
        currentSubject: "N/A",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "Now",
        features: ["Smart Board"]
    },
    {
        id: 37,
        name: "m7",
        building: "Mech Block",
        department: "Mechanical",
        floor: "Second Floor",
        capacity: 65,
        status: "Available",
        currentSubject: "N/A",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "Now",
        features: ["Projector"]
    },
    {
        id: 38,
        name: "m8",
        building: "Mech Block",
        department: "Mechanical",
        floor: "Second Floor",
        capacity: 65,
        status: "Occupied",
        currentSubject: "Manufacturing Tech",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "09:20 AM",
        features: ["Projector"]
    },
    {
        id: 39,
        name: "m9",
        building: "Mech Block",
        department: "Mechanical",
        floor: "Second Floor",
        capacity: 70,
        status: "Available",
        currentSubject: "N/A",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "Now",
        features: ["Smart Board", "Wi-Fi"]
    },

    // A Halls
    {
        id: 40,
        name: "a1",
        building: "A Block",
        department: "A Halls",
        floor: "Ground Floor",
        capacity: 50,
        status: "Available",
        currentSubject: "N/A",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "Now",
        features: ["Projector"]
    },
    {
        id: 41,
        name: "a2",
        building: "A Block",
        department: "A Halls",
        floor: "Ground Floor",
        capacity: 50,
        status: "Occupied",
        currentSubject: "Environmental Science",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "10:30 AM",
        features: ["Wi-Fi"]
    },
    {
        id: 42,
        name: "a3",
        building: "A Block",
        department: "A Halls",
        floor: "Ground Floor",
        capacity: 55,
        status: "Available",
        currentSubject: "N/A",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "Now",
        features: ["Smart Board"]
    },
    {
        id: 43,
        name: "a4",
        building: "A Block",
        department: "A Halls",
        floor: "First Floor",
        capacity: 50,
        status: "Occupied",
        currentSubject: "Engineering Graphics",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "11:20 AM",
        features: ["Drawing Boards", "Projector"]
    },
    {
        id: 44,
        name: "a5",
        building: "A Block",
        department: "A Halls",
        floor: "First Floor",
        capacity: 50,
        status: "Available",
        currentSubject: "N/A",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "Now",
        features: ["Projector", "Wi-Fi"]
    },
    {
        id: 45,
        name: "a6",
        building: "A Block",
        department: "A Halls",
        floor: "First Floor",
        capacity: 55,
        status: "Available",
        currentSubject: "N/A",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "Now",
        features: ["Smart Board"]
    },
    {
        id: 46,
        name: "a7",
        building: "A Block",
        department: "A Halls",
        floor: "Second Floor",
        capacity: 60,
        status: "Occupied",
        currentSubject: "Applied Mathematics",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "09:20 AM",
        features: ["Projector"]
    },
    {
        id: 47,
        name: "a8",
        building: "A Block",
        department: "A Halls",
        floor: "Second Floor",
        capacity: 60,
        status: "Available",
        currentSubject: "N/A",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "Now",
        features: ["Wi-Fi"]
    },
    {
        id: 48,
        name: "a9",
        building: "A Block",
        department: "A Halls",
        floor: "Second Floor",
        capacity: 60,
        status: "Available",
        currentSubject: "N/A",
        currentTimeSlot: "08:30 AM - 09:20 AM",
        nextAvailable: "Now",
        features: ["Smart Board", "Projector"]
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected!");

        await Classroom.deleteMany({});

        await Classroom.insertMany(classrooms);

        console.log("48 classrooms inserted successfully!");

        await mongoose.connection.close();

        console.log("Database connection closed.");
    } catch (error) {
        console.log("Error inserting classrooms:", error);
    }
}

seedDatabase();