const mongoose = require('mongoose')

// Mỗi meeting có nhiều buổi học
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
}, { timestamps: true })

const Session = mongoose.model('Session', sessionSchema)
module.exports = Session

