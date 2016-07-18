var React=require('react');

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
                  <div className="col-lg-12 well">
                   <div className="col-lg-4">
                   <img src={d.Poster} alt="No Poster Available" />
                   </div>
                   <div className="col-lg-8">
                    <h4>{d.Title}</h4>
                    Year: {d.Year}
                     <p style={{marginTop:25}}>
                     <button className="btn btn-primary" type="submit" value={d.imdbID} data-target="#add" data-toggle="modal" onClick={self.viewMovie}>View Details</button>
                     </p>
                   </div>
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
              alert(data.Title+" added succesfully")
          }.bind(this)
        });
  }
});

module.exports=SearchList;
