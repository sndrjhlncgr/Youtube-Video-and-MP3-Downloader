const express = require('express')
const router = express.Router()
const ytdl = require('ytdl-core');

router.get('/convert',async (req, res) => {
  try {
		const url = req.query.URL;
		await ytdl.getInfo(url, { 
      filter: format => format.container === 'mp4',
      quality: 'highest'
    },(err, info) => {
		  res.json(info)
		});
	} catch (err) {
		res.json(err);
	}
})



module.exports = router
