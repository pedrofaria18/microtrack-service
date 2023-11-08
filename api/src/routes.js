const { Router } = require('express');

const TraceController = require('./app/controllers/TraceController');

const router = Router();

router.get('/traces', TraceController.index);
router.get('/traces/:traceId', TraceController.show);
router.delete('/traces/:traceId', TraceController.delete);
router.post('/traces', TraceController.store);

module.exports = router;