const express = require('express');
const bodyParser = require('body-parser');


var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.get('/message', (req, res) => {
  res.send({message: 'hey'});
});

app.listen(3000);
