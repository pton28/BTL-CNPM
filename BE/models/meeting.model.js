const mongoose = require('mongoose')

const meetingSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title_meeting: {
        type: String,
        required: true,
        trim: true
    },
    id_tutor: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Tutor"
    },
    date_of_event: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    location_or_link: {
        type: String,
        required: true,
        trim: true
    },
    method: {
        type: String,
        required: true,
        trim: true
    },
    major_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Major'
    }
}, { timestamps: true })

const Meeting = mongoose.model('Meeting', meetingSchema)
module.exports = Meeting

