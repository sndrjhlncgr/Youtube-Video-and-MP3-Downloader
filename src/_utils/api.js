import axios from 'axios'

const API_LINK= 'http://localhost:3000/api'

export default function convertLink(url,callback) {
    return axios.get(`${API_LINK}/convert`, {
        params: {
            URL: `${url}`,
        },
    })
    .then(res => {
        callback(res)
    })
}