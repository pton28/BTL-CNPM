const Student = require('../models/student.model')
const bcrypt = require('bcrypt')

const studentService = {
    loginStudentService: async(email, password) => {
        console.log('body', email, password)
        try {
            // tìm student trong db
            const student = await Student.findOne({email})
            if(!student) return null

            // so sánh mật khẩu truyền vào và mật khẩu lưu trong db
            const isMatch = await bcrypt.compare(password, student.password)
            if(isMatch) return student
            else return null
        } catch (error) {
            console.log('Error at loginStudentService', error)
            return null
        }
    }
}

module.exports = studentService