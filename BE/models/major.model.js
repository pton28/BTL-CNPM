import mongoose from 'mongoose';

const majorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const Major = mongoose.model('Major', majorSchema);
export default Major;

