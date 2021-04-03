import { NextFunction, Request, Response } from 'express';
import logging from '../../config/logging';
import { Connect, Query } from '../../config/mysql';
const formidable = require('formidable');

const NAMESPACE = 'Books';

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    const form = formidable({ multiples: true });
    //ts bat buoc phai khai bao type ak
    console.log('create book');
    // form.parse(req, (err: dien vao, fields, files) => {
    //     console.log('create book2');

    //     res.writeHead(200, { 'content-type': 'application/json' });
    //     res.end(JSON.stringify({ fields, files }, null, 2));
    // });

    logging.info(NAMESPACE, 'Inserting books');
    // insert
     let { a, b, c } = req.body;
    console.log(req.body);
    //console.log('sdfsdfdd');

    // insert 
    let query = `INSERT INTO type_member (name_type, point_start, point_end) VALUES ("${a}", "${b}","${c}")`;

     Connect()
         .then((connection) => {
           Query(connection, query)
                 .then((result) => {
                     logging.info(NAMESPACE, 'Book created: ', result);
                     return res.status(200).json({
                         result
                     });
                 })
                 .catch((error) => {
                     logging.error(NAMESPACE, error.message, error);

                     return res.status(200).json({
                         message: error.message,
                         error
                     });
                 })
                 .finally(() => {
                     logging.info(NAMESPACE, 'Closing connection.');
                     connection.end();
                 });
         })
         .catch((error) => {
             logging.error(NAMESPACE, error.message, error);

             return res.status(200).json({
                 message: error.message,
                 error
          });
         });
};

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all books.');

    //SELECT FROM TABLES

    let query = 'SELECT * FROM type_member';

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    logging.info(NAMESPACE, 'Retrieved books: ', results);

                    return res.status(200).json({
                        results
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

export default { createBook, getAllBooks };
