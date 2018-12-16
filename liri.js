require("dotenv").config();

var moment = require('moment');
// moment().format("DD/MM/YYYY");

var axios = require("axios");

var fs = require("fs");

var Spotify = require('node-spotify-api');

var concert = new Concert;

var movie = new Movie;

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];



console.log(command);

if (command == 'spotify-this-song') {
    console.log("run spotify");
    var song = process.argv.splice(3, process.argv.length).join(' ');
    if (song != '') {
        spotifyThis(song);
    } else {
        spotifyThis("The Sign Ace of Base");
    }

} else if (command == 'concert-this') {
    console.log("run BIT");
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
}



function spotifyThis(song) {
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log('Artist: ' + data.tracks.items[0].artists[0].name);
        console.log('Song: ' + data.tracks.items[0].name);
        console.log('Preview: ' + data.tracks.items[0].preview_url);
        console.log('Album: ' + data.tracks.items[0].album.name);

        var showData = [ //look into this 
            song.data
        ].join("\n\n");

        fs.appendFile('log.txt', showData, function (err) {
            if (err) throw err;
            console.log(showData);
        })
    });
}




function Concert() {

    this.findConcert = function (artist) {
        var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

        axios.get(URL).then(function (response) {
            // var concertData = response.data[i];


            if (response.data[0] == null) {
                console.log("Not on tour!");
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

            // console.log(movieData);
            console.log("Title: " + movieData.Title);
            console.log("Release Year: " + movieData.Year);
            console.log("Ratings: " + movieData.Ratings[0].Value + " - " + movieData.Ratings[0].Source + ", " + movieData.Ratings[1].Value + " - " + movieData.Ratings[1].Source);
            console.log("Country: " + movieData.Country);
            console.log("Languages: " + movieData.Language);
            console.log("Plot: " + movieData.Plot);
            console.log("Cast: " + movieData.Actors);

            var showData = [
                movieData.Name
            ].join("\n\n");

            fs.appendFile('log.txt', showData, function (err) {
                if (err) throw err;
                console.log(showData);


                // if (response.data[0] == null) {
                //     console.log("Not on tour!");
                // }
                // else {

                //     for (var i = 0; i < response.data.length; i++) {
                //         var concertData = response.data[i];
                //         console.log(concertData.venue.name);
                //         console.log(concertData.venue.city + ", " + concertData.venue.region)
                //         console.log(concertData.datetime);
                //         console.log("------------------------------------------------");


                //         var showData = [
                //             concertData.name
                //         ].join("\n\n");

                //         fs.appendFile('log.txt', showData, function (err) {
                //             if (err) throw err;
                //             console.log(showData);
                //         })
                //     }
                // }

            })
        })

    }

};