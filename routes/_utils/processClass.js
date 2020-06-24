const Fs = require('fs')
const Path = require('path')
const ytdl = require('ytdl-core')

const getVideoContent = async (url, formats, res) => {
    const {
        video_formats: {
            height,
            mimeType,
            width,
            qualityLabel,
            quality,
            container,
        },
        filename,
    } = formats
    const videopath = Path.resolve(__dirname, '../api/files', `${filename}.mp4`)

    const videoFile = await ytdl(url, {
        format: container,
        filter: (format) =>
            format.container === container &&
            format.height === height &&
            format.mimeType === mimeType &&
            format.quality === quality &&
            format.qualityLabel === qualityLabel &&
            format.width === width,
    })

    videoFile.pipe(Fs.createWriteStream(videopath))

    const promise = new Promise((resolve, reject) => {
        videoFile.on('finish', () => {
            resolve('SAVED_VIDEO_SUCCESSFULLY')
        })
        videoFile.on('error', (err) => {
            reject('ERROR')
        })
    })

    promise.then(value => {
        res(value)
    }) 
}

const getAudioFile = async (url, filename, res) => {
    const audiopath = Path.resolve(__dirname, '../api/files', `${filename}.mp3`)
    const audioFile = await ytdl(url, {
        format: 'mp3',
    })
    audioFile.pipe(Fs.createWriteStream(audiopath))

    const promise = new Promise((resolve, reject) => {
        audioFile.on('finish', () => {
            resolve('SAVED_AUDIO_SUCCESSFULLY')
        })
        audioFile.on('error', (err) => {
            reject('ERROR')
        })
    })

    promise.then(value => {
        res(value)
    }) 
}
const convertVideoAndAudio = (url, videoFormats) => {
    const result = []
    this.getVideoContent(url, videoFormats, (response) => {
        result.push(response)
    })

    this.getAudioFile(url,videoFormats.filename, (response) => {
        result.push(response)
    })

    const result = result

    //here you need to put resposne

    
}
module.exports = {getVideoContent, getAudioFile}
