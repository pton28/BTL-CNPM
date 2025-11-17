const mongoose = require('mongoose')

const majorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true })


const Major = mongoose.model('Major', majorSchema)
module.exports = Major

