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

router.get('/download/mp4', (req, res) => {
    // res.json(res.query)
    // const {url, formats} = req.query
    // res.json(JSON.parse(formats))
    // const {
    //     format: {height, mimeType, width, qualityLabel, quality, container},
    //     title,
    // } = JSON.parse(formats)
    // console.log(height, mimeType, width, qualityLabel, quality, container,url,title)
    // const headerFilename = `attachment; filename=${title}`
    // res.set({
    //     'Content-Disposition': headerFilename,
    // })
    // const file = ytdl(url, {
    //     format: container,
    //     filter: (format) =>
    //         format.container === container &&
    //         format.height === height &&
    //         format.mimeType === mimeType &&
    //         format.quality === quality &&
    //         format.qualityLabel === qualityLabel &&
    //         format.width === width,
    // }).pipe(res)
    // res.download(file)
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
