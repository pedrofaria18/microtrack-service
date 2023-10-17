const { MongoClient } = require('mongodb')

const mongoUrl = 'mongodb://microtrack:microtrack@localhost:27017/?authMechanism=DEFAULT'

const client = new MongoClient(mongoUrl)

client.connect()

const dbName = 'microtrack'
const db = client.db(dbName)
const tracesCollection = db.collection('traces')

module.exports = {
  tracesCollection
}




