import Session from '../../models/meetingModel/session.model.js';
import mongoose from 'mongoose';

const sessionService = {
    createSession: async(sessionData) => {
        try {
            const checkExist = await Session.findOne({
                title: sessionData.title,
                meeting: sessionData.meeting
            })
            if(checkExist) return null

            const session = new Session(sessionData)
            await session.save()
            return session
        } catch (error) {
            console.log('Error at createSession', error)
            return null
        }
    },

    getAllSessions: async() => {
        try {
            const sessions = await Session.find()
                .populate({
                    path: 'meeting',
                    select: 'title_meeting date_of_event tutor'
                })
            return sessions
        } catch (error) {
            console.log('Error at getAllSessions', error)
            return null
        }
    },

    getSessionById: async(id) => {
        try {
            const session = await Session.findById(id)
                .populate({
                    path: 'meeting',
                    select: 'title_meeting date_of_event tutor'
                })
            return session
        } catch (error) {
            console.log('Error at getSessionById', error)
            return null
        }
    },

    getSessionsByMeetingId: async(meetingId) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(meetingId)) {
                return null
            }
            const sessions = await Session.find({ meeting: meetingId })
                .populate({
                    path: 'meeting',
                    select: 'title_meeting date_of_event tutor'
                })
                .sort({ createdAt: -1 })
            return sessions
        } catch (error) {
            console.log('Error at getSessionsByMeetingId', error)
            return null
        }
    },

    updateSession: async(id, updateData) => {
        try {
            const session = await Session.findByIdAndUpdate(
                id,
                updateData,
                { new: true, runValidators: true }
            )
            return session
        } catch (error) {
            console.log('Error at updateSession', error)
            return null
        }
    },

    deleteSession: async(id) => {
        try {
            const session = await Session.findByIdAndDelete(id)
            return session
        } catch (error) {
            console.log('Error at deleteSession', error)
            return null
        }
    }
}

export default sessionService;

