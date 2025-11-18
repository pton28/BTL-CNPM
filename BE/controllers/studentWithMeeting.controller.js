import StudentWithMeetingService from '../services/studentWithMeeting.service.js';
import { sendResponse } from '../helper/sendResponse.js';

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

export default StudentWithMeetingController;
