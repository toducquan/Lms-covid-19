import axios from 'axios'

export const loginService = (payload) => {
    return axios.post('http://localhost:3000/auth/login', payload)
}

export const getUserService = () => {
    return axios.get('http://localhost:3000/auth', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
}