import StudentWithMeetingService from '../services/studentWithMeeting.service.js';
import { sendResponse } from '../helper/sendResponse.js';

const StudentWithMeetingController = {
    getAllMeetingByStudent: async(req, res) => {
        const response = await StudentWithMeetingService.getAllMeetingByStudentService(req.params.id)
        if(response) return sendResponse(res, {
            status: 200,
            message: 'Get meeting by study success',
            data: response,
            EC: 0
        })
        else return sendResponse(res, {
            status: 500,
            message: 'Get failed',
            EC: -1,
            data: null
        })
    },
    createStudentMeeting: async(req, res) => {
        const { student_id, meeting_id } = req.body
        if(!student_id || !meeting_id) {
            return sendResponse(res, {
                status: 400,
                message: 'student_id and meeting_id are required',
                data: null,
                EC: -1
            })
        }
        const response = await StudentWithMeetingService.createStudentMeetingService(student_id, meeting_id)
        if(response) return sendResponse(res, {
            status: 201,
            message: 'Create student meeting success',
            data: response,
            EC: 0
        })
        else return sendResponse(res, {
            status: 500,
            message: 'Create student meeting failed',
            EC: -1,
            data: null
        })
    },
    deleteStudentMeeting: async(req, res) => {
        const { student_id, meeting_id } = req.body
        if(!student_id || !meeting_id) {
            return sendResponse(res, {
                status: 400,
                message: 'student_id and meeting_id are required',
                data: null,
                EC: -1
            })
        }
        const response = await StudentWithMeetingService.deleteStudentMeetingService(student_id, meeting_id)
        if(response) return sendResponse(res, {
            status: 200,
            message: 'Delete student meeting success',
            data: response,
            EC: 0
        })
        else return sendResponse(res, {
            status: 404,
            message: 'Record not found',
            EC: -1,
            data: null
        })
    }
}

export default StudentWithMeetingController;