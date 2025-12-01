import Material from '../models/material.model.js';
import mongoose from 'mongoose';

const MaterialService = {
    createMaterialService: async(title, file, content, meeting) => {
        try {
            const payload = {
                title,
                file: file || "",
                content,
                meeting
            }

            const filter = { meeting: meeting };
            if (file) {
                filter.title = title; // Hoặc check theo tên file: filter.file = file;
            } else {
                filter.content = content;
            }
            const existingMaterial = await Material.findOne(filter);
            if (existingMaterial) {
                console.log("File này đã tồn tại trong mục này rồi!");
                return null;
            }
            const createdMaterial = await Material.create(payload)
            return createdMaterial
        } catch (error) {
            console.log('Error in createMaterialService', error)
            console.log('Error details:', error.message)
            return null
        }
    },
    getAllMaterialsService: async() => {
        try {
            const materials = await Material.find()
                .populate({
                    path: 'meeting',
                    select: '_id title_meeting date_of_event method major tutor'
                })
                .sort({ createdAt: -1 })
            return materials
        } catch (error) {
            console.log('Error in getAllMaterialsService', error)
            console.log('Error details:', error.message)
            return null
        }
    },
    getMaterialsByMeetingService: async(meetingId) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(meetingId)) {
                return null
            }
            const materials = await Material.find({ meeting: meetingId })
                .populate({
                    path: 'meeting',
                    select: '_id title_meeting date_of_event method major tutor'
                })
                .sort({ createdAt: -1 })
            return materials
        } catch (error) {
            console.log('Error in getMaterialsByMeetingService', error)
            console.log('Error details:', error.message)
            return null
        }
    },
    updateMaterialService: async(materialId, title, content, meeting) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(materialId)) {
                return null
            }
            const updateData = {}
            if (title !== undefined) updateData.title = title
            if (content !== undefined) updateData.content = content
            if (meeting !== undefined) updateData.meeting = meeting

            const updatedMaterial = await Material.findByIdAndUpdate(
                materialId,
                updateData,
                { new: true, runValidators: true }
            )
            return updatedMaterial
        } catch (error) {
            console.log('Error in updateMaterialService', error)
            console.log('Error details:', error.message)
            return null
        }
    },
    deleteMaterialService: async(materialId) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(materialId)) {
                return null
            }
            const deletedMaterial = await Material.findByIdAndDelete(materialId)
            return deletedMaterial
        } catch (error) {
            console.log('Error in deleteMaterialService', error)
            console.log('Error details:', error.message)
            return null
        }
    }
}

export default MaterialService;