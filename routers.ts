import express from 'express';
import controller from './controllers';

const router = express.Router();

router.post('/create/book', controller.createBook);
router.get('/get/books', controller.getAllBooks);

export = router;
// 
