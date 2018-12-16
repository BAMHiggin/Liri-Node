//variables and required npm programs

require("dotenv").config();

//changes time format for concert info
var moment = require('moment');
// moment().format("DD/MM/YYYY");

//to pull from OMDB and BIT
var axios = require("axios");

//to read random.txt file
var fs = require("fs");

var Spotify = require('node-spotify-api');

var concert = new Concert;

var movie = new Movie;

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

//for node movie/music/concert search commands
var command = process.argv[2];


if (command == 'spotify-this-song') {
    // console.log("run spotify");
    //allows searching of titles with more than one word
    var song = process.argv.splice(3, process.argv.length).join(' ');
    //if not blank, run as normal. if blank, play AOB
    if (song != '') {
        spotifyThis(song);
    } else {
        // if no song is entered
        spotifyThis("The Sign Ace of Base");
    }

} else if (command == 'concert-this') {
    // console.log("run BIT");
    var artist = process.argv.splice(3, process.argv.length).join(' ');
    if (artist) {
        concert.findConcert(artist);
    } else if (" ") {
        console.log("You forgot to search an artist!");
    }

} else if (command == 'movie-this') {
    console.log("run movies");
    var movieTitle = process.argv.splice(3, process.argv.length).join(' ');
    if (movieTitle) {
        movie.findMovie(movieTitle);
    } else if (" ") {
        movie.findMovie("Mr. Nobody");
    }
} else if (command == 'do-what-it-says') {
    // console.log("DO IT");
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        // console.log(data);
        //splits text into an array so specific points can be called
        var dataArray = data.split(",");

        if (dataArray[0] == 'spotify-this-song') {

            spotifyThis(dataArray[1]);

        } else if (dataArray[0] == 'concert-this') {
            concert.findConcert(dataArray[1]);

        } else if (dataArray[0] == 'movie-this') {
            movie.findMovie(dataArray[1]);
        }
    })
}


function spotifyThis(song) {
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            // return console.log('Error occurred: ' + err);
            //displays if song is not recognized
            return console.log('Lookup failed, try another song!');
        }
        console.log('Artist: ' + data.tracks.items[0].artists[0].name);
        console.log('Song: ' + data.tracks.items[0].name);
        console.log('Preview: ' + data.tracks.items[0].preview_url);
        console.log('Album: ' + data.tracks.items[0].album.name);

        // var showData = [ //look into this 
        //     song.data
        // ].join("\n\n");

        // fs.appendFile('log.txt', showData, function (err) {
        //     if (err) throw err;
        //     console.log(showData);
        // })
    });
}


function Concert() {

    this.findConcert = function (artist) {
        var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

        axios.get(URL).then(function (response) {

            //displays if artist is valid, but not touring
            if (response.data[0] == null) {
                console.log("Not on tour!");
            }
            //catches button smashing and non-artist shenanigans
            else if (response.data[0].venue == null){
                console.log("This artist doesn't exist!");
            }
            else {

                for (var i = 0; i < response.data.length; i++) {
                    var concertData = response.data[i];
                    console.log("Artist(s):" + concertData.venue.name);
                    console.log("Location: " + concertData.venue.city + ", " + concertData.venue.region)
                    console.log("Date: " + moment(concertData.datetime).format("MM/DD/YYYY"));
                    console.log("------------------------------------------------");

                    var showData = [
                        concertData.name
                    ].join("\n\n");

                    fs.appendFile('log.txt', showData, function (err) {
                        if (err) throw err;
                        // console.log(showData);
                    })
                }
            }

        })

    }

};

function Movie() {

    this.findMovie = function (movieTitle) {
        var URL = "http://www.omdbapi.com/?t=$" + movieTitle + "&y=&plot=short&apikey=trilogy";

        axios.get(URL).then(function (response) {
            var movieData = response.data;

            //catches button smashing and non-movie shenanigans
            if (movieData.Title == null) {
                return console.log("Lookup failed, try another movie!");
            }

            // console.log(movieData);
            console.log("Title: " + movieData.Title);
            console.log("Release Year: " + movieData.Year);
            console.log("Ratings: " + movieData.Ratings[0].Value + " - " + movieData.Ratings[0].Source + ", " + movieData.Ratings[1].Value + " - " + movieData.Ratings[1].Source);
            console.log("Country: " + movieData.Country);
            console.log("Languages: " + movieData.Language);
            console.log("Plot: " + movieData.Plot);
            console.log("Cast: " + movieData.Actors);

            // var showData = [
            //     movieData[i]
            // ].join("\n\n");

            // fs.appendFile('log.txt', showData, function (err) {
            //     if (err) throw err;
            //     console.log(showData);


            // })
        })

    }

};

