var React=require("react");
var Navbar=require("./Navbar");

var InitialMovies=React.createClass({
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
    return({data:initial});
  },
  render:function(){
    var self=this;
    return(
      <div>
        <Navbar />
        <div className="row">
            {this.state.data.map(function(d){
              return(
                <div className="col-lg-12 well">
                <div className="col-lg-4">
                <img src={d.Poster} alt="No Poster Available" />
                </div>
                <div className="col-lg-8">
                 <h4>{d.Title}</h4>
                 Year: {d.Year}
                  <p style={{marginTop:25}}>
                  <button className="btn btn-primary" type="submit" value={d.imdbID} onClick={self.removeMovie}>Delete</button>
                  </p>
                </div>
                </div>
              )
            })}
        </div>
      </div>
    );
  },
  removeMovie:function(e){
    var id=e.target.value;
    $.ajax({
          url: "/movies/delbyid-"+id,
          type:"DELETE",
          success: function(){
            var x=this.state.data.filter(function(d){
              return d.imdbID!=id;
            });
            this.setState({data:x});
          }.bind(this),
          error:function(){
            alert("fail");
          }
        });
  }
});

module.exports=InitialMovies;
