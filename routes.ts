import express from 'express';
import mime from 'mime';
import controller from './controller';

const router = express.Router();

router.post('/Voucher', controller.InsertVouchers);
router.post('/Voucher', controller.DeleteVoucher);
export = router;
