// Modules:
var express = require('express');
var bodyParser = require('body-parser');

// Using the modules:
var app = express();

// Pointing to the index page with static directory name
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Running on port: (local check)
app.listen(4000);
console.log("Server running on port 4000");

// Creating sample data
var catalog=[
    {name:"Hello", artist:"Adele", album:"25", rating:"blue"},
    {name:"Shots", artist:"Imagine Dragons", album:"Smoke + Mirros", rating:"lightgray"},
    {name:"Radioactive", artist:"Imagine Dragons", album:"Smoke + Mirros", rating:"blue"}
];

// Handling of requests:

// POST directed here. Add a new track
var addTrack = function(addTrack){
    
    // Push data from post request into the local data object
    catalog.push(addTrack);
}

// PUT directed here. Rate a track
var rateTrack = function(index){

    // Flip rating (blue indicates positive and gray indicates negative)
    if(catalog[index].rating=="blue")
        catalog[index].rating="lightgray";
    else
        catalog[index].rating="blue";
}

// DELETE directed here. Delete a track
var deleteTrack = function(index){
    
    // Remove the entry from local data object at index
    catalog.splice(index,1);
}

// HTTP calls:

// GET request
app.get('/catalogData',function(req, res){
    console.log("Received a get request!");
    res.json(catalog);
});

// POST request:
app.post('/catalogData',function(req, res){
    console.log("Received a post request!");
    addTrack(req.body);
    res.json(catalog);
});

// PUT request:
app.put('/catalogData/:id',function(req, res){
    console.log("Received a put request!");
    rateTrack(req.params.id);
    res.json(catalog);
});

// DELETE request:
app.delete('/catalogData/:id',function(req, res){
    console.log("Received a delete request!");
    deleteTrack(req.params.id);
    res.json(catalog);
});