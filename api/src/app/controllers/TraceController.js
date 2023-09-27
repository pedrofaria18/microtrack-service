const TraceRepository = require("../repositories/TraceRepository");

class TraceController {
  async store(request, response) {
    const {
      serviceName,
      traceId,
      timestamp,
      checkpointName,
      isError,
      genericData
    } = request.body;

    if (!serviceName) {
      return response.status(404).json({ error: 'Service name is required' });
    }

    if (!traceId) {
      return response.status(404).json({ error: 'Trace ID is required' });
    }

    if (!checkpointName) {
      return response.status(404).json({ error: 'Checkpoint name is required' });
    }

    const trace = await TraceRepository.create({
      serviceName,
      traceId,
      timestamp,
      checkpointName,
      isError,
      genericData: genericData || null
    });

    response.status(201).json(trace);
  }
}

module.exports = new TraceController();