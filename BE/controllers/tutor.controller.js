const { sendResponse } = require('../helper/sendResponse')
const { loginTutorService } = require('../services/tutor.service')

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
    }
}   

module.exports = tutorController