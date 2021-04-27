import express from 'express';
import mime from 'mime';
import { InsertVouchers, DeleteVoucher } from './controller';


const router = express.Router();

router.post('/Voucher', InsertVouchers);
router.post('/Voucher', DeleteVoucher);
export = router;
