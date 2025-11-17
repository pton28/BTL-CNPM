const StudentWithSessionSlot = require('../../models/meetingModel/studentWithSessionSlot.model')
const Student = require('../../models/student.model')

const studentWithSessionSlotService = {
    createStudentWithSessionSlot: async (studentWithSessionSlotData) => {

    },

    getAllStudentWithSessionSlots: async () => {
        try {
            const response = await StudentWithSessionSlot.find()
                .populate({
                    path: 'student',
                    select: 'id full_name email'
                })
                .populate({
                    path: 'meeting',
                    select: 'title_meeting date_of_event method'
                })
                .populate({
                    path: 'session',
                    select: 'title'
                })
                .populate({
                    path: 'slot',
                    select: 'start_time end_time location_or_link duration'
                })
            // .populate(['student', 'meeting', 'session', 'slot'])
            if (!response) return null
            return response
        } catch (error) {
            console.log('Error in getAllStudentWithSessionSlots', error)
            return null
        }
    },

    getStudentWithSessionSlotById: async (id) => {

    },

    updateStudentWithSessionSlot: async (id, updateData) => {

    },

    deleteStudentWithSessionSlot: async (id) => {

    }
}

module.exports = studentWithSessionSlotService

