const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://varunsingh:test@cluster0.6zuyiir.mongodb.net/';

let client;

async function connectToDatabase() {
    try {
        client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
        return client.db('StudentData');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        throw err;
    }
}

function getClient() {
    if (!client) {
        throw new Error('Database client not initialized');
    }
    return client;
}

module.exports = { connectToDatabase, getClient };
