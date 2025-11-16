const StudentWithMeeting = require('../models/studentWithMeeting.model')
const Meeting = require('../models/meetingModel/meeting.model')
const mongoose = require('mongoose')

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
                    select: '_id title_meeting date_of_event method',
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
    }
}

module.exports = StudentWithMeetingService