import Meeting from "../../models/meetingModel/meeting.model.js";
import mongoose from "mongoose";

const meetingService = {
    createMeeting: async (meetingData) => {
        try {
            const checkExist = await Meeting.findOne({
                title_meeting: meetingData.title_meeting,
                tutor: meetingData.tutor,
                date_of_event: meetingData.date_of_event,
                method: meetingData.method,
                major: meetingData.major,
            });
            if (checkExist) return null;

            const meeting = new Meeting(meetingData);
            await meeting.save();
            return meeting;
        } catch (error) {
            console.log("Error at createMeeting", error);
            return null;
        }
    },

    getAllMeetings: async () => {
        try {
            const meetings = await Meeting.find()
                .populate({
                    path: "major",
                    select: "name -_id",
                })
                .populate({
                    path: "tutor",
                    select: "full_name email -_id",
                });
            return meetings;
        } catch (error) {
            console.log("Error at getAllMeetings", error);
            return null;
        }
    },

    filterMeetings: async ({ tutorName, majorId, title }) => {
        try {
            const query = {};
            if (majorId) query.major = majorId;
            if (title) query.title_meeting = new RegExp(title, "i");

            const tutorMatch = tutorName
                ? { full_name: new RegExp(tutorName, "i") }
                : undefined;

            const meetings = await Meeting.find(query)
                .populate({
                    path: "major",
                    select: "name -_id",
                })
                .populate({
                    path: "tutor",
                    select: "full_name email -_id",
                    match: tutorMatch,
                });

            if (tutorName) return meetings.filter((meeting) => meeting.tutor);
            return meetings;
        } catch (error) {
            console.log("Error at filterMeetings", error);
            return null;
        }
    },

    getMeetingsByTutorName: async (tutorName) => {
        try {
            const regex = new RegExp(tutorName, "i");
            const meetings = await Meeting.find()
                .populate({
                    path: "major",
                    select: "name -_id",
                })
                .populate({
                    path: "tutor",
                    select: "full_name email -_id",
                    match: { full_name: regex },
                });
            const filteredMeetings = meetings.filter(
                (meeting) => meeting.tutor
            );
            return filteredMeetings;
        } catch (error) {
            console.log("Error at getMeetingsByTutorName", error);
            return null;
        }
    },

    getMeetingById: async (id) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return null;
            }
            const meeting = await Meeting.findById(id)
                .populate({
                    path: "major",
                    select: "name -_id",
                })
                .populate({
                    path: "tutor",
                    select: "full_name email -_id",
                });
            return meeting;
        } catch (error) {
            console.log("Error at getMeetingById", error);
            return null;
        }
    },

    updateMeeting: async (id, updateData) => {
        try {
            const meeting = await Meeting.findOneAndUpdate({ id }, updateData, {
                new: true,
                runValidators: true,
            });
            return meeting;
        } catch (error) {
            console.log("Error at updateMeeting", error);
            return null;
        }
    },

    deleteMeeting: async (id) => {
        try {
            const meeting = await Meeting.findOneAndDelete({ id });
            return meeting;
        } catch (error) {
            console.log("Error at deleteMeeting", error);
            return null;
        }
    },

    getMeetingsByTutorId: async (tutorId) => {
        try {
            const meetings = await Meeting.find({ tutor: tutorId });
            return meetings;
        } catch (error) {
            console.log("Error at getMeetingsByTutorId", error);
            return null;
        }
    },
};

export default meetingService;
