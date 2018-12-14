require("dotenv").config();

var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];

console.log(command);

if (command == 'spotify-this-song') {
    console.log("run spotify");
    var song = process.argv.splice(3, process.argv.length).join(' ');
    spotifyThis(song);

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

// to do: set The Sign defaultif no song is provided