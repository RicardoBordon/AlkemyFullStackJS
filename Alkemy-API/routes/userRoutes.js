const { Router } = require('express');
const { createUser, login } = require('../controllers/userController')

const router = Router();

router.post('/createUser', createUser);
router.post('/login', login);

module.exports = router;