import { Request, Response, NextFunction, query } from 'express';
import logging from '../../config/logging';
import { Connect, Query } from '../../config/mysql';
import { connect } from '../bookAPI/routers';

const NAMESPACE = 'Vouchers';
// insert vouchers
const InsertVouchers = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'InsertVouchers');
    console.log('Day la req', req.body);
    var { id_coupon, id_type_coupon, start_time, end_time, expired } = req.body;

    let query = `insert into coupon (id_coupon, id_type_coupon, start_time, end_time, expired) values ("${id_coupon}","${id_type_coupon}", "2021-5-1", "2021-6-1", "2021-12-31" );`;

    Connect().then((connection) => {
        Query(connection, query)
            .then((result: any) => {
                return res.status(200).json({
                    data: SpeechRecognitionResultList,
                    message: ' Insert succeed',
                    statusCode: 200
                });
            })
            .catch((error) => {
                logging.error(NAMESPACE, error.message, error);
                return res.status(500).json({
                    message: error.message,
                    errors: 'Vouchers have exited.',
                    error
                });
            })
            .finally(() => {
                connection.end();
            });
    });
};

const DeleteVoucher = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'DeleteVoucher');
    console.log('Day la req', req.body);
    const ids = Number(req.body.ids);
    let Query = `DELETE FROM Coupon where id_coupon = '1' `;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results: any) => {
                    return res.status(200).json({
                        data: results,
                        message: 'Delete succeed',
                        statusCode: 200
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);
                    return res.status(500).json({
                        message: error.message,
                        // errors: "Loi tim kiem k co",
                        error
                    });
                })
                .finally(() => {
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(500).json({
                message: error.message,
                error
            });
        });
};
export default { InsertVouchers, DeleteVoucher };
