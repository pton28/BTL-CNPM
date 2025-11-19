import StudentWithMeeting from '../models/studentWithMeeting.model.js';
import Meeting from '../models/meetingModel/meeting.model.js';
import mongoose from 'mongoose';

const StudentWithMeetingService = {
    getAllMeetingByStudentService: async(studentId) => {
        try {
            // Test populate meeting_id
            const response = await StudentWithMeeting.find()
                .populate({
                        path: 'student_id',
                        select: 'full_name email id_student'
                    })
                .populate({
                    path: 'meeting_id',
                    model: 'Meeting',
                    select: '_id title_meeting date_of_event method major tutor session_count',
                })
                    
            if(!response) return null

            let filter_response = []
            response.forEach(item => {
                if(item.student_id && item.student_id._id && item.student_id._id == studentId){
                    filter_response.push(item)
                }
            })
            return filter_response
        } catch (error) {
            console.log('Error in getAllMeetingByStudentService', error)
            console.log('Error details:', error.message)
            return null            
        }
    },
    createStudentMeetingService: async(studentId, meetingId) => {
        try {
            const payload = {
                student_id: studentId,
                meeting_id: meetingId,
                status: 'studying',
                data_signup: new Date()
            }
            const checkExist = await StudentWithMeeting.findOne({
                student_id: studentId,
                meeting_id: meetingId
            })
            if(checkExist) return null
            const createdRecord = await StudentWithMeeting.create(payload)
            return createdRecord
        } catch (error) {
            console.log('Error in createStudentMeetingService', error)
            console.log('Error details:', error.message)
            return null
        }
    },
    deleteStudentMeetingService: async(studentId, meetingId) => {
        try {
            const deletedRecord = await StudentWithMeeting.findOneAndDelete({
                student_id: studentId,
                meeting_id: meetingId
            })
            return deletedRecord
        } catch (error) {
            console.log('Error in deleteStudentMeetingService', error)
            console.log('Error details:', error.message)
            return null
        }
    }
}

export default StudentWithMeetingService;
