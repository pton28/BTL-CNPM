import Tutor from '../models/tutor.model.js';
import Major from '../models/major.model.js';
import bcrypt from 'bcrypt';

export const loginTutorService = async(email, password) => {
    console.log('body', email, password)
    try {
        // tim tutor trong db
        const tutor = await Tutor.findOne({email})
        if(!tutor) return null

        // so sanh mat khau truyEn vao va mat khau luu trong db
        const isMatch = await bcrypt.compare(password, tutor.password)
        if(isMatch) return tutor
        else return null
    } catch (error) {
        console.log('Error at loginTutorService', error)
        return null
    }
}

export const getAllTutorService = async() => {
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
