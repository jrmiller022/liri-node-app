require("dotenv").config();

//variables
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var artist = process.argv.slice(3).join(" ");
var operator = process.argv[2];
//switch operator for catogories. 
switch (operator) {
    case "movie-this":
        movie();
        break;

    case "concert-this":
        varconcertVenue();
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
    if (movieName) {
        movieName = "Mr. Nobody"
    } else {
        movieName = movieName;
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
                "\nTitle: " + rd.Title,
                "\nYear: " + rd.Year,
                "\nRating: " + rd.Rating,
                "\nCountry: " + rd.Country,
                "\nLanguage: " + rd.Language,
                "\nPlot: " + rd.Plot,
                "\nActors: " + rd.Actors,
            )
        }
    );
}

function performSpotifySearch(songName) {
    var nodeArg = process.argv;

    //Creating an empty variable for songs.
    var songName = "";
    var Artist = "";
    var PreviewUrl = "";
    var Album = "";

    //Adding for loop to loop through song info.
    for (i = 2; i < nodeArg.length; i++) {
        if (i > 2 && i < nodeArg.length) {
            songName = songName + "+" + nodeArg[i];
        } else {
            songName += nodeArg[i];
        }
    }
    if (songName) {
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
            "\nArtist " + Artist[i],
            "\nSongs Name " + songName,
            "\nPreview " + PreviewUrl,
            "\nAlbum " + Album
        )
    });
}

function varconcertVenue() {

    //request axios bands API.
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    ).then(
        function (response) {
            var jsonData = response.data;
            //adding a for-loop
            for (var i = 0; i < jsonData.length; i++) {
                var venue = jsonData[i].venue;
                var date = jsonData[i].datetime;
                var formattedDate = moment(date).format("MM-DD-YYYY");
                console.log(`
                    Name:  ${venue.name}
                    Location: ${venue.city}, ${venue.country}
                    Date: ${formattedDate}
                    `);
            }
        }
    );
}

function fileSystem() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");
        var operator = dataArr[0];
        var input = dataArr[1];

        switch (operator) {
            case "spotify-this-song":
                performSpotifySearch(input);
                break;

            case "movie-this":
                movie(input);
                break;

            case "concert-this":
                varconcertVenue(input);
                break;
        }
    });
}   
