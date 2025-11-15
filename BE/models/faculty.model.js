const mongoose = require('mongoose')

const facultySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true })

const Faculty = mongoose.model('Faculty', facultySchema)
module.exports = Faculty

