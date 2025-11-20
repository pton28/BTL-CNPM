import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    meeting: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Meeting'
    }
}, { timestamps: true });

const Material = mongoose.model('Material', materialSchema);
export default Material;

