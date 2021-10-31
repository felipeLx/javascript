import axios from 'axios';

const api = axios.create({
    baseURL: '/',
});

export const insertUser = payload => api.post('/auth', payload);
export const loginUser = payload => api.post('/login', payload);
export const getAllUsers = () => api.get('/users');
export const getOneUser = id => api.get(`/${id}`); 
export const updateUserById = (id, payload) => api.put(`/register/${id}`, payload);
export const deleteUserById = id => api.delete(`/register/${id}`);
export const getUserById = id => api.get(`/register/${id}`);

const apis = {
    insertUser,
    getAllUsers,
    getOneUser,
    updateUserById,
    deleteUserById,
    getUserById,
    loginUser
}

export default apis;