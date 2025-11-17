const { sendResponse } = require('../../helper/sendResponse')
const studentWithSessionSlotService = require('../../services/meetingServices/studentWithSessionSlot.service')

const studentWithSessionSlotController = {
    createStudentWithSessionSlot: async(req, res) => {
        const studentWithSessionSlot = await studentWithSessionSlotService.createStudentWithSessionSlot(req.body)
        if(studentWithSessionSlot) return sendResponse(res, {
            status: 201,
            message: 'StudentWithSessionSlot created successfully',
            data: studentWithSessionSlot,
            EC: 0
        })
        else return sendResponse(res, {
            status: 400,
            message: 'Failed to create studentWithSessionSlot',
            EC: -1,
            data: null
        })
    },

    getAllStudentWithSessionSlots: async(req, res) => {
        const studentWithSessionSlots = await studentWithSessionSlotService.getAllStudentWithSessionSlots()
        if(studentWithSessionSlots !== null) return sendResponse(res, {
            status: 200,
            message: 'Get all studentWithSessionSlots successfully',
            data: studentWithSessionSlots,
            EC: 0
        })
        else return sendResponse(res, {
            status: 500,
            message: 'Failed to get studentWithSessionSlots',
            EC: -1,
            data: null
        })
    },

    getStudentWithSessionSlotById: async(req, res) => {
        const { id } = req.params
        const studentWithSessionSlot = await studentWithSessionSlotService.getStudentWithSessionSlotById(id)
        if(studentWithSessionSlot) return sendResponse(res, {
            status: 200,
            message: 'Get studentWithSessionSlot successfully',
            data: studentWithSessionSlot,
            EC: 0
        })
        else return sendResponse(res, {
            status: 404,
            message: 'StudentWithSessionSlot not found',
            EC: -1,
            data: null
        })
    },

    updateStudentWithSessionSlot: async(req, res) => {
        const { id } = req.params
        const studentWithSessionSlot = await studentWithSessionSlotService.updateStudentWithSessionSlot(id, req.body)
        if(studentWithSessionSlot) return sendResponse(res, {
            status: 200,
            message: 'StudentWithSessionSlot updated successfully',
            data: studentWithSessionSlot,
            EC: 0
        })
        else return sendResponse(res, {
            status: 404,
            message: 'StudentWithSessionSlot not found or update failed',
            EC: -1,
            data: null
        })
    },

    deleteStudentWithSessionSlot: async(req, res) => {
        const { id } = req.params
        const studentWithSessionSlot = await studentWithSessionSlotService.deleteStudentWithSessionSlot(id)
        if(studentWithSessionSlot) return sendResponse(res, {
            status: 200,
            message: 'StudentWithSessionSlot deleted successfully',
            data: studentWithSessionSlot,
            EC: 0
        })
        else return sendResponse(res, {
            status: 404,
            message: 'StudentWithSessionSlot not found or delete failed',
            EC: -1,
            data: null
        })
    }
}

module.exports = studentWithSessionSlotController

