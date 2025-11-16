const mongoose = require('mongoose')

// Khung giờ
const sessionSlotSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    session: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Session'
    },
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    },
    location_or_link: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const SessionSlot = mongoose.model('SessionSlot', sessionSlotSchema)
module.exports = SessionSlot

