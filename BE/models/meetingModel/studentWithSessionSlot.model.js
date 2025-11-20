import mongoose from 'mongoose';

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
}, { timestamps: true });

// Tạo compound unique index cho cặp (student, session)
studentWithSessionSlotSchema.index({ student: 1, session: 1 }, { unique: true });

const StudentWithSessionSlot = mongoose.model('StudentWithSessionSlot', studentWithSessionSlotSchema);
export default StudentWithSessionSlot;

