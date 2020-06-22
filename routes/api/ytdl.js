const Fs = require('fs')
const Path = require('path')

const express = require('express')
const router = express.Router()
const ytdl = require('ytdl-core')

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
    const {url, formats} = await req.query
    const videoFormats = JSON.parse(formats)
    const {
        video_formats: {height, mimeType, width, qualityLabel, quality, container},
        title,
    } = videoFormats

    const path = Path.resolve(__dirname, 'files', title)

    const videoFile = await ytdl(url, {
        format: container,
        filter: (format) =>
            format.container === container &&
            format.height === height &&
            format.mimeType === mimeType &&
            format.quality === quality &&
            format.qualityLabel === qualityLabel &&
            format.width === width,
    });
 
    videoFile.pipe(Fs.createWriteStream(path))

    const promise = new Promise((resolve, reject) => {
        videoFile.on('end' ,() => {
            resolve('Saved Successfully')
        })
        videoFile.on('error' ,(err) => {
            reject(err)
        })
    })

    promise.then((value) => {
        res.json(value)
    });
      
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
