const StudentWithMeetingService = require('../services/studentWithMeeting.service')
const { sendResponse } = require('../helper/sendResponse')

const StudentWithMeetingController = {
    getAllMeetingByStudent: async(req, res) => {
        const response = await StudentWithMeetingService.getAllMeetingByStudentService(req.query.studentId)
        if(response) return sendResponse(res, {
            status: 200,
            message: 'Get success',
            data: response,
            EC: 0
        })
        else return sendResponse(res, {
            status: 500,
            message: 'Get failed',
            EC: -1,
            data: null
        })
    }
}

module.exports = StudentWithMeetingController