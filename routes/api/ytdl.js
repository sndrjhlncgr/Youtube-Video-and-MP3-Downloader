var express = require('express');
var router = express.Router();

/* GET Video. */
router.get('/download', (req,res) => {
    var URL = req.query.URL;
    res.header('Content-Disposition', 'attachment; filename="video.mp4"');
    ytdl(URL, {
        format: 'mp4'
        }).pipe(res);
  });

module.exports = router;
