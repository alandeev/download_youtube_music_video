const express = require('express');
const fs = require('fs');
const { downloader } = require('./src/controller');

const sleep = seconds => new Promise(resolve => setTimeout(resolve, seconds * 1000));

const dir = __dirname+'\\downloads\\';

const app = express();

//convert data recived to json
app.use(express.json());

require('./src/routers')(app); //execution routers

app.listen(3333, () => { 
  if(!fs.existsSync(dir))
    fs.mkdirSync(dir);
  console.log("Back-end started ✔");
})