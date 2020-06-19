import axios from 'axios'


const FileDownload = require('js-file-download');
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
    const formats = {
        url:url,
        video_formats: {
            height: format.height,
            mimeType: format.mimeType,
            width: format.width,
            qualityLabel: format.qualityLabel,
            quality: format.quality,
            container: format.container
        },
        title: `${info.title}.mp4`
    }

    axios.get(`${API_LINK}/download/mp4`, {
        params: {
            url:url,
            formats: JSON.stringify(formats)
        },
    })
    .then(response => {
        FileDownload(response.data);
    })
    
}

export const downloadMp3 = (url,title) =>  {
    const filename = `${title}.mp3`
    axios.get(`${API_LINK}/download/mp3`, {
        params: {
            URL:url,
            TITLE: filename
        },
    })
    .then(response => {
        FileDownload(response.data, filename);
    })
    // window.location.href = `${API_LINK}/download/mp3?URL=${url}&TITLE=${filename}`
}

export const downloadAudio = (url,title) =>  {
    const filename = `${title}.flac`
    window.location.href = `${API_LINK}/download/audio?URL=${url}&TITLE=${filename}`
}
export default convertLink | downloadMp3 | downloadMp4 | downloadAudio