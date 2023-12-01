const { tracesCollection } = require("../../database");

const {
  v4: uuid,
} = require("uuid");
class TraceRepository {
  async findAll() {
    const traces = await tracesCollection.find().toArray();

    return traces;
  }

  async findByTraceId(traceId) {
    const trace = await tracesCollection.findOne({ traceId });

    return trace;
  }

  async create({ serviceName, traceId, genericData, timestamp, checkpointName, isError, successorBy }) {
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
          successorBy,
          genericData: genericData || null
        }
      ]
    });

    const traceCreated = await tracesCollection.findOne({ traceId });

    return traceCreated;
  }

  async update({ traceId, serviceName, timestamp, checkpointName, isError, genericData, successorBy }) {
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
            successorBy,
            genericData: genericData || null
          }
        }
      }
    );

    const traceUpdated = await tracesCollection.findOne({ traceId });

    return traceUpdated;
  }

  async delete(traceId) {
    await tracesCollection.deleteOne({ traceId });
  }
}

module.exports = new TraceRepository();