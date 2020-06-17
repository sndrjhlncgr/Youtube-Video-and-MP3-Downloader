import axios from 'axios'

const API_LINK= 'http://localhost:3000/api'

export const convertLink = (url,callback) =>  {
    return axios.get(`${API_LINK}/convert`, {
        params: {
            URL: `${url}`,
        },
    })
    .then(res => {
        callback(res)
    })
}

export const downloadMp3 = (url) =>  {
    // window.location.href = `${API_LINK}/download/selectedVideo?URL=${url}}`
}

export default convertLink | downloadMp3