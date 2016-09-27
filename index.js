const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');


/*const synaptic = require('synaptic');

var Layer = synaptic.Layer,
    Network = synaptic.Network,
    Architect = synaptic.Architect;
    
 */
 
var Graph = require('node-all-paths')
 
var app = express();
var port = process.env.PORT || 8080;

app.use(bodyParser.json()); 


// POST http://heroku-root/api/v1/
// parameters sent with 
app.post('/api/v1', function(req, res) {



var input = req.body;


 
var graph = new Graph()
 
graph.addNode('A', { B:1 })
graph.addNode('B', { A:1, C:2, D: 4 })
graph.addNode('C', { B:2, D:1 })
graph.addNode('D', { C:1, B:4 })
 
graph.path('A', 'D') // => [ 'A', 'B', 'C', 'D' ] 


             res.send("hello world");
 
});

// start the server
app.listen(port);
console.log('Server started! At port ' + port);
