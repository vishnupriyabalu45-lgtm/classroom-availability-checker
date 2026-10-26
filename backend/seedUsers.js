const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");

const users = [
    {
        name: "Dr. K. Arul",
        email: "staff@tce.edu",
        password: "123456",
        role: "staff",
        roleText: "Faculty / Staff"
    },
    {
        name: "M. Vignesh",
        email: "rep@tce.edu",
        password: "123456",
        role: "student_rep",
        roleText: "Student Rep"
    },
    {
        name: "S. Priya",
        email: "student@tce.edu",
        password: "123456",
        role: "student_view",
        roleText: "Regular Student"
    }
];

async function seedUsers() {
    try {

        await mongoose.connect(process.env.MONGO_URI);

        await User.deleteMany({});

        await User.insertMany(users);

        console.log("Users added successfully!");

        await mongoose.connection.close();

    } catch (error) {

        console.log("Error:", error);

    }
}

seedUsers();