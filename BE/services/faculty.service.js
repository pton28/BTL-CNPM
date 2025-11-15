const Faculty = require('../models/faculty.model')

const facultyService = {
    createFaculty: async(facultyData) => {
        try {
            const faculty = new Faculty(facultyData)
            await faculty.save()
            return faculty
        } catch (error) {
            console.log('Error at createFaculty', error)
            return null
        }
    },

    getAllFaculties: async() => {
        try {
            const faculties = await Faculty.find()
            return faculties
        } catch (error) {
            console.log('Error at getAllFaculties', error)
            return null
        }
    },

    getFacultyById: async(id) => {
        try {
            const faculty = await Faculty.findOne({id})
            return faculty
        } catch (error) {
            console.log('Error at getFacultyById', error)
            return null
        }
    },

    updateFaculty: async(id, updateData) => {
        try {
            const faculty = await Faculty.findOneAndUpdate(
                {id},
                updateData,
                { new: true, runValidators: true }
            )
            return faculty
        } catch (error) {
            console.log('Error at updateFaculty', error)
            return null
        }
    },

    deleteFaculty: async(id) => {
        try {
            const faculty = await Faculty.findOneAndDelete({id})
            return faculty
        } catch (error) {
            console.log('Error at deleteFaculty', error)
            return null
        }
    }
}

module.exports = facultyService

