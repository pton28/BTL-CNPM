import mongoose from "mongoose";

const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const sessionSchema = new Schema({
    day: {
        type: String,
        enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        required: true,
    },
    date: {
        type: String, // yyyy-mm-dd
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    room: {
        type: String,
    },
    type: {
        type: String,
        enum: ["online", "offline"],
        default: "offline",
    },
});

// Week: 1 tuan cua khoa hoc
const weekSchema = new Schema({
    weekNumber: {
        type: Number,
        required: true,
    },
    sessions: {
        type: [sessionSchema],
        default: [],
    },
});

// Course: khoa hoc chua nhieu tuan
const courseSchema = new Schema(
    {
        courseId: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        tutorId: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        weeks: {
            type: [weekSchema],
            default: [],
        },
    },
    { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
