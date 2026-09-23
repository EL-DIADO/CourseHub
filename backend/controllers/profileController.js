
const User = require("../models/User");

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            user
        });

    } catch (error) {
        console.error("Profile error:", error);

        res.status(500).json({
            message: "Server error while fetching profile"
        });
    }
};


const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (name) {
            user.name = name;
        }

        if (email) {
            user.email = email;
        }

        await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Profile update error:", error);

        res.status(500).json({
            message: "Server error while updating profile"
        });
    }
};


module.exports = {
    getProfile,
    updateProfile
};
