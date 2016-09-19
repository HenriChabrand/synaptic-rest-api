const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');


/*const synaptic = require('synaptic');

var Layer = synaptic.Layer,
    Network = synaptic.Network,
    Architect = synaptic.Architect;
    
 */
 
 
var algorithmia = require("algorithmia");


 
var app = express();
var port = process.env.PORT || 8080;

app.use(bodyParser.json()); 


// POST http://heroku-root/api/v1/
// parameters sent with 
app.post('/api/v1', function(req, res) {



var input = req.body;

/*
var json_step = req.body;
  
var myLSTM = new Architect.LSTM(3,6,1);

// train the network
var learningRate = .00001;
for (var i = 0; i < 200000; i++)
{
    
    myLSTM.activate([i/20000,(i+1)/20000,(i+2)/20000]);
    myLSTM.propagate(learningRate, [(i+3)/20000]);

} 

res.send(myLSTM.activate([1234/20000,1235/20000,1236/20000]));
  */
  

algorithmia.client("sim9VjrH8Tq+hYi9cPvHEr6ACt71")
           .algo("algo://TimeSeries/Forecast/0.2.0")
           .pipe(input)
           .then(function(response) {
             res.send(response.get());
           });
 
});

// start the server
app.listen(port);
console.log('Server started! At port ' + port);
