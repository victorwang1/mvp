const express = require('express');
const bodyParser = require('body-parser');
const rp = require('request-promise');
const db = require('../database/index.js');
const helper = require('./helper.js');


var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));


app.post('/', (req, res) => {
  db.saveUser(req.body);
  res.send();
});

app.get('/user', (req, res) => {
  db.findUser(req.body);
  res.send({message: 'hey'});
});

app.get('/restaurants', (req, res) => {
  var options = {
    uri: 'https://api.yelp.com/v3/businesses/search',
    qs: {
      latitude: 37.78,
      longitude: -122.41,
      radius: 5000,
      limit: 50,
      sort_by: 'rating'
    },
    headers: {
      'User-Agent': 'Request-Promise',
      'Authorization': 'Bearer Xx-Zwfxg4bDbPJ0hHDXrKSPXqOi43j5FOofeC-8EdfqpMMtUzNvoXe4CmIuNyuCRQ8AGowbs-vvokVCbvbr-SBBR6Tm36-btQW55Hc2SXM8Z00IT8mX4USizmrfJWXYx'
    },
    json: true
  }

  rp(options).then(data => res.json(data));
});

app.listen(3000);
