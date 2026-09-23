const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");

const makeAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        const user = await User.findOneAndUpdate(
            { email: "admin@coursehub.com" },
            { role: "admin" },
            { new: true }
        );

        if (!user) {
            console.log("Admin user not found");
            process.exit(1);
        }

        console.log("User role updated successfully!");
        console.log("Email:", user.email);
        console.log("Role:", user.role);

        process.exit(0);

    } catch (error) {
        console.error("Error updating user:", error);
        process.exit(1);
    }
};

makeAdmin();