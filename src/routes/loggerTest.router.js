const getLoggerTest = require('../controllers/loggerTest/getLoggerTest');
const { Router } = require('express')
const router = Router();

router.get('/', getLoggerTest);

module.exports = router