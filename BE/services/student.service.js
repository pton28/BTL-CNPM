import Student from '../models/student.model.js';
import bcrypt from 'bcrypt';

export const loginStudentService = async(email, password) => {
    console.log('body', email, password)
    try {
        // tAm student trong db
        const student = await Student.findOne({email})
        if(!student) return null

        // so sanh mat khau truyen vao va mat khau luu trong db
        const isMatch = await bcrypt.compare(password, student.password)
        if(isMatch) return student
        else return null
    } catch (error) {
        console.log('Error at loginStudentService', error)
        return null
    }
}
