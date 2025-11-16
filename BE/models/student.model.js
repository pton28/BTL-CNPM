const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    id_student: {
        type: String,
        required: true,
        unique: true
    },
    full_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    faculty_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true
    },
    role_id: {
        type: Number,
        required: true
    },
    is_active: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true })


const Student = mongoose.model('Student', studentSchema)
module.exports = Student
