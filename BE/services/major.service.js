const Major = require('../models/major.model')

const majorService = {
    createMajor: async(majorData) => {
        try {
            const major = new Major(majorData)
            await major.save()
            return major
        } catch (error) {
            console.log('Error at createMajor', error)
            return null
        }
    },

    getAllMajors: async() => {
        try {
            const majors = await Major.find()
            return majors
        } catch (error) {
            console.log('Error at getAllMajors', error)
            return null
        }
    },

    getMajorById: async(id) => {
        try {
            const major = await Major.findOne({id})
            return major
        } catch (error) {
            console.log('Error at getMajorById', error)
            return null
        }
    },

    updateMajor: async(id, updateData) => {
        try {
            const major = await Major.findOneAndUpdate(
                {id},
                updateData,
                { new: true, runValidators: true }
            )
            return major
        } catch (error) {
            console.log('Error at updateMajor', error)
            return null
        }
    },

    deleteMajor: async(id) => {
        try {
            const major = await Major.findOneAndDelete({id})
            return major
        } catch (error) {
            console.log('Error at deleteMajor', error)
            return null
        }
    }
}

module.exports = majorService

