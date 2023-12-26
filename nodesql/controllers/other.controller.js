const Student = require('../models/studentModel');
const { successResponse, errorResponse } = require('../lib/responseHandler');
const fs = require('fs');
const path = require('path');
const imgToPdf = require('../helper/imgToPdf');
const axios = require('axios');
const redisClient = require('../server');

// Retrieve all Tutorials from the database (with condition).
const convertImage = (req, res) => {
    try {
        const { encodedImg } = req.body;
        //let imgbase64Data = encodedImg.replace(/^data:image\/png;base64,/, "");
        let imgbase64Data = encodedImg.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

        if (imgbase64Data.length !== 3) {
            return new Error("Invalid input string");
        }
        const buffer = Buffer.from(imgbase64Data[2], "base64");

        let timeVal = Date.now();
        let filePathPng = `../uploads/${timeVal}-img.png`;
        let filePathJpg = `../uploads/${timeVal}-img.jpg`;
        let filePathPdf = `../uploads/${timeVal}-img.pdf`;
        let finalImgPath = "http://" + req.headers.host + '/uploads/' + timeVal + '-img';
        fs.writeFileSync(path.join(__dirname, filePathPng), buffer);
        fs.writeFileSync(path.join(__dirname, filePathJpg), buffer);
        //fs.writeFileSync(path.join(__dirname,filePathPdf), buffer);
        imgToPdf.convertImgToPdf(path.join(__dirname, filePathJpg), path.join(__dirname, filePathPdf));
        return successResponse(res, 200, "Image saved successfully", {
            originalImgType: imgbase64Data[1],
            pngPath: finalImgPath + ".png",
            jpgPath: finalImgPath + ".jpg",
            pdfPath: finalImgPath + ".pdf",

        });
    } catch (err) {
        return errorResponse(res, 500, "convertImage Error", err);
    }
};

const fileProcess = (req, res) => {
    try {
        return successResponse(res, 200, "Image saved successfully", {})

    } catch (err) {
        return errorResponse(res, 500, "fileProcess Error", err);
    }
}

const dataCaching = async (req, res) => {
    try {
        const species = req.params.species;
        let result;
        let isCached = false;
        let redisObj = req.redisObj;
        const redisResult = await redisObj.get(species);
        //console.log("redis cached",redisResult);
        if (redisResult) {
            //we can also create middleware function here to better and reuse the code
            //in which we pass the key of redis where redis will return the value or null
            isCached = true;
            return successResponse(res, 200, "cached response", { isCached,data:redisResult})
        }else{
            const apiResponse = await axios.get(
                `https://www.fishwatch.gov/api/species/${species}`
            );
            await redisObj.set(species,apiResponse.data);
            return successResponse(res, 200, "api response", { isCached,data:apiResponse.data})
        }

    } catch (err) {
        return errorResponse(res, 500, "dataCaching Error", err);
    }
}

module.exports = {
    convertImage,
    fileProcess,
    dataCaching
}