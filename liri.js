require("dotenv").config();

//variables
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var fs = require("fs");

var axios = require("axios");

var moment = require("moment");

var operator = process.argv[2];

console.log(operator);

//switch operator for catogories. 
switch (operator) {
    case "movie-this":
        movie();
        break;

    case "concert-this":
        concert();
        break;

    case "spotify-this-song":
        performSpotifySearch();
        break;

    case "do-what-it-say":
        filesystem();
        break;

}

function movie(movieName) {
    var nodeArg = process.argv;

    //Created an empty varible to hold music info.
    var movieName = "";

    //adding a for-loop
    for (var i = 2; i < nodeArg.length; i++) {

        if (i > 2 && i < nodeArg.length) {
            movieName = movieName + "+" + nodeArg[i];
        } else {
            movieName += nodeArg[i];
        }
    }
    if (!movieName) {
        movieName = "Mr. Nobody"
    }
    console.log(movieName);

    //request axios to OMDB API of movie.
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    console.log(queryURL);

    axios.get(queryURL).then(
        function (response) {
            console.log(response.data.Year);
            var rd = response.data
            console.log(
                "Title: " + rd.Title,
                "Year: " + rd.Year,
                "Rating: " + rd.Rating,
                "Country: " + rd.Country,
                "Language: " + rd.Language,
                "Plot: " + rd.Plot,
                "Actors: " + rd.Actors,
            )
        }
    );
}

function performSpotifySearch() {
    var nodeArg = process.argv;

    //Creating an empty variable for songs.
    var songName = "";

    //Adding for loop to loop through song info.
    for (i = 2; i < nodeArg.length; i++) {
        if (i > 2 && i < nodeArg.length) {
            songName = songName + "+" + nodeArg[i];
        } else {
            songName += nodeArg[i];
        }
    }
    if (!songName) {
        songName = "The Sign by Ace of Base"
    }
    console.log(songName);

    console.log(keys);
    var spotifyAPI = new Spotify(keys.spotify);

    spotifyAPI.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(
            "Artist" + Artist[i],
            "Songs Name" + songName,
            "Preview" + PreviewUrl,
            "Album" + Album
        )
    });
}
