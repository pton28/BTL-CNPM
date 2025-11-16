const mongoose = require('mongoose')

const studentWithSessionSlotSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Student'
    },
    session: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Session'
    },
    meeting: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Meeting'
    },
    slot: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'SessionSlot'
    },
    date_signup: {
        type: Date
    }
}, { timestamps: true })

const StudentWithSessionSlot = mongoose.model('StudentWithSessionSlot', studentWithSessionSlotSchema)
module.exports = StudentWithSessionSlot

