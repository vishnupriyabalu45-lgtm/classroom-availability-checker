const mongoose = require("mongoose");
require("dotenv").config();

const Classroom = require("./models/Classroom");

async function resetClassrooms() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        await Classroom.updateMany(
            {},
            {
                $set: {
                    status: "Available",
                    currentSubject: "N/A",
                    nextAvailable: "Now"
                }
            }
        );

        console.log("All classrooms reset successfully!");

        await mongoose.connection.close();

    } catch (error) {
        console.log("Error:", error);
    }
}

resetClassrooms();