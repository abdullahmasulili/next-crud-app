import axios from "axios";

const fetchPosts = async function() {
    return axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
        return response.data
    })
    .catch(error => {
        return error
    })
}

export default fetchPosts