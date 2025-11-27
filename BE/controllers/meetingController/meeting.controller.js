import { sendResponse } from "../../helper/sendResponse.js";
import meetingService from "../../services/meetingServices/meeting.service.js";

const meetingController = {
    createMeeting: async (req, res) => {
        const meeting = await meetingService.createMeeting(req.body);
        if (meeting)
            return sendResponse(res, {
                status: 201,
                message: "Meeting created successfully",
                data: meeting,
                EC: 0,
            });
        else
            return sendResponse(res, {
                status: 400,
                message: "Failed to create meeting",
                EC: -1,
                data: null,
            });
    },

    getAllMeetings: async (req, res) => {
        const meetings = await meetingService.getAllMeetings();
        if (meetings !== null)
            return sendResponse(res, {
                status: 200,
                message: "Get all meetings successfully",
                data: meetings,
                EC: 0,
            });
        else
            return sendResponse(res, {
                status: 500,
                message: "Failed to get meetings",
                EC: -1,
                data: null,
            });
    },

    filterMeetings: async (req, res) => {
        const { tutorName, majorId, title } = req.query;
        const meetings = await meetingService.filterMeetings({
            tutorName,
            majorId,
            title,
        });
        if (meetings !== null)
            return sendResponse(res, {
                status: 200,
                message: "Filter meetings successfully",
                data: meetings,
                EC: 0,
            });
        else
            return sendResponse(res, {
                status: 500,
                message: "Failed to filter meetings",
                EC: -1,
                data: null,
            });
    },

    getMeetingsByTutorName: async (req, res) => {
        const { name } = req.query;
        // if(!name) return sendResponse(res, {
        //     status: 400,
        //     message: 'Query param name is required',
        //     EC: -1,
        //     data: null
        // })
        const meetings = await meetingService.getMeetingsByTutorName(name);
        if (meetings !== null)
            return sendResponse(res, {
                status: 200,
                message: "Get meetings by tutor name successfully",
                data: meetings,
                EC: 0,
            });
        else
            return sendResponse(res, {
                status: 500,
                message: "Failed to get meetings by tutor name",
                EC: -1,
                data: null,
            });
    },

    getMeetingById: async (req, res) => {
        const { id } = req.params;
        const meeting = await meetingService.getMeetingById(id);
        if (meeting)
            return sendResponse(res, {
                status: 200,
                message: "Get meeting successfully",
                data: meeting,
                EC: 0,
            });
        else
            return sendResponse(res, {
                status: 404,
                message: "Meeting not found",
                EC: -1,
                data: null,
            });
    },

    updateMeeting: async (req, res) => {
        const { id } = req.params;
        const meeting = await meetingService.updateMeeting(id, req.body);
        if (meeting)
            return sendResponse(res, {
                status: 200,
                message: "Meeting updated successfully",
                data: meeting,
                EC: 0,
            });
        else
            return sendResponse(res, {
                status: 404,
                message: "Meeting not found or update failed",
                EC: -1,
                data: null,
            });
    },

    deleteMeeting: async (req, res) => {
        const { id } = req.params;
        const meeting = await meetingService.deleteMeeting(id);
        if (meeting)
            return sendResponse(res, {
                status: 200,
                message: "Meeting deleted successfully",
                data: meeting,
                EC: 0,
            });
        else
            return sendResponse(res, {
                status: 404,
                message: "Meeting not found or delete failed",
                EC: -1,
                data: null,
            });
    },

    getMyMeetings: async (req, res) => {
        try {
            // Lấy ID từ đường dẫn URL (ví dụ: /meeting/tutor/123 -> id = 123)
            const { tutorId } = req.params;

            if (!tutorId) {
                return sendResponse(res, {
                    status: 400,
                    message: "Thiếu Tutor ID",
                    EC: -1,
                });
            }

            // Gọi service tìm kiếm (dùng lại hàm service cũ nếu đã có, hoặc hàm find)
            // Giả sử meetingService.getMeetingsByTutorId đã được viết ở các bước trước
            const meetings = await meetingService.getMeetingsByTutorId(tutorId);

            return sendResponse(res, {
                status: 200,
                message: "Lấy danh sách lớp theo ID thành công",
                data: meetings,
                EC: 0,
            });
        } catch (error) {
            console.log(error);
            return sendResponse(res, {
                status: 500,
                message: "Lỗi server",
                EC: -1,
            });
        }
    },
};

export default meetingController;
