import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
    }
})

instance.interceptors.request.use(
    async config => {
        config.headers = {
            Authorization: JSON.stringify(localStorage.getItem("access_token"))
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        try {
            const response = await instance.post('/auth/refresh_token', {
                refresh_token: localStorage.getItem("refresh_token")
            })
            localStorage.setItem("access_token", response.data.access_token)
            localStorage.setItem("refresh_token", response.data.refresh_token)

            return instance(originalRequest)
        } catch (_error) {
            return Promise.reject(_error)
        }
    }
}

)

export default instance