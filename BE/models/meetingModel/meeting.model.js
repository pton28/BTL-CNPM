const mongoose = require('mongoose')

const meetingSchema = new mongoose.Schema({
    title_meeting: {
        type: String,
        required: true,
        trim: true
    },
    tutor: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Tutor"
    },
    date_of_event: {
        type: Date,
        required: true
    },
    method: {
        type: String,
        required: true,
        trim: true
    },
    major: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Major'
    },
    session_count: {
        type: Number,

    } 
}, { timestamps: true })

const Meeting = mongoose.model('Meeting', meetingSchema)
module.exports = Meeting

