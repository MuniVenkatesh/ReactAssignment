var mongoose=require("mongoose");
var schema=mongoose.Schema;

var movieSchema=new schema(
  {
    Title: String,
    Year: Number,
    Rated: String,
    Released: Date,
    Runtime: String,
    Genre: String,
    Director: String,
    Writer: String,
    Actors: String,
    Plot: String,
    Language: String,
    Country: String,
    Awards: String,
    Poster: String,
    Metascore: String,
    imdbRating: String,
    imdbVotes: String,
    imdbID: String,
    Type: String,
    Response: Boolean
  }, { versionKey: false }
);

module.exports=mongoose.model("movie",movieSchema);
