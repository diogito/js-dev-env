import express from 'express';
import path from 'path';
import open from 'open';
import middleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import config from '../webpack.config.dev';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(middleware(compiler, {
  logLevel: "warn",
  publicPath: config.output.publicPath
}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/users', function(req, res) {
  res.json([
    {"id": 1, "firstName":"Bob", "lastName":"Smith", "email": "bob@smith.com"},
    {"id": 2, "firstName":"Ana", "lastName":"Mella", "email": "ana@mella.com"},
    {"id": 3, "firstName":"Teo", "lastName":"Walcot", "email": "teo@wallcot.com"}
  ]);
});

app.listen(port, function(err) {
  if(err){
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
});
