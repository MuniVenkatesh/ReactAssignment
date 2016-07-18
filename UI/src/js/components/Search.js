var React=require("react");
var SearchList=require("./List");
var Navbar=require("./Navbar");

var SearchMovies=React.createClass({
  getInitialState: function() {
  return {data:[],name:''};
  },
  render:function(){
    return (
    <div>
    <Navbar />
    <div className="container">
    <div className="col-lg-4">
    <input className="form-control" type="text" id="a" value={this.state.name} onChange={this.movieName}/>
    </div>
    <div className="col-lg-8" style={{marginBottom:20}}>
    <input className="btn btn-info" type="submit" value="Search" onClick={this.searchOMDB}/>
    </div>
      <SearchList movieList={this.state.data}/>
    </div>
    </div>
    );
  },
  movieName:function(e){
    this.setState({name: e.target.value});
  },
  searchOMDB:function(){
  var movieData=[];
  var x="http://www.omdbapi.com/?s="+document.getElementById('a').value+"&plot=full&r=json";
  $.ajax({
        url: x,
        dataType: 'json',
        success: function(data) {
          if(data.Search!=undefined){
            data.Search.map(function(d){
                movieData.push(d);
            })
          }
          this.setState({data:movieData,name:''});
        }.bind(this)
      });
  }
});

module.exports=SearchMovies;
