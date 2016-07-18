//var React = require('react');
var Router=require("react-router");
var Route=Router.Route;
var Link=Router.Link;
var routes=(
  <Route>
  <Route handler={SearchMovies} path="/search"/>
  <Route handler={SearchMovies} path="/home"/>
  </Route>
)
var NavBar=React.createClass({
  render: function() {
      return (
          <div className="navbar navbar-fixed-top">
              <div className="container">
                  <button className="navbar-toggle" data-target=".navbar-responsive-collapse" data-toggle="collapse" type="button">
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                  </button>
                  <div className="nav-collapse collapse navbar-responsive-collapse">
                      <ul className="nav navbar-nav">

                          <li className="active"><Link to="/home">Home</Link></li>
                          <li className=""><Link to="/search">Search Movies</Link></li>

                          </ul>
                  </div>
              </div>
          </div>
      )
  }
})
var SearchMovies=React.createClass({
  getInitialState: function() {
    var initial=[];
    $.ajax({
          url: "/movies",
          dataType: 'json',
          async:false,
          success: function(data){
              initial=data;
          }.bind(this)
        });
    return {data:initial,name:this.props.name};
  },
  render:function(){
    return (
    <div className="container">
    <NavBar/>
    <div className="col-lg-4">
    <input className="form-control" type="text" ref="a" value={this.props.name} onChange={this.movieName}/>
    </div>
    <div className="col-lg-8" style={{marginBottom:20}}>
    <input className="btn btn-info" type="submit" value="Search" onClick={this.searchOMDB}/>
    </div>
      <SearchList movieList={this.state.data}/>
    </div>
    );
  },
  movieName:function(e){
  this.props.name=e.target.value;
  },
  searchOMDB:function(){
  var movieData=[];
  var x="http://www.omdbapi.com/?s="+ReactDOM.findDOMNode(this.refs.a).value+"&plot=full&r=json";
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

var wellStyle={
  color:"blue"
}
var SearchList=React.createClass({
  getInitialState:function(){
    return ({movie:[]});
  },
  render:function(){
      var self=this;
      var view=this.state.movie;
      return(
        <div className="row">
            {this.props.movieList.map(function(d){
              return (
                   <div className="col-lg-4">
                    <h4>{d.Title}</h4>
                    Year: {d.Year}
                     <img src={d.Poster} alt="No Poster Available" />
                     <p style={{marginTop:25}}>
                     <button className="btn btn-primary" type="submit" value={d.imdbID} data-target="#add" data-toggle="modal" onClick={self.viewMovie}>View Details</button>
                     </p>
                   </div>
                );
              })}
              <div className="col-lg-12 modal" id="add">
                <div className="modal-dialog" style={{width:"90%"}}>
                  <div className="modal-content">
                    <div className="modal-header">
                      <button className="close" data-dismiss="modal">&times;</button>
                      <h4>Add Movie</h4>
                    </div>
                    <div className="modal-body">
                     <div className="row well" style={wellStyle}>
                       <div className="col-lg-4">
                         <img src={view.Poster} alt="No Poster Available"/>
                       </div>
                       <div className="col-lg-8">
                         <h4>{view.Title}</h4>
                         Year: {view.Year}<br/><br/>
                         Actors: {view.Actors}<br/><br/>
                         Director: {view.Director}<br/><br/>
                         {view.Plot}<br/><br/>
                         <span className="glyphicon glyphicon-calendar"></span>{view.Released} |
                         Ratings:<input type='hidden' id="rating" className="rating rating-loading" data-min="0" data-max="5"/> |
                         Awards: {view.Awards}
                         <p style={{marginTop:25}}>
                         <button className="btn btn-primary" data-dismiss="modal" type="submit" onClick={self.addToDB}>Add To Database</button>
                         </p>
                       </div>
                     </div>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      );
  },
  viewMovie:function(e){
    $.ajax({
          url: "http://www.omdbapi.com/?i="+e.target.value+"&plot=full&r=json",
          dataType: 'json',
          success: function(data){
                  this.setState({movie:data})
          }.bind(this)
        });
  },
  addToDB:function(){
    $.ajax({
          url: "/movies/add",
          dataType: 'json',
          data:this.state.movie,
          type:"POST",
          success: function(data){
              initial.push(data);
          }.bind(this)
        });
  }
});
ReactDOM.render(<SearchMovies name=''/>,document.getElementById("muni"));
