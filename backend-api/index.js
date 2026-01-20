require('dotenv').config();
const port = process.env.PORT || 8080;
const host = 'localhost';
const express = require('express');
const cors = require('cors');
const app = express();
//13.01 Tunnis
const session = require('express-session')

const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');

const swaggerDocument = yamljs.load('./docs/swagger.yaml');
//const swaggerDocument = require('./docs/swagger.json');



const {sync} = require("./db");

//app('/vaccinations', (req, res) => {
//  res.send(["Terminator2", "Minions", "Devil wears a prada"])    
//})

app.use(cors({
  origin: ['http://localhost:8081', 'http://localhost:8080'],
  credentials: true
}));

app.options(/.*/, cors({
  origin: ['http://localhost:8081', 'http://localhost:8080'],
  credentials: true
}));

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(express.json());

require("./routes/ksRoutes.js")(app);

app.listen(port, async () => {
    if (process.env.SYNC === 'true') {await sync()}
    console.log(`API on aadressil: http://${host}:${port}`);
})

//Material Icon Theme
 