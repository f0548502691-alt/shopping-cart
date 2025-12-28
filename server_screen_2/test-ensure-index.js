const { esClient, ensureIndex } = require('./src/services/elasticsearch');

async function test() {
  try {
    console.log('Testing ensureIndex...');
    await ensureIndex();
    console.log('SUCCESS!');
  } catch (error) {
    console.error('ERROR:', error);
  }
  process.exit(0);
}

test();
