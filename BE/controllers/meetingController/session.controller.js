const { sendResponse } = require('../../helper/sendResponse')
const sessionService = require('../../services/meetingServices/session.service')

const sessionController = {
    createSession: async(req, res) => {
        const session = await sessionService.createSession(req.body)
        if(session) return sendResponse(res, {
            status: 201,
            message: 'Session created successfully',
            data: session,
            EC: 0
        })
        else return sendResponse(res, {
            status: 400,
            message: 'Failed to create session',
            EC: -1,
            data: null
        })
    },

    getAllSessions: async(req, res) => {
        const sessions = await sessionService.getAllSessions()
        if(sessions !== null) return sendResponse(res, {
            status: 200,
            message: 'Get all sessions successfully',
            data: sessions,
            EC: 0
        })
        else return sendResponse(res, {
            status: 500,
            message: 'Failed to get sessions',
            EC: -1,
            data: null
        })
    },

    getSessionById: async(req, res) => {
        const { id } = req.params
        const session = await sessionService.getSessionById(id)
        if(session) return sendResponse(res, {
            status: 200,
            message: 'Get session successfully',
            data: session,
            EC: 0
        })
        else return sendResponse(res, {
            status: 404,
            message: 'Session not found',
            EC: -1,
            data: null
        })
    },

    updateSession: async(req, res) => {
        const { id } = req.params
        const session = await sessionService.updateSession(id, req.body)
        if(session) return sendResponse(res, {
            status: 200,
            message: 'Session updated successfully',
            data: session,
            EC: 0
        })
        else return sendResponse(res, {
            status: 404,
            message: 'Session not found or update failed',
            EC: -1,
            data: null
        })
    },

    deleteSession: async(req, res) => {
        const { id } = req.params
        const session = await sessionService.deleteSession(id)
        if(session) return sendResponse(res, {
            status: 200,
            message: 'Session deleted successfully',
            data: session,
            EC: 0
        })
        else return sendResponse(res, {
            status: 404,
            message: 'Session not found or delete failed',
            EC: -1,
            data: null
        })
    }
}

module.exports = sessionController

