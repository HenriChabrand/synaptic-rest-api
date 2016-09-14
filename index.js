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
  
var myLSTM = new Architect.LSTM(3,6,1);

// train the network
var learningRate = .01;
for (var i = 0; i < 20000; i++)
{
    
    myLSTM.activate([i/20000,(i+1)/20000,(i+2)/20000]
    myLSTM.propagate(learningRate, [(i+3)/20000]);

}
  
  res.send(myLSTM.activate([1/20000,2/20000,3/20000]));
});

// start the server
app.listen(port);
console.log('Server started! At port ' + port);
