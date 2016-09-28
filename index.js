const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const forEach = require('async-foreach').forEach;

/*const synaptic = require('synaptic');

var Layer = synaptic.Layer,
    Network = synaptic.Network,
    Architect = synaptic.Architect;
    
 */
 
var Graph = require('node-dijkstra')
 
var app = express();
var port = process.env.PORT || 8080;

app.use(bodyParser.json()); 


// POST http://heroku-root/api/v1/
// parameters sent with 
app.post('/api/v1', function(req, res) {



var input = req.body;



 
var route = new Graph(input.path)


forEach(["a", "b", "c"], function(item, index, arr) {
  console.log(item);
});

             res.send(route.path(input.start, input.end));
 
});

// start the server
app.listen(port);
console.log('Server started! At port ' + port);
