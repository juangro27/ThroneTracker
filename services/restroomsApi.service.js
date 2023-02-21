const axios = require('axios');
const parseRestrooms = require('../utils/parseRestrooms');

class ApiService {
    static _instace
    constructor() {
        this.api = axios.create({
            baseURL: 'www.refugerestrooms.org/api'
        })
    }
    static getInstance() {
        if (!this._instance) {
            this._instance = new ApiService();
        }
        return this._instance;
    }

    getAllRestrooms = (page = 1, per_page = 10, offset = 0) => {
        return new Promise((resolve, reject) => {
            this.api.get(`https://www.refugerestrooms.org/api/v1/restrooms?page=${page}&per_page=${per_page}&offset=${offset}`)
                .then(({ data }) => resolve(parseRestrooms(data)))
                .catch(reject)
        })

    }
    getRestroomsByLocation = (page = 1, per_page = 10, offset = 0, lat, lng) => {
        return this.api.get(`https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=${page}&per_page=${per_page}&offset=${offset}&lat=${lat}&lng=${lng}`)
    }
}

module.exports = ApiService.getInstance()