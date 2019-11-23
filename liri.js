require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require("fs");

var moment = require("moment");
var axios = require("axios");
var comand = process.argv[2];
var secondComand = process.argv[3];

let search = process.argv.slice(3).join(" ");
console.log(typeof (search))
switch (comand) {
    case "concert-this":
        concertThis(search);
        break;

    case "spotify-this-song":
        spotifyThisSong(search);
        break;

    case "movie-this":
        movieGet(secondComand);
        break;

    case "do-what-it-says":
        doWhat();
        break;

}

function movieGet(search) {
    if (!search) {
        console.log("-----------------------");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
    } else {
        let movieName = search
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

}

//band in Town function
function concertThis(search) {
    let artist = search;
    console.log(artist)
    moment().format();
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    // var queryUrl = "https://rest.bandsintown.com/artists/celine+dion/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
        function (response) {
            if (response.data.length) {
                console.log("Name of The Vanue: " + response.data[0].venue.name);
                console.log("Venue location: " + response.data[0].venue.city);
                console.log("Venue Date: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
            } else {
                console.log(`It would appear as though ${search} is not on tour.`)
            }
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

// spotify function
// var Spotify = require('node-spotify-api');

// var spotify = new Spotify({
//   id: <your spotify client id>,
//   secret: <your spotify client secret>
// });


function spotifyThisSong(song) {
    // Check if the command is there. If it is not, use the sign
    if (!song) {
        song = "The Sign"
    }

    spotify.search({ type: 'track', query: song, limit: 1 }, function (err, data) {

        for (var i = 0; i < data.tracks.items.length; i++) {
            var songData = data.tracks.items[i];
            console.log(i);
            console.log("artist(s): " + songData.artists[0].name);
            console.log("song name: " + songData.name);
            console.log("preview song: " + songData.preview_url);
            console.log("album: " + songData.album.name);

        }



        if (err) {
            return console.log('Error occurred: ' + err);
        }

    });

}

    // do-what-it-says function
// function doWhat() {
//     fs.readFile("random.txt", utf8, function (err, data) {
//         if (err)
//             console.log(err);

//     }
// }


