const express = require('express');
const router  = express.Router();

const auth = require('../controllers/authController')

router.post('/register', auth.register);
router.post('/authenticate', auth.authenticate);

module.exports = router;