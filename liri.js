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


switch (comand) {
    case "concert-this":
        concertThis(search);
        break;

    case "spotify-this-song":
        spotifyThisSong(search);
        break;

    case "movie-this":
        movieGet(search);
        break;

    case "do-what-it-says":
        doWhat();
        break;

}
// movie function
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
                console.log("=====================End Movie Info===============");


                fs.appendFile("log.txt", "Title of the movie: " + movieName + "," +
                    "Release Year: " + response.data.Year + " , " +
                    "IMDB Rating: " + response.data.imdbRating + " , " +
                    "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + " , " +
                    "Country: " + response.data.Country + " , " +
                    "Language: " + response.data.Language + " , " +
                    "Plot: " + response.data.Plot + " , " +
                    "Actors: " + response.data.Actors +
                    "\n------------------\n", function (error) {
                        if (error) {
                            console.log(error);
                        };
                    });

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

// band in town function
function concertThis(search) {
    let artist = search;
    console.log(artist)
    moment().format();

    // Call Api address to get information by Artist name
    //the artist name is define as second comand
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(
        function (response) {
            if (response.data.length) {
                console.log("Name of The Vanue: " + response.data[0].venue.name);
                console.log("Venue location: " + response.data[0].venue.city);
                console.log("Venue Date: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));

                fs.appendFileSync("log.txt", "Name of The Artist: " + artist + " , " + "Name of The Vanue: " + response.data[0].venue.name + " , " +
                    "Venue location: " + response.data[0].venue.city + " , " +
                    "Venue Date: " + moment(response.data[0].datetime).format("MM/DD/YYYY") + "\n------------------\n", function (error) {
                        if (error) {
                            console.log(error);
                        };
                    });
            }
            else {
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


//this function for spotify 
function spotifyThisSong(song) {
    // Check if the command is there. If it is not, use the sign
    //the sign song has two name The sign and the happy nation/if we chose the sign it will
    //give other singers not Ace of Base/that`s why I chose Happy nation
    if (!song) {
        song = "happy nation"
    }

    spotify.search({ type: 'track', query: song, limit: 1 }, function (err, data) {

        for (var i = 0; i < data.tracks.items.length; i++) {
            var songData = data.tracks.items[i];
            console.log("===================Song Info====================")
            console.log(i);
            console.log("artist(s): " + songData.artists[0].name);
            console.log("song name: " + songData.name);
            console.log("preview song: " + songData.preview_url);
            console.log("album: " + songData.album.name);
            console.log("===================end song Info====================")

            fs.appendFileSync("log.txt", "Name of The Song: " + song + " , " + "artist(s): " + songData.artists[0].name + " , " +
                "song name: " + songData.name + " , " +
                "preview song: " + songData.preview_url + " , " + "album: " + songData.album.name + "\n------------------\n", function (error) {
                    if (error) {
                        console.log(error);
                    };
                });

        }
        if (err) {
            return console.log('Error occurred: ' + err);
        }

    });

}

// do-what-it-says function
function doWhat() {
    //Read random.txt file
    // running the readFile module that's inside of fs
    // stores the read information into the variable "data"
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (!error) {

            var txt = data.split(',');
            console.log(txt)
            spotifyThisSong(txt[1]);

            movieGet(txt[3]);

            concertThis([5]);


        }
    });
}


