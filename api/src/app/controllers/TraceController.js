const TraceRepository = require("../repositories/TraceRepository");

class TraceController {
  async index(request, response) {
    const traces = await TraceRepository.findAll();

    response.json(traces);
  }

  async show(request, response) {
    const { traceId } = request.params;

    const trace = await TraceRepository.findByTraceId(traceId);

    if (!trace) {
      return response.status(404).json({ error: 'Trace not found' });
    }

    response.json(trace);
  }

  async store(request, response) {
    const {
      serviceName,
      traceId,
      timestamp,
      checkpointName,
    } = request.body;


    if (!traceId) {
      return response.status(404).json({ error: 'Trace ID is required' });
    }

    if (!serviceName) {
      return response.status(404).json({ error: 'Service name is required' });
    }

    if (!timestamp) {
      return response.status(404).json({ error: 'Timestamp is required' });
    }

    if (!checkpointName) {
      return response.status(404).json({ error: 'Checkpoint name is required' });
    }

    const traceExists = await TraceRepository.findByTraceId(traceId);

    let trace = {};

    if (traceExists) {
      trace = await TraceRepository.update(request.body);
    } else {
      trace = await TraceRepository.create(request.body);
    }

    response.status(201).json({
      message: 'Checkpoint saved successfully',
    });
  }
}

module.exports = new TraceController();