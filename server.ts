import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
//import multer from 'multer';
import logging from './config/logging';
import config from './config/config';
import bookRoutes from './API/bookAPI/routers';

const NAMESPACE = 'Server';
const router = express();
// app.use(bodyParser.urlencoded({ extended: true }));
//router.use(bodyParser.urlencoded({ extended: true }));
/** Log the request */

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
