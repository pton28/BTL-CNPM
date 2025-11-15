const { sendResponse } = require('../helper/sendResponse')
const majorService = require('../services/major.service')

const majorController = {
    createMajor: async(req, res) => {
        const major = await majorService.createMajor(req.body)
        if(major) return sendResponse(res, {
            status: 201,
            message: 'Major created successfully',
            data: major,
            EC: 0
        })
        else return sendResponse(res, {
            status: 400,
            message: 'Failed to create major',
            EC: -1,
            data: null
        })
    },

    getAllMajors: async(req, res) => {
        const majors = await majorService.getAllMajors()
        if(majors !== null) return sendResponse(res, {
            status: 200,
            message: 'Get all majors successfully',
            data: majors,
            EC: 0
        })
        else return sendResponse(res, {
            status: 500,
            message: 'Failed to get majors',
            EC: -1,
            data: null
        })
    },

    getMajorById: async(req, res) => {
        const { id } = req.params
        const major = await majorService.getMajorById(id)
        if(major) return sendResponse(res, {
            status: 200,
            message: 'Get major successfully',
            data: major,
            EC: 0
        })
        else return sendResponse(res, {
            status: 404,
            message: 'Major not found',
            EC: -1,
            data: null
        })
    },

    updateMajor: async(req, res) => {
        const { id } = req.params
        const major = await majorService.updateMajor(id, req.body)
        if(major) return sendResponse(res, {
            status: 200,
            message: 'Major updated successfully',
            data: major,
            EC: 0
        })
        else return sendResponse(res, {
            status: 404,
            message: 'Major not found or update failed',
            EC: -1,
            data: null
        })
    },

    deleteMajor: async(req, res) => {
        const { id } = req.params
        const major = await majorService.deleteMajor(id)
        if(major) return sendResponse(res, {
            status: 200,
            message: 'Major deleted successfully',
            data: major,
            EC: 0
        })
        else return sendResponse(res, {
            status: 404,
            message: 'Major not found or delete failed',
            EC: -1,
            data: null
        })
    }
}

module.exports = majorController

