const express = require('express');

const router = express.Router();
const other = require('../controllers/other.controller');

router.use((req,res,next)=>{
    console.log("creating the api log entry");
    res.myCustomId = "2349023832409";
    next();
})

router.route('/img-convert')
.post(other.convertImage)

router.route('/fileprocess')
.get(other.fileProcess)

router.route('/data-caching/:species')
.get(other.dataCaching)


module.exports = router;