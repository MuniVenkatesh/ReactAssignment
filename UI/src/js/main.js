var React=require("react");
var routes=require("./routes.js");
var Router = require('react-router');
var reactDOM=require('react-dom');

Router.run(routes, Router.HistoryLocation, function(Root){
  React.render(<Root/>, document.getElementById('app'));
});
