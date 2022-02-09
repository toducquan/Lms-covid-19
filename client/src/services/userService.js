import axios from 'axios'

export const getTeachersService = () => {
    return axios.get('http://localhost:3000/user', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
}

export const getStudentInClassService = (id) => {
    return axios.get(`http://localhost:3000/test/class/${id}`, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
}

export const addTeachersService = (data) => {
    return axios.post('http://localhost:3000/user', data,{
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
}