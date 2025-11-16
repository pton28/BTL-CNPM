const Tutor = require('../models/tutor.model')
const Major = require('../models/major.model')
const bcrypt = require('bcrypt')

const tutorService = {
    loginTutorService: async(email, password) => {
        console.log('body', email, password)
        try {
            // tìm tutor trong db
            const tutor = await Tutor.findOne({email})
            if(!tutor) return null

            // so sánh mật khẩu truyền vào và mật khẩu lưu trong db
            const isMatch = await bcrypt.compare(password, tutor.password)
            if(isMatch) return tutor
            else return null
        } catch (error) {
            console.log('Error at loginTutorService', error)
            return null
        }
    },
    getAllTutorService: async() => {
        try {
            const tutors = await Tutor.find()
                .populate(['major', 'faculty'])
            if(!tutors) return null
            return tutors
        } catch (error) {
            console.log('Error at get all tutor', error)
            return null            
        }
    }
}

module.exports = tutorService