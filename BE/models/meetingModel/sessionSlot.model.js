import mongoose from 'mongoose';

// Khung gio?
const sessionSlotSchema = new mongoose.Schema({
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
    date: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const SessionSlot = mongoose.model('SessionSlot', sessionSlotSchema);
export default SessionSlot;
