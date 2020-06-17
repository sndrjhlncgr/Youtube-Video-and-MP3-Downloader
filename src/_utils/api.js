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

export const downloadMp3 = (url,title) =>  {
    const filename = `${title}.mp3`
    window.location.href = `${API_LINK}/download/mp3?URL=${url}&TITLE=${filename}`
}

export const downloadMp4 = (url,title) =>  {
    axios.get(`${API_LINK}/download/mp4`,{
        params:{
            URL: url,
            TITLE:title
        }
    })
    .then(res => window.location.href = res)
}

export const downloadAudio = (url,title) =>  {
    const filename = `${title}.flac`
    window.location.href = `${API_LINK}/download/audio?URL=${url}&TITLE=${filename}`
}
export default convertLink | downloadMp3 | downloadMp4 | downloadAudio