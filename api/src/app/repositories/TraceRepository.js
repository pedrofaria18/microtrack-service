const { tracesCollection } = require("../../database");

class TraceRepository {
  async create({ serviceName, traceId, genericData }) {
    const trace = await tracesCollection.insertOne({
      serviceName,
      traceId,
      genericData
    });

    return trace;
  }
}

module.exports = new TraceRepository();