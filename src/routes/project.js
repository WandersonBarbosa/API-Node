const express = require('express');
const router  = express.Router();
const authMiddleware = require('../Middleware/auth')

const project = require('../controllers/projectController')
router.use(authMiddleware);
router.get('/', project.get);

module.exports = router;