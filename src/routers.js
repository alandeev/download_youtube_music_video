const express = require('express');
const fs = require('fs')
const { downloader, getInfo, searchApi } = require('./controller');

const seconds = 5;

const sleep = seconds => new Promise(resolve => setTimeout(resolve, seconds * 1000));

const dir = __dirname+'\\downloads\\';

const Router = express.Router();

Router.get('/downloader', async (req, res) => {
  const url = req.query.url;
  console.log({url});

  if(!url)
    return res.status(400).send({ error: "Need send url to downloader" });
  
  let { format, filter } = req.query;
  let options = filter ? { filter } : {};

  format = format ? format : 'mp3';

  const { error, response } = await downloader(url, format, options);
  if(error)
    return res.status(400).send({ errorMessage: error });

  await sleep(seconds);
  res.download(dir+response.filename, (error) => {
    if(error) return;

    fs.unlink(dir+response.filename, () => {
      console.log({finally: true});
    });
  })
})

Router.get('/getinfo', async (req, res) => {
  const url = req.query.url;
  if(!url)
    return res.status(400).json({ error: "need send url" });

  const { response, error } = await getInfo(url);
  if(error)
    return res.status(400).json({ error });

  res.send(response);
})

Router.get('/search', async (req, res) => {
  const query = req.query.query;
  var { error, response } = await searchApi(query);
  if(error)
    return res.status(400).json({ error });

  res.json(response);
})

module.exports = app => app.use(Router)