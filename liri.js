require("dotenv").config();

var axios = require("axios");

var fs = require("fs");

var Spotify = require('node-spotify-api');

var concert = new Concert;

// var OMDB = require()

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
    });
}


// var Concert = function(){

function Concert() {

    this.findConcert = function (artist) {
        var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

        axios.get(URL).then(function (response) {
            // var concertData = response.data[i];

            for (var i = 0; i < response.data.length; i++) {
                var concertData = response.data[i];
                console.log(concertData.venue.name);
                console.log(concertData.venue.city + ", " + concertData.venue.region)
                console.log(concertData.datetime);
                console.log("------------------------------------------------");
            }

            var showData = [
                concertData.name
            ].join("\n\n");

            fs.appendFile('log.txt', showData, function (err) {
                if (err) throw err;
                console.log(showData);
            })

        })

    }

};

// module.exports = Concert;