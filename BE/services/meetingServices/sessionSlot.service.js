import SessionSlot from '../../models/meetingModel/sessionSlot.model.js';
import mongoose from 'mongoose';

const sessionSlotService = {
    createSessionSlot: async(sessionSlotData) => {
        try {
            const checkExist = await SessionSlot.findOne(sessionSlotData)
            if(checkExist) return null

            const sessionSlot = new SessionSlot(sessionSlotData)
            await sessionSlot.save()
            return sessionSlot
        } catch (error) {
            console.log('Error at createSessionSlot', error)
            return null
        }
    },

    getAllSessionSlots: async() => {
        try {
            const sessionSlots = await SessionSlot.find()
                .populate({
                    path: 'session',
                    select: 'title meeting'
                })
            return sessionSlots
        } catch (error) {
            console.log('Error at getAllSessionSlots', error)
            return null
        }
    },

    getSessionSlotById: async(id) => {
        try {
            const sessionSlot = await SessionSlot.findOne({ id })
                .populate({
                    path: 'session',
                    select: 'title meeting'
                })
            return sessionSlot
        } catch (error) {
            console.log('Error at getSessionSlotById', error)
            return null
        }
    },

    getSessionSlotsBySessionId: async(sessionId) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(sessionId)) {
                return null
            }
            const sessionSlots = await SessionSlot.find({ session: sessionId })
                .populate({
                    path: 'session',
                    select: 'title meeting'
                })
                .sort({ createdAt: -1 })
            return sessionSlots
        } catch (error) {
            console.log('Error at getSessionSlotsBySessionId', error)
            return null
        }
    },

    updateSessionSlot: async(id, updateData) => {
        try {
            const sessionSlot = await SessionSlot.findOneAndUpdate(
                { id },
                updateData,
                { new: true, runValidators: true }
            )
            return sessionSlot
        } catch (error) {
            console.log('Error at updateSessionSlot', error)
            return null
        }
    },

    deleteSessionSlot: async(id) => {
        try {
            const sessionSlot = await SessionSlot.findOneAndDelete({ id })
            return sessionSlot
        } catch (error) {
            console.log('Error at deleteSessionSlot', error)
            return null
        }
    }
}

export default sessionSlotService;
