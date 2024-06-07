import express from 'express';
import dotenv from 'dotenv';

import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(
  cors({
    origin: '*',
  }),
);

app.use(bodyParser.json());

app.get('/', (req, res) => {
  return res.send('Xpense Server');
});

app.get('/health', (req, res) => {
  const healthcheck = {
    resource: 'Xpense Server',
    uptime: process.uptime(),
    responseTime: process.hrtime(),
    message: 'OK',
    timestamp: Date.now(),
  };
  try {
    return res.send(healthcheck);
  } catch (error) {
    healthcheck.message = error;
    return res.status(503).send();
  }
});

import router from './routes.js';

app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
