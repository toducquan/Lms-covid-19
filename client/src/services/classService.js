import axios from 'axios'

export const getAllClassService = () => {
    return axios.get('http://localhost:3000/class', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
}

export const addClassService = (data) => {
    return axios.post('http://localhost:3000/class', data,{
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
}

export const getAllClassOfTeacher = () => {
    return axios.get('http://localhost:3000/class/teach', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
}