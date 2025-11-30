import MaterialService from '../services/material.service.js';
import { sendResponse } from '../helper/sendResponse.js';
import { connect } from 'mongoose';

const MaterialController = {
    createMaterial: async(req, res) => {
        
        console.log("=== DEBUG UPLOAD ===");
        console.log("Body (Text):", req.body);
        console.log("File (Binary):", req.file);

        const { title, meeting } = req.body;
        const file = req.file;

        if(!title || !meeting) {
            return sendResponse(res, {
                status: 400,
                message: 'title, content, and meeting are required',
                data: null,
                EC: -1
            })
        }
        const content = file.originalname;
        console.log("File Original name: ", content);

        const response = await MaterialService.createMaterialService(title, content, meeting)
        console.log("RESPONSE: ", response)
        if(response) return sendResponse(res, {
            status: 201,
            message: 'Create material success',
            data: response,
            EC: 0
        })
        else return sendResponse(res, {
            status: 500,
            message: 'Create material failed',
            EC: -1,
            data: null
        })
    },
    getAllMaterials: async(req, res) => {
        const response = await MaterialService.getAllMaterialsService()
        if(response !== null) return sendResponse(res, {
            status: 200,
            message: 'Get all materials success',
            data: response,
            EC: 0
        })
        else return sendResponse(res, {
            status: 500,
            message: 'Get all materials failed',
            EC: -1,
            data: null
        })
    },
    getMaterialsByMeeting: async(req, res) => {
        const { meetingId } = req.params
        const response = await MaterialService.getMaterialsByMeetingService(meetingId)
        if(response !== null) return sendResponse(res, {
            status: 200,
            message: 'Get materials by meeting success',
            data: response,
            EC: 0
        })
        else return sendResponse(res, {
            status: 500,
            message: 'Get materials by meeting failed',
            EC: -1,
            data: null
        })
    },
    updateMaterial: async(req, res) => {
        const { id } = req.params
        const { title, content, meeting } = req.body
        const response = await MaterialService.updateMaterialService(id, title, content, meeting)
        if(response) return sendResponse(res, {
            status: 200,
            message: 'Update material success',
            data: response,
            EC: 0
        })
        else return sendResponse(res, {
            status: 404,
            message: 'Material not found or invalid ID',
            EC: -1,
            data: null
        })
    },
    deleteMaterial: async(req, res) => {
        const { id } = req.params
        const response = await MaterialService.deleteMaterialService(id)
        if(response) return sendResponse(res, {
            status: 200,
            message: 'Delete material success',
            data: response,
            EC: 0
        })
        else return sendResponse(res, {
            status: 404,
            message: 'Material not found or invalid ID',
            EC: -1,
            data: null
        })
    }
}

export default MaterialController;