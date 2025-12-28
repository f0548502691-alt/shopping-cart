const { Client } = require('@elastic/elasticsearch');

const esClient = new Client({
  node: 'http://localhost:9200',
  requestTimeout: 30000,
  sniffOnStart: false,
});

async function test() {
  try {
    console.log('Testing Elasticsearch connection...');
    const info = await esClient.info();
    console.log('SUCCESS! Connected to:', info);
  } catch (error) {
    console.error('ERROR:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      cause: error.cause,
      meta: error.meta
    });
  }
}

test();
