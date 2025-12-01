import axios from '@/services/axios.customize'; // Config axios của bạn
import { BASE_API } from '../constants';

const updateMaterial = async (id, data) => {
    return axios.put(`${BASE_API}/material/${id}`, data);
};
const createNewMaterial = async (title, file, content, meetingId) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file); 
    formData.append('content', content)
    formData.append('meeting', meetingId);

    return axios.post(`${BASE_API}/material`, formData, {
        headers: {
            'Content-Type': undefined // QUAN TRỌNG NHẤT
        }
    });
};
const deleteMaterial = async (id) => {
    return axios.delete(`${BASE_API}/material/${id}`);
}
export { updateMaterial, createNewMaterial, deleteMaterial };