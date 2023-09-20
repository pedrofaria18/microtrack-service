const TraceRepository = require("../repositories/TraceRepository");

class TraceController {
  async store(request, response) {
    const {
      serviceName,
      traceId,
      genericData
    } = request.body;

    if (!serviceName) {
      return response.status(404).json({ error: 'Service name is required' });
    }

    if (!traceId) {
      return response.status(404).json({ error: 'Trace ID is required' });
    }

    const trace = await TraceRepository.create({
      serviceName,
      traceId,
      genericData: genericData || null
    });

    response.status(201).json(trace);
  }
}

module.exports = new TraceController();