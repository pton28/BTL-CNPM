const mongoose = require("mongoose")

const TutorSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Faculty"
    },
    major: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Major"
    },
    role_id: {
        type: Number,
        required: true,
        default: 1
    },
    is_active: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


const Tutor = mongoose.model("Tutor", TutorSchema);
module.exports = Tutor
