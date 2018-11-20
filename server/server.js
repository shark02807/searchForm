const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const colors = require('colors');
const productsMock = require('./mocks/products.json');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const log = (name, ...string) => {
  return (color) => {
    color = color || 'black';
    console.log(colors[color](name), string);
  }
};

app.get('/_jcr_content.getuserinfo.json', function(req, res) {
  log('QUERY', `${req.method} ${req.url}`)('blue');
  res.send({"status":200,"displayName":"Name","cartEntryCount":0});
});

app.get('/products/byId', function(req, res) {
  log('QUERY', `${req.method} ${req.url}`)('blue');
  res.send(productsMock);
});

app.listen(5001, function(){
  console.log('Server running on 5001 port');
});