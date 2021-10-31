import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-hooks.firebaseio.com/'
});

export default instance;