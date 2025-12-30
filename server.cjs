
const express = require('express');
const geminiHandler = require('./api/gemini.cjs');

const app = express();
app.use(express.json());

app.post('/api/gemini', geminiHandler);

const port = 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
