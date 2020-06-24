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

    try {
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

        await new Promise((resolve, reject) => {
            videoFile.on('finish', () => {
                resolve('SAVED_VIDEO_SUCCESSFULLY')
            })
            videoFile.on('error', (err) => {
                reject()
            })
        }).then((value) => {
            res(value)
        })
    } catch (err) {
        console.error(err)
    }
}

const getAudioFile = async (url, filename, res) => {
    const audiopath = Path.resolve(__dirname, '../api/files', `${filename}.mp3`)
    try {
        const audioFile = await ytdl(url, {
            format: 'mp3',
        })
        audioFile.pipe(Fs.createWriteStream(audiopath))

        await new Promise((resolve, reject) => {
            audioFile.on('finish', () => {
                resolve('SAVED_AUDIO_SUCCESSFULLY')
            })
            audioFile.on('error', (err) => {
                reject()
            })
        }).then((value) => {
            res(value)
        })
    } catch (err) {
        console.error(err)
    }
}

const videoProcessResult = async (url,videoFormats) => {
   try {
        await getVideoContent(url, videoFormats, (response) => {
            return response === 'SAVED_VIDEO_SUCCESSFULLY'
        })
   } catch(err) {
       return err
   }
}

const audioProcessResult = async (url,videoFormats) => {
    try {
        await getAudioFile(url, videoFormats.filename, (response) => {
            return response === 'SAVED_AUDIO_SUCCESSFULLY'
        })
    } catch(err) {
        return err
    }
 }


const convertVideoAndAudio = async (url,videoFormats) => {
    try {
        await videoProcessResult(url,videoFormats)
        await audioProcessResult(url,videoFormats)
        return true
    } catch (err) {
        return err
    }
}

module.exports = {convertVideoAndAudio}
