const Fs = require('fs')
const Path = require('path')
const ytdl = require('ytdl-core')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath(ffmpegPath)


const getVideoContent = async (url, formats, res,response) => {
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
                res.json({
                    type: 'ERROR',
                    error: err
                })
                reject('ERROR')
            })
        }).then((value) => {
            response(value)
        })
    } catch (err) {
        res.json({
            type: 'ERROR',
            error: err
        })
    }
}

const getAudioFile = async (url, filename, res, response) => {
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
                res.json({
                    type: 'ERROR',
                    error: err
                })
                reject('ERROR')
            })
        }).then((value) => {
            response(value)
        })
    } catch (err) {
        res.json({
            type: 'ERROR',
            error: err
        })
    }
}

const videoProcessResult = async (url,videoFormats,res) => {
   try {
        await getVideoContent(url, videoFormats,res, (response) => {
            return response === 'SAVED_VIDEO_SUCCESSFULLY'
        })
   } catch(err) {
        res.json({
            type: 'ERROR',
            error: err
        })
   }
}

const audioProcessResult = async (url,videoFormats,res) => {
    try {
        await getAudioFile(url, videoFormats.filename,res, (response) => {
            return response === 'SAVED_AUDIO_SUCCESSFULLY'
        })
    } catch(err) {
        res.json({
            type: 'ERROR',
            error: err
        })
    }
 }


const convertVideoAndAudio = async (url,videoFormats,res) => {
    try {
        await videoProcessResult(url,videoFormats,res)
        await audioProcessResult(url,videoFormats,res)
        return true
    } catch (err) {
        res.json({
            type: 'ERROR',
            error: err
        })
    }
}

const mergeVideoAndAudio = async (tempFilename, filename, response) => {
    const fullVid = new ffmpeg()
    .addInput(Path.resolve(`./routes/api/files/${tempFilename}.mp4`))
    .addInput(Path.resolve(`./routes/api/files/${tempFilename}.mp3`))
    .saveToFile(Path.resolve(`./routes/api/files/${filename}.mp4`))

    await new Promise((resolve, reject) => {
        fullVid.on('end', () => {
            resolve(JSON.stringify({
                type: 'MERGE_AUDIO_AND_VIDEO_SUCCESSFULLY',
                payload: {
                    filePath: Path.resolve(`./routes/api/files/${filename}.mp4`),
                    filename: `${filename}.mp4`
                },
            }))
        })
        fullVid.on('error', (err) => {
            reject(JSON.stringify({
                type: 'MERGE_AUDIO_AND_VIDEO_ERROR',
                payload: err,
            }))
        })
    }).then((value) => {
        response(value)
    })
}


module.exports = {convertVideoAndAudio,mergeVideoAndAudio}
