const Meeting = require('../../models/meetingModel/meeting.model')

const meetingService = {
    createMeeting: async(meetingData) => {
        try {
            const meeting = new Meeting(meetingData)
            await meeting.save()
            return meeting
        } catch (error) {
            console.log('Error at createMeeting', error)
            return null
        }
    },

    getAllMeetings: async() => {
        try {
            const meetings = await Meeting.find()
                .populate(['tutor', 'major'])
            return meetings
        } catch (error) {
            console.log('Error at getAllMeetings', error)
            return null
        }
    },

    getMeetingById: async(id) => {
        try {
            const meeting = await Meeting.findOne({id})
            return meeting
        } catch (error) {
            console.log('Error at getMeetingById', error)
            return null
        }
    },

    updateMeeting: async(id, updateData) => {
        try {
            const meeting = await Meeting.findOneAndUpdate(
                {id},
                updateData,
                { new: true, runValidators: true }
            )
            return meeting
        } catch (error) {
            console.log('Error at updateMeeting', error)
            return null
        }
    },

    deleteMeeting: async(id) => {
        try {
            const meeting = await Meeting.findOneAndDelete({id})
            return meeting
        } catch (error) {
            console.log('Error at deleteMeeting', error)
            return null
        }
    }
}

module.exports = meetingService

