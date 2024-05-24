import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        Authorization: JSON.stringify(localStorage.getItem("ACCESS_KEY"))
    }
})

export default instance