// require("dotenv").config();
// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
// var fs = require("fs");
var moment = require("moment");

var axios = require("axios");
var comand = process.argv[2];
var secondComand = process.argv[3];

switch (comand) {
    case "concert-this":
        concertThis();
        break;

    case "spotify-this-song":
        spotifyThis();
        break;

    case "movie-this":
        movieGet();
        break;

    case "do-what-it-says":
        doWhat();
        break;

}

function movieGet() {
    var movieName = secondComand;
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    console.log(queryUrl);
    axios.get(queryUrl).then(
        function (response) {
            console.log("===================Movie Info====================")
            console.log("Title of the movie: " + movieName);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("=====================End Movie Info===============")

        })
        .catch(function (error) {
            if (movieName === "Mr.Nobody") {
                console.log("-----------------------");
                console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
                console.log("It's on Netflix!");
            }
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);

        });

}

//band in Town function
function concertThis() {
    let artist = secondComand;

    moment().format();


    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    // var queryUrl = "https://rest.bandsintown.com/artists/celine+dion/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
        function (response) {
            console.log("Name of The Vanue: " + response.data[0].venue.name);
            console.log("Venue location: " + response.data[0].venue.city);
            console.log("Venue Date: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));

        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });

}

// do-what-it-says function
function doWhat(){
    fs.readFile("random.txt", utf8, function(err,data){
        if(err)
        console.log(err);
        
    }
}


