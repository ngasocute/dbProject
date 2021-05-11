import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
//import multer from 'multer';
import logging from './config/logging';
import config from './config/config';
//import bookRoutes from './API/bookAPI/routers';
import { Connect } from './config/mysql';
import bookRoutes from './API/Voucher/routes';
import signIn from './API/signIn/routes';
import register from './API/register/routes';
import InsertVouchers from './API/Voucher/routes';
import DeleteVoucher from './API/Voucher/routes';

const NAMESPACE = 'Server';
const router = express();
//const mongoose = require('mongoose');
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

// app.use(bodyParser.urlencoded({ extended: true }));
//router.use(bodyParser.urlencoded({ extended: true }));
/** Log the request */

// Upload image
// router.post('upload_image', (request, response, next) => {
//     let formidable = require('formidable');

//     var form = new formidable.incomingForm();
//     form.uploadDir = './upload';
//     form.keepExtension = true;
//     form.maxFileSize = 10 * 1024 * 1024;
//     form.multiples = true;
//     form.parse(request,(err, fields, files) => {
//         if (err) {
//             response.json({
//                 result: 'failed',
//                 data: {},
//                 messege: 'Cannot upload images. Error is: ${err}'
//             });
//         }
//         var arrayOfFiles = files[""];
//         if (arrayOfFiles.length > 0) {
//             var fileNames = [];
//             arrayOfFiles.forEach((eachFile) => {
//                 fileNames.push(eachFile.path);
//             });
//             response.json({
//                 result: 'ok',
//                 data: fileNames,
//                 numberOfImages:fileNames.length,
//                 messege: 'Upload images successfully!',
//             });
//         }
//         else {
//             response.json({
//                 result: 'failed',
//                 data: {},
//                 numberOfImages:0,
//                 messege: 'No images to upload!',
//             });
//         };
//     });
// });

/** Parse the body of the request */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());
//var bodyParser = require('body-parser');
//router.use(bodyParser.urlencoded({ extended: true }));

router.use((req, res, next) => {
    /** Log the req */
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});
/** Rules of our API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Routes go here */
router.use(bookRoutes);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));
