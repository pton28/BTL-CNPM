import mongoose from 'mongoose';

// M?i meeting co nhieu buoi hoc
const sessionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    meeting: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Meeting'
    }
}, { timestamps: true });

const Session = mongoose.model('Session', sessionSchema);
export default Session;
