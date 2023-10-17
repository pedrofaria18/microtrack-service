const { tracesCollection } = require("../../database");
class TraceRepository {
  async findAll() {
    const traces = await tracesCollection.find().toArray();

    return traces;
  }

  async findByTraceId(traceId) {
    const trace = await tracesCollection.findOne({ traceId });

    return trace;
  }

  async create({ serviceName, traceId, genericData, timestamp, checkpointName, isError }) {
    await tracesCollection.insertOne({
      traceId,
      createdAt: new Date(),
      updatedAt: new Date(),
      events: [
        {
          serviceName,
          timestamp,
          checkpointName,
          isError,
          genericData: genericData || null
        }
      ]
    });

    const traceCreated = await tracesCollection.findOne({ traceId });

    return traceCreated;
  }

  async update({ traceId, serviceName, timestamp, checkpointName, isError, genericData }) {
    await tracesCollection.updateOne(
      { traceId },
      {
        $set: {
          updatedAt: new Date(),
        },
        $push: {
          events: {
            serviceName,
            timestamp,
            checkpointName,
            isError,
            genericData: genericData || null
          }
        }
      }
    );
  }
}

module.exports = new TraceRepository();