import Student from '../models/student.model.js';
import bcrypt from 'bcrypt';

export const loginStudentService = async(email, password) => {
    console.log('body', email, password)
    try {
        const student = await Student.findOne({email})
        if(!student) return null

        const isMatch = await bcrypt.compare(password, student.password)
        if(isMatch) return student
        else return null
    } catch (error) {
        console.log('Error at loginStudentService', error)
        return null
    }
}

export const getStudentByIdService = async(id) => {
    try {
        const student = await Student.findById(id)
        if(!student) return null
        return student
    } catch (error) {
        console.log('Error at get student by id', error)
        return null
    }
}
