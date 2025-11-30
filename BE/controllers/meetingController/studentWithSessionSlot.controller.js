import { sendResponse } from "../../helper/sendResponse.js";
import studentWithSessionSlotService from "../../services/meetingServices/studentWithSessionSlot.service.js";

const studentWithSessionSlotController = {
    createStudentWithSessionSlot: async (req, res) => {
        const studentWithSessionSlot =
            await studentWithSessionSlotService.createStudentWithSessionSlot(
                req.body
            );
        if (studentWithSessionSlot)
            return sendResponse(res, {
                status: 201,
                message: "StudentWithSessionSlot created successfully",
                data: studentWithSessionSlot,
                EC: 0,
            });
        else
            return sendResponse(res, {
                status: 400,
                message: "Failed to create studentWithSessionSlot",
                EC: -1,
                data: null,
            });
    },

    getAllStudentWithSessionSlots: async (req, res) => {
        const studentWithSessionSlots =
            await studentWithSessionSlotService.getAllStudentWithSessionSlots();
        if (studentWithSessionSlots !== null)
            return sendResponse(res, {
                status: 200,
                message: "Get all studentWithSessionSlots successfully",
                data: studentWithSessionSlots,
                EC: 0,
            });
        else
            return sendResponse(res, {
                status: 500,
                message: "Failed to get studentWithSessionSlots",
                EC: -1,
                data: null,
            });
    },

    getStudentWithSessionSlotById: async (req, res) => {
        const { id } = req.params;
        const studentWithSessionSlot =
            await studentWithSessionSlotService.getStudentWithSessionSlotById(
                id
            );
        if (studentWithSessionSlot)
            return sendResponse(res, {
                status: 200,
                message: "Get studentWithSessionSlot successfully",
                data: studentWithSessionSlot,
                EC: 0,
            });
        else
            return sendResponse(res, {
                status: 404,
                message: "StudentWithSessionSlot not found",
                EC: -1,
                data: null,
            });
    },

    updateStudentWithSessionSlot: async (req, res) => {
        const { id } = req.params;
        const studentWithSessionSlot =
            await studentWithSessionSlotService.updateStudentWithSessionSlot(
                id,
                req.body
            );
        if (studentWithSessionSlot)
            return sendResponse(res, {
                status: 200,
                message: "StudentWithSessionSlot updated successfully",
                data: studentWithSessionSlot,
                EC: 0,
            });
        else
            return sendResponse(res, {
                status: 404,
                message: "StudentWithSessionSlot not found or update failed",
                EC: -1,
                data: null,
            });
    },

    deleteStudentWithSessionSlot: async (req, res) => {
        const { id } = req.params;
        const studentWithSessionSlot =
            await studentWithSessionSlotService.deleteStudentWithSessionSlot(
                id
            );
        if (studentWithSessionSlot)
            return sendResponse(res, {
                status: 200,
                message: "StudentWithSessionSlot deleted successfully",
                data: studentWithSessionSlot,
                EC: 0,
            });
        else
            return sendResponse(res, {
                status: 404,
                message: "StudentWithSessionSlot not found or delete failed",
                EC: -1,
                data: null,
            });
    },

    getStudentWithSessionSlotByStudentAndMeeting: async (req, res) => {
        const { studentId, meetingId } = req.params;
        if (!studentId || !meetingId) {
            return sendResponse(res, {
                status: 400,
                message: "studentId and meetingId are required",
                data: null,
                EC: -1,
            });
        }
        const response =
            await studentWithSessionSlotService.getStudentWithSessionSlotByStudentAndMeeting(
                studentId,
                meetingId
            );
        if (response !== null)
            return sendResponse(res, {
                status: 200,
                message:
                    "Get studentWithSessionSlot by student and meeting successfully",
                data: response,
                EC: 0,
            });
        else
            return sendResponse(res, {
                status: 500,
                message:
                    "Failed to get studentWithSessionSlot by student and meeting",
                EC: -1,
                data: null,
            });
    },

    getStudentWithSessionSlotBySessionID: async (req, res) => {
        const { sessionId } = req.params;
        if (!sessionId) {
            return sendResponse(res, {
                status: 400,
                message: "sessionId is required",
                data: null,
                EC: -1,
            });
        }
        const response =
            await studentWithSessionSlotService.getStudentWithSessionSlotBySessionID(
                sessionId
            );
        if (response !== null)
            return sendResponse(res, {
                status: 200,
                message: "Get studentWithSessionSlot by sessionId successfully",
                data: response,
                EC: 0,
            });
        else
            return sendResponse(res, {
                status: 500,
                message: "Failed to get studentWithSessionSlot by sessionId",
                EC: -1,
                data: null,
            });
    },
};

export default studentWithSessionSlotController;
