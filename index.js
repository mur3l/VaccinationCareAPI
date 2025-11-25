require('dotenv').config();
const port = process.env.PORT || 8080;
const host = 'localhost';
const express = require('express');
const cors = require('cors');
const app = express();

const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');

<<<<<<< HEAD
const swaggerDocument = require('./docs/swagger.json');
//const swaggerDocument = yamljs.load('./docs/swagger.yaml');
=======
//const swaggerDocument = yamljs.load('./docs/swagger.yaml');
const swaggerDocument = require('./docs/swagger.json');
>>>>>>> f77d720b9d2c539580a6b6de150649f46491e33f

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`API on aadressil: http://localhost:${port}`);
})
