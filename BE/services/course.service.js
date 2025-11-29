import Course from "../models/course.model.js";

const courseService = {
    // Lấy tất cả lịch học của 1 Tutor để hiển thị lên Calendar
    getScheduleByTutor: async (tutorId) => {
        try {
            const courses = await Course.find({ tutorId: tutorId });

            // Biến đổi dữ liệu từ lồng nhau (Week -> Session) thành mảng phẳng cho Frontend
            let events = [];
            courses.forEach((course) => {
                course.weeks.forEach((week) => {
                    week.sessions.forEach((session) => {
                        events.push({
                            id: session._id,
                            title: course.name, // Lấy tên môn học làm tiêu đề
                            date: session.date, // yyyy-mm-dd
                            type: session.type === "online" ? "blue" : "orange", // Màu sắc
                            room: session.room,
                            time: `${session.startTime} - ${session.endTime}`,
                        });
                    });
                });
            });
            return events;
        } catch (error) {
            throw error;
        }
    },

    // Tạo mới một buổi học
    createSession: async (data) => {
        try {
            // data bao gồm: tutorId, courseName, date, startTime, endTime, room, type...

            // 1. Tìm xem Tutor này đã có môn học tên này chưa
            let course = await Course.findOne({
                tutorId: data.tutorId,
                name: data.courseName,
            });

            const newSession = {
                day: new Date(data.date).toLocaleDateString("en-US", {
                    weekday: "short",
                }), // Mon, Tue...
                date: data.date,
                startTime: data.startTime,
                endTime: data.endTime,
                room: data.room,
                type: data.type,
            };

            if (!course) {
                // Nếu chưa có môn, tạo môn mới + tuần 1 + session
                course = await Course.create({
                    courseId: "C" + Date.now(), // Tạo ID ngẫu nhiên
                    name: data.courseName,
                    tutorId: data.tutorId,
                    weeks: [
                        {
                            weekNumber: 1,
                            sessions: [newSession],
                        },
                    ],
                });
            } else {
                // Nếu môn đã có, push session vào tuần đầu tiên (hoặc logic tìm tuần phù hợp)
                if (course.weeks.length === 0) {
                    course.weeks.push({ weekNumber: 1, sessions: [] });
                }
                course.weeks[0].sessions.push(newSession);
                await course.save();
            }

            return course;
        } catch (error) {
            throw error;
        }
    },
};

export default courseService;
