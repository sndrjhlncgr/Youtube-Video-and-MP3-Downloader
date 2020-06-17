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

router.get('/download/mp4', async (req, res) => {
    const {URL, TITLE} = req.query
    const headerFilename = `attachment; filename=${TITLE}`
    res.set({
        'Content-Disposition': headerFilename,
    })
    const file = ytdl(URL, {
        format: 'mp4',
    }).pipe(res)

    res.download(file)
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
