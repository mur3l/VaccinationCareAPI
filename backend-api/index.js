require('dotenv').config();

const port = process.env.PORT || 8080;
const host = 'localhost';

const express = require('express');
const cors = require('cors');
const session = require('express-session');

const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');

const app = express();

const swaggerDocument = yamljs.load('./docs/swagger.yaml');
const { sync } = require("./db");

app.use(cors({
  origin: ['http://localhost:8081', 'http://localhost:8080'],
  credentials: true
}));

app.options(/.*/, cors({
  origin: ['http://localhost:8081', 'http://localhost:8080'],
  credentials: true
}));

app.use(express.json());

app.use(session({
  name: 'sid',
  secret: process.env.SESSION_SECRET || 'dev-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
  }
}));

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

require("./routes/ksRoutes.js")(app);

app.listen(port, async () => {
  if (process.env.SYNC === 'true') {
    await sync();
  }
  console.log(`API on aadressil: http://${host}:${port}`);
});
