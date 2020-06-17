const express = require('express')
const router = express.Router()
const ytdl = require('ytdl-core')

router.get('/convert', async (req, res) => {
    try {
        const url = req.query.URL
        await ytdl.getInfo(url,  (err, info) => {
                res.json(info)
            }
        )
    } catch (err) {
        res.json(err)
    }
})

router.get('/download/selectedVideo', async (req, res) => {  
    var {URL} = req.query;
    res.header('Content-Disposition', 'attachment; filename="video.mp3"');
    ytdl(URL, {
        format: 'mp3'
        }).pipe(res);      
 });

module.exports = router
