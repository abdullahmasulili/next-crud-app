import axios from "axios";

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
        post: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }
})

export default instance