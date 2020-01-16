const express = require('express');
const gplay = require('google-play-scraper');
const app = express();
const port = 8080;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(express.json())

app.get('/search/:app', async (req, res) => {
  const limit = req.query.limit;
  const searchResult = await search(req.params.app, limit)
  const mappedResult = searchResult.map(mapApp);
  res.send(mappedResult);
});

app.get('/:id/similar', async (req, res) => {
  const searchResult = await findSimilar(req.params.id)
  const mappedResult = searchResult.map(mapApp);
  res.send(mappedResult);
});

function mapApp(app) {
  return {
    title: app.title,
    id: app.appId,
    icon: app.icon,
    author: app.developer
  }
}

function search(app, limit = 20) {
  return gplay.search({
    term: app,
    num: limit,
  });
}

function findSimilar(id) {
  return gplay.similar({
    appId: id,
  });

}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));