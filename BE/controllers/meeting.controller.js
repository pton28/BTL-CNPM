const { sendResponse } = require('../helper/sendResponse')
const meetingService = require('../services/meeting.service')

const meetingController = {
    createMeeting: async(req, res) => {
        const meeting = await meetingService.createMeeting(req.body)
        if(meeting) return sendResponse(res, {
            status: 201,
            message: 'Meeting created successfully',
            data: meeting,
            EC: 0
        })
        else return sendResponse(res, {
            status: 400,
            message: 'Failed to create meeting',
            EC: -1,
            data: null
        })
    },

    getAllMeetings: async(req, res) => {
        const meetings = await meetingService.getAllMeetings()
        if(meetings !== null) return sendResponse(res, {
            status: 200,
            message: 'Get all meetings successfully',
            data: meetings,
            EC: 0
        })
        else return sendResponse(res, {
            status: 500,
            message: 'Failed to get meetings',
            EC: -1,
            data: null
        })
    },

    getMeetingById: async(req, res) => {
        const { id } = req.params
        const meeting = await meetingService.getMeetingById(id)
        if(meeting) return sendResponse(res, {
            status: 200,
            message: 'Get meeting successfully',
            data: meeting,
            EC: 0
        })
        else return sendResponse(res, {
            status: 404,
            message: 'Meeting not found',
            EC: -1,
            data: null
        })
    },

    updateMeeting: async(req, res) => {
        const { id } = req.params
        const meeting = await meetingService.updateMeeting(id, req.body)
        if(meeting) return sendResponse(res, {
            status: 200,
            message: 'Meeting updated successfully',
            data: meeting,
            EC: 0
        })
        else return sendResponse(res, {
            status: 404,
            message: 'Meeting not found or update failed',
            EC: -1,
            data: null
        })
    },

    deleteMeeting: async(req, res) => {
        const { id } = req.params
        const meeting = await meetingService.deleteMeeting(id)
        if(meeting) return sendResponse(res, {
            status: 200,
            message: 'Meeting deleted successfully',
            data: meeting,
            EC: 0
        })
        else return sendResponse(res, {
            status: 404,
            message: 'Meeting not found or delete failed',
            EC: -1,
            data: null
        })
    }
}

module.exports = meetingController

