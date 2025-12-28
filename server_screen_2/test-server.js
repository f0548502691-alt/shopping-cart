const express = require('express');
const app = express();

app.use(express.json());

app.post('/test', (req, res) => {
  console.log('Got request');
  res.json({ ok: true });
});

console.log('Starting server...');
app.listen(3002, () => {
  console.log('Server listening on 3002');
});
