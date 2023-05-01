import axios from "@/axios-config";

const fetchPosts = async function() {
    return await axios.get('/posts')
        .then(response => response.data)
        .catch(error => error.message)
}

const createPost = async function(payload) {
    return await axios.post('/posts', payload)
        .then(response => response.data)
        .catch(error => error.message)
}

const editPost = async function(payload) {
    return await axios.put(`/posts/${payload.id}`, payload)
        .then(response => response.data)
        .catch(error => error.message)
}

export { fetchPosts, createPost, editPost }