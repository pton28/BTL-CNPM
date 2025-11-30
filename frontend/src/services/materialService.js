import axios from '@/services/axios.customize'; // Config axios của bạn
import { BASE_API } from '../constants';

const updateMaterial = async (id, data) => {
    return axios.put(`${BASE_API}/material/${id}`, data);
};
const createNewMaterial = async (title, file, meetingId) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('meeting', meetingId);
    formData.append('content', file); 

    return axios.post(`${BASE_API}/material`, formData);
};
const deleteMaterial = async (id) => {
    return axios.delete(`${BASE_API}/material/${id}`);
}
export { updateMaterial, createNewMaterial, deleteMaterial };