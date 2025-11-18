import mongoose from 'mongoose';

const StudentWithMeetingSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Student'
    },
    meeting_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true ,
        ref: 'Meeting'
    },
    status: {
        type: String,
        required: true
    },
    data_signup: {
        type: Date,
        required: true
    }
}, {
    timestamps: true, // Them timestamps neu ban muon
});

const StudentWithMeeting = mongoose.model('StudentWithMeeting', StudentWithMeetingSchema);
export default StudentWithMeeting;
