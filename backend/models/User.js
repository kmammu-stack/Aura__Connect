const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            default: null, // null when anonymous
        },

        password: {
            type: String,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
        },

        interests: {
            type: [String],
            default: [],
            validate: {
                validator: (arr) => arr.length <= 10,
                message: "You can add up to 10 interests only",
            },
        },

        mode: {
            type: String,
            enum: {
                values: ["work", "social", "chill"],
                message: 'Mode must be "work", "social", or "chill"',
            },
            default: "work",
        },

        auraScore: {
            type: Number,
            default: 50,
            min: 0,
            max: 100,
        },

        jobTitle: {
            type: String,
            trim: true,
            default: null,
        },

        bio: {
            type: String,
            trim: true,
            default: null,
        },
    },
    {
        timestamps: true, // auto adds createdAt and updatedAt
    }
);

module.exports = mongoose.model("User", userSchema);