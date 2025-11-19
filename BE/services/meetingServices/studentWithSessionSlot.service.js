import StudentWithSessionSlot from '../../models/meetingModel/studentWithSessionSlot.model.js';

const studentWithSessionSlotService = {
    createStudentWithSessionSlot: async (studentWithSessionSlotData) => {
        try {
            const checkExist = await StudentWithSessionSlot.findOne({
                student: studentWithSessionSlotData.student,
                session: studentWithSessionSlotData.session,
                meeting: studentWithSessionSlotData.meeting,
                slot: studentWithSessionSlotData.slot
            })
            if(checkExist) return null

            const payload = {
                ...studentWithSessionSlotData,
                date_signup: studentWithSessionSlotData.date_signup || new Date()
            }
            const studentWithSessionSlot = await StudentWithSessionSlot.create(payload)
            return studentWithSessionSlot
        } catch (error) {
            console.log('Error in createStudentWithSessionSlot', error)
            return null
        }
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
        try {
            const studentWithSessionSlot = await StudentWithSessionSlot.findById(id)
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
            return studentWithSessionSlot
        } catch (error) {
            console.log('Error in getStudentWithSessionSlotById', error)
            return null
        }
    },

    updateStudentWithSessionSlot: async (id, updateData) => {
        try {
            const studentWithSessionSlot = await StudentWithSessionSlot.findByIdAndUpdate(
                id,
                updateData,
                { new: true, runValidators: true }
            )
            return studentWithSessionSlot
        } catch (error) {
            console.log('Error in updateStudentWithSessionSlot', error)
            return null
        }
    },

    deleteStudentWithSessionSlot: async (id) => {
        try {
            const studentWithSessionSlot = await StudentWithSessionSlot.findByIdAndDelete(id)
            return studentWithSessionSlot
        } catch (error) {
            console.log('Error in deleteStudentWithSessionSlot', error)
            return null
        }
    }
}

export default studentWithSessionSlotService;

