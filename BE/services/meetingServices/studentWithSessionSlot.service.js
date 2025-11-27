import StudentWithSessionSlot from "../../models/meetingModel/studentWithSessionSlot.model.js";
import mongoose from "mongoose";

const studentWithSessionSlotService = {
    createStudentWithSessionSlot: async (studentWithSessionSlotData) => {
        try {
            const { student, session, meeting, slot } =
                studentWithSessionSlotData;

            // Kiểm tra tồn tại theo student, session, meeting
            const existingRecord = await StudentWithSessionSlot.findOne({
                student,
                session,
                meeting,
            });

            // Nếu đã tồn tại nhưng slot khác → update slot
            if (existingRecord) {
                if (existingRecord.slot.toString() !== slot.toString()) {
                    existingRecord.slot = slot;
                    existingRecord.date_signup =
                        studentWithSessionSlotData.date_signup || new Date();
                    await existingRecord.save();
                }
                return existingRecord; // Trả về bản ghi đã cập nhật
            }

            // Nếu chưa tồn tại → tạo mới
            const payload = {
                ...studentWithSessionSlotData,
                date_signup:
                    studentWithSessionSlotData.date_signup || new Date(),
            };

            const newRecord = await StudentWithSessionSlot.create(payload);
            return newRecord;
        } catch (error) {
            console.log("Error in createOrUpdateStudentWithSessionSlot", error);
            return null;
        }
    },

    getAllStudentWithSessionSlots: async () => {
        try {
            const response = await StudentWithSessionSlot.find()
                .populate({
                    path: "student",
                    select: "id full_name email",
                })
                .populate({
                    path: "meeting",
                    select: "title_meeting date_of_event method",
                })
                .populate({
                    path: "session",
                    select: "title",
                })
                .populate({
                    path: "slot",
                    select: "start_time end_time location_or_link duration date",
                });
            // .populate(['student', 'meeting', 'session', 'slot'])
            if (!response) return null;
            return response;
        } catch (error) {
            console.log("Error in getAllStudentWithSessionSlots", error);
            return null;
        }
    },

    getStudentWithSessionSlotById: async (id) => {
        try {
            const studentWithSessionSlot =
                await StudentWithSessionSlot.findById(id)
                    .populate({
                        path: "student",
                        select: "id full_name email",
                    })
                    .populate({
                        path: "meeting",
                        select: "title_meeting date_of_event method",
                    })
                    .populate({
                        path: "session",
                        select: "title",
                    })
                    .populate({
                        path: "slot",
                        select: "start_time end_time location_or_link duration",
                    });
            return studentWithSessionSlot;
        } catch (error) {
            console.log("Error in getStudentWithSessionSlotById", error);
            return null;
        }
    },

    updateStudentWithSessionSlot: async (id, updateData) => {
        try {
            const studentWithSessionSlot =
                await StudentWithSessionSlot.findByIdAndUpdate(id, updateData, {
                    new: true,
                    runValidators: true,
                });
            return studentWithSessionSlot;
        } catch (error) {
            console.log("Error in updateStudentWithSessionSlot", error);
            return null;
        }
    },

    deleteStudentWithSessionSlot: async (id) => {
        try {
            const studentWithSessionSlot =
                await StudentWithSessionSlot.findByIdAndDelete(id);
            return studentWithSessionSlot;
        } catch (error) {
            console.log("Error in deleteStudentWithSessionSlot", error);
            return null;
        }
    },

    getStudentWithSessionSlotByStudentAndMeeting: async (
        studentId,
        meetingId
    ) => {
        try {
            if (
                !mongoose.Types.ObjectId.isValid(studentId) ||
                !mongoose.Types.ObjectId.isValid(meetingId)
            ) {
                return null;
            }
            const response = await StudentWithSessionSlot.find({
                student: studentId,
                meeting: meetingId,
            })
                .populate({
                    path: "student",
                    select: "id_student full_name email",
                })
                .populate({
                    path: "meeting",
                    select: "title_meeting date_of_event method",
                })
                .populate({
                    path: "session",
                    select: "title",
                })
                .populate({
                    path: "slot",
                    select: "start_time end_time location_or_link duration date",
                })
                .sort({ createdAt: -1 });
            return response;
        } catch (error) {
            console.log(
                "Error in getStudentWithSessionSlotByStudentAndMeeting",
                error
            );
            return null;
        }
    },

    getStudentsBySessionId: async (req, res) => {
        try {
            const { sessionId } = req.params; // Lấy ID buổi học từ URL

            const result =
                await studentWithSessionSlotService.getStudentsBySessionIdService(
                    sessionId
                );

            if (result) {
                return sendResponse(res, {
                    status: 200,
                    message: "Get students by session success",
                    data: result,
                    EC: 0,
                });
            } else {
                return sendResponse(res, {
                    status: 404,
                    message: "No students found or error",
                    data: [],
                    EC: 0,
                });
            }
        } catch (error) {
            return sendResponse(res, {
                status: 500,
                message: "Internal Server Error",
                EC: -1,
                data: null,
            });
        }
    },
};

export default studentWithSessionSlotService;
