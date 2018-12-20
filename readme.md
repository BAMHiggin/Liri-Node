# Introduction



This project joins the Siris, Cortanas, and Alexas of the internet-of-things as an entertainment search assistant -- meet LIRI! 

Liri can assist you with finding info and previews of your favorite songs, connecting you with concert details of your favorite artists, and indulge your cinephile curiosity via movie queries.

## How to Use

Search --

* song data by typing `node liri.js spotify-this-song *song*` 
* movie data by typing `node liri.js movie-this *movie*`
* concerts in your area by typing `node liri.js concert-this *artist*`

-- into the command line.


## APIs, NPM Packages Used

* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

* [Axios](https://www.npmjs.com/package/axios)
* [OMDB API](http://www.omdbapi.com) 
* [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

* [Moment](https://www.npmjs.com/package/moment)

* [DotEnv](https://www.npmjs.com/package/dotenv)
* [Require](https://www.npmjs.com/package/require)

# Liri in Action

### Using Spotify Search

`Video` <https://drive.google.com/file/d/1WHDrbVAvfUou59B-Oib6xgL4g7glLOGW/view>

* Displays song, artist, and album data with preview links
* Produces error if song doesn't exist, plays Ace of Base if no song is entered

### Bands in Town

`Video` <https://drive.google.com/file/d/195gEabB9h_3EWqmmAbEw3zjcK0i8I4YS/view>

* Displays venue name, location, and date of show
* Produces error if artist doesn't exist, informs user if artist isn't currently on tour

### OMDB

`Video` <https://drive.google.com/file/d/1ezXlO_VfgP2OAo10DYrQ7WskP5sft5Dm/view>

* Displays title, year, rating, country, language, plot and cast data
* Produces error if movie doesn't exist, shows "Mr. Nobody" if no movie is entered

### FS Read

`Video` <https://drive.google.com/file/d/1ZzRhYVxPLTleVMz5ifnjVmFeui9k4PzY/view>

* Reads `random.txt` file and searches according to the command displayed


#### Find more of my projects at <https://github.com/BAMHiggin>
