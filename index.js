const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const synaptic = require('synaptic');

var Layer = synaptic.Layer,
    Network = synaptic.Network,
    Architect = synaptic.Architect;
    
    
var app = express();
var port = process.env.PORT || 8080;

app.use(bodyParser.json()); 


// POST http://heroku-root/api/v1/
// parameters sent with 
app.post('/api/v1', function(req, res) {
	
	var json_step = req.body
  
var myNet = new Architect.Perceptron(10, 7, 1);

var trainingSet = [
  {
    input: [0,0,1,0.12,0,0,0,0,1,1],
    output: [1]
  },
  {
    input:  [0,1,0,0.045,0,0,1,1,0,0],
    output: [0]
  },
  {
    input:  [1,0,0,0.42,1,1,0,0,0,0],
    output: [1]
  }
]

var trainingOptions = {
  rate: .1,
  iterations: 20000,
  error: .005
}

myNet.trainer.train(trainingSet, trainingOptions);
  
  res.send(myNet.activate([0,1,0,0.045,0,0,1,1,0,0]));
});

// start the server
app.listen(port);
console.log('Server started! At port ' + port);
