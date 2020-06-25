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
            value:false
        })
    }

    if(!await convertVideoAndAudio(url,videoFormats,res))  {
        res.json({
            type: 'ERROR',
            value:false
        })
    }

    await mergeVideoAndAudio(videoFormats.filename,videoFormats.videoFilename, (response) => {
        console.log(response)
    })

})

router.get('/download/mp3', (req, res) => {
    // res.json({youtube_url,information,formats}) TESTING
    const {youtube_url, information, formats} = req.query
    const filename = `${information}.mp3`
    res.setHeader('Content-disposition', 'attachment; filename=' + filename)
    ytdl(youtube_url, {
        audioBitrate: formats,
        format: 'mp3',
    }).pipe(res)
})

router.get('/download/audio', (req, res) => {
    // res.json({youtube_url,information,formats}) TESTING
    const {youtube_url, information, formats} = req.query
    const filename = `${information}.mp3`
    res.setHeader('Content-disposition', 'attachment; filename=' + filename)
    ytdl(youtube_url, {
        audioBitrate: formats,
        format: 'mp3',
    }).pipe(res)
})

module.exports = router
