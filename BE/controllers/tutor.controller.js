const { sendResponse } = require('../helper/sendResponse')
const { loginTutorService, getAllTutorService } = require('../services/tutor.service')

const tutorController = {
    loginTutor: async(req, res) => {
        const tutor = await loginTutorService(req.body.email, req.body.password)
        if(tutor) return sendResponse(res, {
            status: 200,
            message: 'Login success',
            data: tutor,
            EC: 0
        })
        else return sendResponse(res, {
            status: 401,
            message: 'Login failed',
            EC: -1,
            data: null
        })
    },
    getAllTutor: async(req, res) => {
        const tutors = await getAllTutorService()
        if(tutors) return sendResponse(res, {
            status: 200,
            message: 'get all tutor success',
            data: tutors,
            EC: 0
        })
        else return sendResponse(res, {
            status: 500,
            message: 'Get all tutor failed',
            EC: -1,
            data: null
        })
    }
}   

module.exports = tutorController