import axios from 'axios';
const url = process.env.VUE_APP_BACKEND_URL;

export default {
    login(Form) {
        return axios.post(url + 'login/', Form).then(response => response.data);
    },
    register(Form) {
        console.log("register")
        return axios.post(url + 'save/', Form).then(response => response.data);
    },
   
};