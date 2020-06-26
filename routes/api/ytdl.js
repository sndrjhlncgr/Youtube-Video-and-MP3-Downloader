const Fs = require('fs')
const Path = require('path')
const express = require('express')
const router = express.Router()
const ytdl = require('ytdl-core')

const {
    convertVideoAndAudio,
    mergeVideoAndAudio
} = require('../_utils/processClass')

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
        const output = Path.resolve(__dirname,`./files/${videoFormats.videoFilename}.mp4`)
        if(!await convertVideoAndAudio(url,videoFormats,res))  {
            res.json({
                type: 'ERROR',
                payload:'UNABLED_TO_DOWNLOAD'
            })
        }

        await mergeVideoAndAudio(videoFormats.filename,videoFormats.videoFilename, (response) => {
            const action = JSON.parse(response)
            switch(action.type)    {
                case 'MERGE_AUDIO_AND_VIDEO_SUCCESSFULLY':
                    res.json({
                        type: action.type,
                        filename: action.payload.filename,
                        link: `/download/${action.payload.filename}`
                    })
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

router.get('/download/:filename', (req, res) => {
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
