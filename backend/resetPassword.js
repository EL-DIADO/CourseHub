
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const resetPassword = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        const email = "admin@coursehub.com";
        const newPassword = "Admin@123";

        // Find the existing user
        const user = await User.findOne({ email });

        if (!user) {
            console.log("User not found:", email);
            process.exit(1);
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        user.password = hashedPassword;
        await user.save();

        console.log("Password reset successfully!");
        console.log("Email:", email);
        console.log("New password:", newPassword);

        process.exit(0);

    } catch (error) {
        console.error("Password reset error:", error);
        process.exit(1);
    }
};

resetPassword();