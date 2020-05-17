import axios from 'axios';

export default axios.create({
    baseURL: 'https://www.finnhub.io/api/v1'
});