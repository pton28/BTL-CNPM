const { sendResponse } = require('../helper/sendResponse')
const facultyService = require('../services/faculty.service')

const facultyController = {
    createFaculty: async(req, res) => {
        const faculty = await facultyService.createFaculty(req.body)
        if(faculty) return sendResponse(res, {
            status: 201,
            message: 'Faculty created successfully',
            data: faculty,
            EC: 0
        })
        else return sendResponse(res, {
            status: 400,
            message: 'Failed to create faculty',
            EC: -1,
            data: null
        })
    },

    getAllFaculties: async(req, res) => {
        const faculties = await facultyService.getAllFaculties()
        if(faculties !== null) return sendResponse(res, {
            status: 200,
            message: 'Get all faculties successfully',
            data: faculties,
            EC: 0
        })
        else return sendResponse(res, {
            status: 500,
            message: 'Failed to get faculties',
            EC: -1,
            data: null
        })
    },

    getFacultyById: async(req, res) => {
        const { id } = req.params
        const faculty = await facultyService.getFacultyById(id)
        if(faculty) return sendResponse(res, {
            status: 200,
            message: 'Get faculty successfully',
            data: faculty,
            EC: 0
        })
        else return sendResponse(res, {
            status: 404,
            message: 'Faculty not found',
            EC: -1,
            data: null
        })
    },

    updateFaculty: async(req, res) => {
        const { id } = req.params
        const faculty = await facultyService.updateFaculty(id, req.body)
        if(faculty) return sendResponse(res, {
            status: 200,
            message: 'Faculty updated successfully',
            data: faculty,
            EC: 0
        })
        else return sendResponse(res, {
            status: 404,
            message: 'Faculty not found or update failed',
            EC: -1,
            data: null
        })
    },

    deleteFaculty: async(req, res) => {
        const { id } = req.params
        const faculty = await facultyService.deleteFaculty(id)
        if(faculty) return sendResponse(res, {
            status: 200,
            message: 'Faculty deleted successfully',
            data: faculty,
            EC: 0
        })
        else return sendResponse(res, {
            status: 404,
            message: 'Faculty not found or delete failed',
            EC: -1,
            data: null
        })
    }
}

module.exports = facultyController

