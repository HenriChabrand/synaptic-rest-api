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
  var inputLayer = new Layer(19);
  var hiddenLayerA = new Layer(10);
  var hiddenLayerB = new Layer(3);
  var hiddenLayerC = new Layer(10);
  var outputLayer = new Layer(19);
  
  inputLayer.project(hiddenLayerA);
  hiddenLayerA.project(hiddenLayerB);
  hiddenLayerB.project(hiddenLayerC);
  hiddenLayerC.project(outputLayer);
  
  var myNetwork = new Network({
      input: inputLayer,
      hidden: [hiddenLayerA, hiddenLayerB, hiddenLayerC],
      output: outputLayer
  });
  
  // train the network
  var learningRate = .3;
  for (var i = 0; i < 500000; i++)
  {
	var allArray = [];
	for(j=0; j<2; j++){
	    var myArray = (i+j).toString(2).split('');
	    for(var k=0; k<myArray.length; k++) { myArray[k] = parseInt(myArray[k], 10); } 
	    if(myArray.length < 19){
	      var missingZero = 19-myArray.length;
	      for(k=0; k< missingZero; k++){
	      myArray.unshift(0);
	      }
	    }
	    allArray.push(myArray);
	}
	
      myNetwork.activate(allArray[0]);
      myNetwork.propagate(learningRate, allArray[1]);
  }
  
  
  // test the network
  
  res.send(myNetwork.activate([1,1,0,0,0,1,0,1,1,1,0,0,0,0,0,1,0,0,0]));
});

// start the server
app.listen(port);
console.log('Server started! At port ' + port);
