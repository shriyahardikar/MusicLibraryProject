
// Creating a module named app and adding a controller 'myCtrl' to it
var app = angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http){

    // Function to load all data coming from server 
    var load = function(){
        
        // Setting the visibility of add track panel to false
        $scope.addPanelShow = false;        
        
        // GET request from server
        $http.get('/catalogData').then(function(response){
            $scope.catalog = response.data;
        },
        function(response){
            console.log("Rejected");
        });
    };    
    load();

    // Cancel adding track
    $scope.cancelAdd = function(){
        
        // Resetting the add track panel and setting visibility false
        $scope.addedName = "";
        $scope.addedArtist = "";
        $scope.addedAlbum = "";
        $scope.addPanelShow = false;
    }

    // Save the added track track
    $scope.saveTrack = function(){
        
        // Create a request object with entered detais
        var addTrack = {name:$scope.addedName, artist:$scope.addedArtist, album:$scope.addedAlbum, rating:"lightgray"};

        //  Make a post request to server
        console.log("Making a post req with "+addTrack.name+addTrack.artist+addTrack.album+addTrack.rating);
        $http.post('/catalogData',addTrack).then(function(response){
            console.log("Successfully added a track");
            
            // Load all the data after making a post request
            load();
        },
        function(response){
            console.log("Rejected");
        });

        // Call the function that resets the add panel
        $scope.cancelAdd();
    }

    // Change rating of the track
    $scope.changeRating = function(index){
        
        // Put request to the server (sending the index of the track to be rated)
        console.log("Making a put req with index "+index);
        $http.put('/catalogData/'+index).then(function(response){
            console.log("Successfully rated a track");
            load();
        },
        function(response){
            console.log("Rejected");
        });
    };

    // Delete track
    $scope.deleteTrack = function(index){
        
        // Make a delete request to the server (sending the index of the track to be deleted)
        console.log("Making a delete req with index "+index);
        $http.delete('/catalogData/'+index).then(function(response){
            console.log("Successfully deleted a track");
            load();
        },
        function(response){
            console.log("Rejected");
        });   
    }
});