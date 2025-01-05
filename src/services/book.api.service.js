import axios from "./axios.customize";

const fetchAllBookAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND);
}

const createBookAPI = (thumbnail, mainText, author, price, quantity, category) => {
    const URL_BACKEND = "/api/v1/book";
    const data = {
        thumbnail,
        mainText,
        author,
        price,
        quantity,
        category
    }
    return axios.post(URL_BACKEND, data);
}

const updateBookAPI = (_id, thumbnail, mainText, author, price, quantity, category) => {
    const URL_BACKEND = "/api/v1/book";
    const data = {
        _id,
        thumbnail,
        mainText,
        author,
        price,
        quantity,
        category
    }
    return axios.put(URL_BACKEND, data);
}

const deleteBookAPI = (_id) => {
    const URL_BACKEND = `/api/v1/book/${_id}`;
    return axios.delete(URL_BACKEND);
}

export {
    fetchAllBookAPI, createBookAPI, updateBookAPI, deleteBookAPI
}