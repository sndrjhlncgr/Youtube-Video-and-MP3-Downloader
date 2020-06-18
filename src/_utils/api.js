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
export const downloadMp4 = (url,format,info) =>  {
    const options = {
        url:url,
        format: {
            height: format.height,
            mimeType: format.mimeType,
            width: format.width,
            qualityLabel: format.qualityLabel,
            quality: format.quality,
            container: format.container
        },
        title: `${info.title}.mp4`
    }

    window.location.href = `${API_LINK}/download/mp4?url=${url}&options=${options}`
}

export const downloadMp3 = (url,title) =>  {
    const filename = `${title}.mp3`
    window.location.href = `${API_LINK}/download/mp3?URL=${url}&TITLE=${filename}`
}

export const downloadAudio = (url,title) =>  {
    const filename = `${title}.flac`
    window.location.href = `${API_LINK}/download/audio?URL=${url}&TITLE=${filename}`
}
export default convertLink | downloadMp3 | downloadMp4 | downloadAudio