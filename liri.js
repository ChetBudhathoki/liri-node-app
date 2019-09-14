
// Define dependent variables so they're global
require("dotenv").config();
// NPM Packages & API keys
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");
// for read & write
var fs = require("fs");
var query = process.argv[3];

// Check Keys
// console.log(keys);
var option = process.argv[2];
// console.log(option);


// Initialize Spotify client
console.log('keys.spotify', keys.spotify);
var spotify = new Spotify(keys.spotify);
switch (option) {
    case "movie-this":
        movieThis(query);
        break;
    case "spotify-this-song":
        spotifyCall(query);
        break;
    case "concert-this":
        concertThis(query);
        break;
    default:
        // 1- read file
        fs.readFile("random.txt", "utf8", function (error, data) {
            // 2-retrieve content & parse string
            var data = data.split(",");
            var thatWay = data[1];
            if (error) {
                return console.log(error);
            }
            // 3-call function 
            spotifyCall(thatWay);
        })

}

// FUNCTIONS
// SPOTIFY-THIS-SONG
function spotifyCall(songName) {
    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        for(var i = 0; i < data.tracks.items.length; i++) {
            console.log("\n_Track Info_" + "\nArtist: " + data.tracks.items[i].artists[0].name + "\nSong: " + data.tracks.items[i].name + "\nLink: " + data.tracks.items[i].external_urls.spotify + "\nAlbum: " + data.tracks.items[i].album.name + "\n" + "\nGreat song! Search another :)")
        }
        
    });
}

// MOVIE-THIS
// Then run a request with axios to the OMDB API with the movie specified
function movieThis(movieName) {
    if (!movieName) {
        movieName = "Terminator";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    // // This line is just to help us debug against the actual URL.
    // Creating a request with axios to the queryUrl
    axios.get(queryUrl).then(
        function (response) {
            if (!movieName) {
                movieName = "Terminator";
            }// console.log(response.data);
            // Data of Movie
            console.log("stuffs we got back", response.data);
            console.log("\n_Movie Info_" + "\nTitle: " + response.data.Title + "\nRelease Year: " + response.data.Year + "\nRating: " + response.data.Rated + "\nRelease Country: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + "\n" + "\n Love this one!");


        }
    );
}


// CONCERT-THIS
// Then run a request with axios to the BiT API with the artist specified
function concertThis(artist) {
    var bandsQueryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    // // This line is just to help us debug against the actual URL.
    // Creating a request with axios to the queryUrl
    axios.get(bandsQueryUrl).then(
        function (response) {
            console.log("_Upcoming Events_");
            console.log(response.data);
            for (var i = 0; i < response.data.length; i++){
                console.log("Artist: " + artist + "\nVenue: " + response.data[i].venue.name + "\nLocation: " + response.data[i].venue.country + "\nDate: " + response.data[1].datetime + "\nRock on dude!");
            }
            
        });
}