const router = require('express').Router();
const book_controller = require('../controllers/book_controller');



router.post('/', book_controller.addBook);
router.get('/', book_controller.getAllBooks);
router.get('/:id', book_controller.getBookById);
router.patch('/:id', book_controller.updateBook);
router.delete('/:id', book_controller.deleteBook);
router.get('/grade-level/:gradeLevel', book_controller.getBooksByGradeLevel);


module.exports = router;