const Fs = require('fs')
const Path = require('path')
const express = require('express')
const router = express.Router()
const ytdl = require('ytdl-core')

const {
    convertVideoAndAudio,
    mergeVideoAndAudio
} = require('../_utils/processClass')


const getFilesizeInBytes = async (filename) =>  {
    let file = Fs.statSync(filename)
    let bytes = file["size"]
    var size = bytes / 1000000.0 - 1.1
    return size
}


router.get('/convert', async (req, res) => {
    try {
        const url = req.query.URL
        await ytdl.getInfo(url, (err, info) => {
            res.json(info)
        })
    } catch (err) {
        res.json(err)
    }
})

router.get('/download/mp4', async (req, res) => {
    const {url, formats} = req.query
    const videoFormats = JSON.parse(formats)
    if(!videoFormats)   {
        res.json({
            type: 'ERROR',
            payload: 'NO_FORMATS'
        })
    }

    try {
        if(!await convertVideoAndAudio(url,videoFormats,res))  {
            res.json({
                type: 'ERROR',
                payload:'UNABLED_TO_DOWNLOAD'
            })
        }

        await mergeVideoAndAudio(videoFormats, async (response) => {
            const action = JSON.parse(response)
            switch(action.type)    {
                case 'MERGE_AUDIO_AND_VIDEO_SUCCESSFULLY':
                    try {
                        const fileSize = await getFilesizeInBytes(action.payload.filePath)
                        res.json({
                            type: action.type,
                            filename: action.payload.filename,
                            size: fileSize,
                            link: `/download/video/${action.payload.filename}`,
                            quality: action.payload.quality,
                        })
                    } catch(err)    {
                        res.json({
                            type: 'ERROR_FILE',
                            error: err
                        })
                    }
                    break;
                case 'MERGE_AUDIO_AND_VIDEO_ERROR':
                    console.log(action)
                    break;
                default:
                    res.json({
                        type: 'NULL',
                        payload:'UNDEFINED'
                    })
            }
        })
    } catch(err) {
        res.json({
            payload: err
        })
    }
})

router.get('/download/video/:filename', (req, res) => {
    const {filename} = req.params
    const video = Path.resolve(`./routes/api/files/${filename}`);
    res.download(video)
})

router.get('/download/mp3', async (req, res) => {
    const {youtube_url, information, formats} = req.query
    const filename = `${information}.mp3`
    res.setHeader('Content-disposition', 'attachment; filename=' + filename)
    await ytdl(youtube_url, {
        audioBitrate: formats,
        format: 'mp3',
    }).pipe(res)
})

router.get('/download/audio', async (req, res) => {
    const {youtube_url, information, formats} = req.query
    const filename = `${information}.mp3`
    res.setHeader('Content-disposition', 'attachment; filename=' + filename)
    await ytdl(youtube_url, {
        audioBitrate: formats,
        format: 'mp3',
    }).pipe(res)
})

module.exports = router
