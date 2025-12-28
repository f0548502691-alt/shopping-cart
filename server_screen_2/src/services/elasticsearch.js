const { Client } = require('@elastic/elasticsearch');

const esNode = process.env.ES_NODE || 'http://localhost:9200';
const esIndex = process.env.ES_INDEX || 'orders';

// Configure client for ES 8.x
const esClient = new Client({
  node: esNode,
  requestTimeout: 30000,
  sniffOnStart: false
});

const indexMapping = {
  mappings: {
    dynamic: 'strict',
    properties: {
      customer: {
        properties: {
          firstName: { type: 'text', fields: { keyword: { type: 'keyword' } } },
          lastName: { type: 'text', fields: { keyword: { type: 'keyword' } } },
          fullAddress: { type: 'text' },
          email: { type: 'keyword' },
        },
      },
      products: {
        type: 'nested',
        properties: {
          id: { type: 'keyword' },
          name: { type: 'text', fields: { keyword: { type: 'keyword' } } },
          quantity: { type: 'integer' },
          price: { type: 'double' },
        },
      },
      createdAt: { type: 'date' },
    },
  },
};

async function ensureIndex() {
  try {
    // First, test the connection
    console.log(`[Elasticsearch] Testing connection to ${esNode}...`);
    const info = await esClient.info();
    console.log(`[Elasticsearch] Connected to cluster: ${info.cluster_name} (version ${info.version.number})`);
    
    const exists = await esClient.indices.exists({ index: esIndex });
    if (!exists) {
      await esClient.indices.create({ index: esIndex, ...indexMapping });
      console.log(`[Elasticsearch] Created index: ${esIndex}`);
    } else {
      console.log(`[Elasticsearch] Index ${esIndex} already exists`);
    }
  } catch (error) {
    console.error('[Elasticsearch] Connection error:', {
      message: error.message,
      code: error.code,
      cause: error.cause?.message,
      meta: error.meta?.body || error.meta,
      node: esNode
    });
    throw new Error(`Cannot connect to Elasticsearch at ${esNode}. Is it running?`);
  }
}

module.exports = { esClient, ensureIndex, indexMapping };
