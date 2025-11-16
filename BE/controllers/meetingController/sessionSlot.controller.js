const { sendResponse } = require('../../helper/sendResponse')
const sessionSlotService = require('../../services/meetingServices/sessionSlot.service')

const sessionSlotController = {
    createSessionSlot: async(req, res) => {
        const sessionSlot = await sessionSlotService.createSessionSlot(req.body)
        if(sessionSlot) return sendResponse(res, {
            status: 201,
            message: 'SessionSlot created successfully',
            data: sessionSlot,
            EC: 0
        })
        else return sendResponse(res, {
            status: 400,
            message: 'Failed to create sessionSlot',
            EC: -1,
            data: null
        })
    },

    getAllSessionSlots: async(req, res) => {
        const sessionSlots = await sessionSlotService.getAllSessionSlots()
        if(sessionSlots !== null) return sendResponse(res, {
            status: 200,
            message: 'Get all sessionSlots successfully',
            data: sessionSlots,
            EC: 0
        })
        else return sendResponse(res, {
            status: 500,
            message: 'Failed to get sessionSlots',
            EC: -1,
            data: null
        })
    },

    getSessionSlotById: async(req, res) => {
        const { id } = req.params
        const sessionSlot = await sessionSlotService.getSessionSlotById(id)
        if(sessionSlot) return sendResponse(res, {
            status: 200,
            message: 'Get sessionSlot successfully',
            data: sessionSlot,
            EC: 0
        })
        else return sendResponse(res, {
            status: 404,
            message: 'SessionSlot not found',
            EC: -1,
            data: null
        })
    },

    updateSessionSlot: async(req, res) => {
        const { id } = req.params
        const sessionSlot = await sessionSlotService.updateSessionSlot(id, req.body)
        if(sessionSlot) return sendResponse(res, {
            status: 200,
            message: 'SessionSlot updated successfully',
            data: sessionSlot,
            EC: 0
        })
        else return sendResponse(res, {
            status: 404,
            message: 'SessionSlot not found or update failed',
            EC: -1,
            data: null
        })
    },

    deleteSessionSlot: async(req, res) => {
        const { id } = req.params
        const sessionSlot = await sessionSlotService.deleteSessionSlot(id)
        if(sessionSlot) return sendResponse(res, {
            status: 200,
            message: 'SessionSlot deleted successfully',
            data: sessionSlot,
            EC: 0
        })
        else return sendResponse(res, {
            status: 404,
            message: 'SessionSlot not found or delete failed',
            EC: -1,
            data: null
        })
    }
}

module.exports = sessionSlotController

