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
  var inputLayer = new Layer(3);
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
  for (var i = 0; i < 50000; i++)
  {
      // 0,0 => 0
      myNetwork.activate([i/100000,(i+1)/100000,(i+2)/100000]);
      myNetwork.propagate(learningRate, [(i+3)/100000]);
  }
  
  
  // test the network
  
  //res.send(myNetwork.activate([100,101,102]));
   res.send((14).toString(2));                    
});

// start the server
app.listen(port);
console.log('Server started! At port ' + port);
