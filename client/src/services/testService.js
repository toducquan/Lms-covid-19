import axios from 'axios'

export const getTestsService = () => {
    return axios.get('http://localhost:3000/test', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
}

export const getTestsOfStudentService = () => {
    return axios.get('http://localhost:3000/test/student-test', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
}

export const getAllGradeWithTestId = (id) => {
    return axios.get(`http://localhost:3000/test/${id}`, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
}

export const studentDoTest = (id, data) => {
    return axios.post(`http://localhost:3000/test/student-test/${id}`, data, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
}

export const addTestService = (data) => {
    return axios.post('http://localhost:3000/test', data,{
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
}