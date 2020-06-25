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


export const downloadMp4 = async (url,format,info) =>  {
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
        filename: `${info.video_id}`,
        videoFilename: `${info.title}`
    }

    await axios.get(`${API_LINK}/download/mp4`, {
        params: {
            url:url,
            formats: JSON.stringify(formats)
        },
    })
    .then(response => {
        
    })
    
}



export const downloadMp3 = (url,info,format) =>  {
    // axios.get(`${API_LINK}/download/mp3`, {
    //     params: {
    //         youtube_url:url,
    //         information: info.title,
    //         formats: format.audioBitrate
    //     },
    // })
    // .then(res => {
    //     console.log(res)
    // })

    // const filename = `${info.title}.mp3`
    window.location.href = `${API_LINK}/download/mp3?youtube_url=${url}&information=${info.title}&formats=${format.audioBitrate}`
}

export const downloadAudio = (url,info,format) =>  {
    // axios.get(`${API_LINK}/download/audio`, {
    //     params: {
    //         youtube_url:url,
    //         information: info.title,
    //         formats: format.audioBitrate
    //     },
    // })
    // .then(response => {
    //     console.log(response)
    // })
    window.location.href = `${API_LINK}/download/audio?youtube_url=${url}&information=${info.title}&formats=${format.audioBitrate}`
}
export default convertLink | downloadMp3 | downloadMp4 | downloadAudio