const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const synaptic = require('synaptic');

var Layer = synaptic.Layer,
    Network = synaptic.Network;
    
    
var app = express();
var port = process.env.PORT || 8080;

app.use(bodyParser.json()); 


// POST http://heroku-root/api/v1/
// parameters sent with 
app.post('/api/v1', function(req, res) {
	
	var json_step = req.body
  
  // create the network
  var inputLayer = new Layer(2);
  var hiddenLayer = new Layer(3);
  var outputLayer = new Layer(1);
  
  inputLayer.project(hiddenLayer);
  hiddenLayer.project(outputLayer);
  
  var myNetwork = new Network({
      input: inputLayer,
      hidden: [hiddenLayer],
      output: outputLayer
  });
  
  // train the network
  var learningRate = .3;
  for (var i = 0; i < 20000; i++)
  {
      // 0,0 => 0
      myNetwork.activate([0,0]);
      myNetwork.propagate(learningRate, [0]);
  
      // 0,1 => 1
      myNetwork.activate([0,1]);
      myNetwork.propagate(learningRate, [1]);
  
      // 1,0 => 1
      myNetwork.activate([1,0]);
      myNetwork.propagate(learningRate, [1]);
  
      // 1,1 => 0
      myNetwork.activate([1,1]);
      myNetwork.propagate(learningRate, [0]);
  }
  
  
  // test the network
  
  res.send(myNetwork.activate([0,0]));
  console.log(myNetwork.activate([0,0])); // [0.015020775950893527]
  console.log(myNetwork.activate([0,1])); // [0.9815816381088985]
  console.log(myNetwork.activate([1,0])); // [0.9871822457132193]
  console.log(myNetwork.activate([1,1])); // [0.012950087641929467]
                        
});

// start the server
app.listen(port);
console.log('Server started! At port ' + port);
