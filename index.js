const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');


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
 
 
route.path(input.start, input.end) // => [ 'A', 'B', 'C', 'D' ] 


             res.send(route.path('A', 'D'));
 
});

// start the server
app.listen(port);
console.log('Server started! At port ' + port);
