const express = require('express');
const cors = require('cors');
const fs = require('fs');

const port = 3333;

const dir = __dirname+'\\src\\downloads\\';

const app = express();

app.use(cors());

//convert data recived to json
app.use(express.json());

require('./src/routers')(app); //execution routers

app.listen(3333, () => { 
  if(!fs.existsSync(dir))
    fs.mkdirSync(dir);
  console.log(`Back-end started port: ${port} ✔`);
})