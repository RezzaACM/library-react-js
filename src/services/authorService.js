import Axios from 'axios';

const RootPath = 'http://localhost:3000/api'

const Get = (path) => (data) => {
    const promise = new Promise((resolve, reject) => {
        Axios.get(`${RootPath}/${path}`)
            .then((result) => {
                resolve(result.data)
            }, (err) => {
                reject(err.response)
            })
    })
    return promise
}

const GetDetail = (path) => (data) => {
    const promise = new Promise((resolve, reject) => {
        Axios.get(`${RootPath}/${path}/${data}`)
            .then((res) => {
                resolve(res.data)
            }, err => {
                reject(err)
            })
    })
    return promise
}

const Post = (path, data) => {
    const promise = new Promise((resolve, reject) => {
        Axios.post(`${RootPath}/${path}`, data)
            .then((res) => {
                resolve(res.data)
            }, err => {
                reject(err.response.data)
            })
    })
    return promise
}

const Delete = (path) => (data) => {
    const promise = new Promise((resolve, reject) => {
        Axios.delete(`${RootPath}/${path}/${data}`)
            .then(res => {
                resolve(res.data)
            }, err => {
                reject(err.response.data)
            })
    })
    return promise
}

const Update = (path, data, param) => {
    const promise = new Promise((resolve, reject) => {
        Axios.post(`${RootPath}/${path}/${param}`, data)
            .then(res => {
                resolve(res.data)
            }, err => {
                reject(err.response.data)
            })
    })
    return promise
}

const getAuthor = Get('authors');
const getDetailAuthor = GetDetail('author');
const postAuthor = (data) => Post('author/create', data);
const deleteAuthor = Delete('author/delete');
const updateAuthor = (data, param) => Update('author/update', data, param);


const API = {
    getAuthor,
    getDetailAuthor,
    postAuthor,
    deleteAuthor,
    updateAuthor
}

export default API