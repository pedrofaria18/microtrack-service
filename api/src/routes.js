const { Router } = require('express');

const TraceController = require('./app/controllers/TraceController');

const router = Router();

router.post('/traces', TraceController.store);

module.exports = router;