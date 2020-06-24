const Fs = require('fs')
const Path = require('path')
const express = require('express')
const router = express.Router()
const ytdl = require('ytdl-core')

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath(ffmpegPath)

const {
    getVideoContent,
    getAudioFile,
    convertVideoAndAudio,
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
    console.log(convertVideoAndAudio(url,videoFormats))
   
})

router.get('/convertFile', (req, res) => {
    const fullVid = new ffmpeg()
        .addInput(Path.resolve(`./routes/api/files/${req.query.title}.mp4`))
        .addInput(Path.resolve(`./routes/api/files/${req.query.title}.mp3`))
        .saveToFile(Path.resolve(__dirname, 'files', `this.mp4`))

    const promise = new Promise((resolve, reject) => {
        fullVid.on('end', () => {
            resolve('Saved Successfully')
        })

        fullVid.on('error', (err) => {
            reject(err)
        })
    })

    promise.then((value) => {
        res.json(value)
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
