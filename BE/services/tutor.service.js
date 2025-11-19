import Tutor from '../models/tutor.model.js';
import bcrypt from 'bcrypt';

const tutorService = {
    loginTutorService: async (email, password) => {
        console.log('body', email, password)
        try {
            const tutor = await Tutor.findOne({ email })
            if (!tutor) return null

            const isMatch = await bcrypt.compare(password, tutor.password)
            if (isMatch) return tutor
            else return null
        } catch (error) {
            console.log('Error at loginTutorService', error)
            return null
        }
    },

    getAllTutorService: async () => {
        try {
            const tutors = await Tutor.find().populate(['major', 'faculty'])
            if (!tutors) return null
            return tutors
        } catch (error) {
            console.log('Error at get all tutor', error)
            return null
        }
    },

    getTutorByIdService: async (id) => {
        try {
            const tutor = await Tutor.findOne({_id: id }).populate(['major', 'faculty'])
            if (!tutor) return null
            return tutor
        } catch (error) {
            console.log('Error at get tutor by id', error)
            return null
        }
    }
}

export default tutorService