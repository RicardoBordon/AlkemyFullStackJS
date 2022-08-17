const { Router } = require('express');
const { createOperation, readAllOperation, readOperation, updateOperation, deleteOperation, balance } = require('../controllers/operationController')

const router = Router();

router.post('/createOperation', createOperation);
router.post('/readAllOperation', readAllOperation);
router.get('/readOperation/:user/:id', readOperation);
router.post('/updateOperation/:user/:id', updateOperation);
router.delete('/deleteOperation', deleteOperation);
router.post('/balance', balance);


module.exports = router;
