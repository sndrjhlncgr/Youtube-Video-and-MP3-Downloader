const express = require('express')
const router = express.Router()
const ytdl = require('ytdl-core')
const glob = require('glob')
const { format } = require('morgan')

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
    console.log(req.query.options)
    // const {
    //     format: {height, mimeType, width, qualityLabel, quality, container},
    //     url,
    //     title,
    // } = req.query.options
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


router.get('/download/mp3', async (req, res) => {
    const {URL, TITLE} = req.query
    const headerFilename = `attachment; filename=${TITLE}`
    res.set({
        'Content-Disposition': headerFilename,
    })
    const file = ytdl(URL, {
        format: 'mp3',
    }).pipe(res)

    res.download(file);
})

router.get('/download/audio', async (req, res) => {
    const {URL, TITLE} = req.query
    const headerFilename = `attachment; filename=${TITLE}`
    res.set({
        'Content-Disposition': headerFilename,
    })
    const file = ytdl(URL, {
        filter: format => format.audioBitrate === 160,
        format: 'flac',
    }).pipe(res)

    res.download(file)
})

module.exports = router
