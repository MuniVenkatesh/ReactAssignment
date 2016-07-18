var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

/*var Master = require('./pages/Master/Master');
var Home = require('./pages/Home/Home');
var Login = require('./pages/Login/Login');

var  LoginRequired  = require('./utils/RouteHelpers');*/

var OwnList = require('./components/Initial');
var HomePage = require('./components/Home');
var SearchAll = require('./components/Search');
var Master = require('./components/Master');
var Navbar = require('./components/Navbar');

module.exports = (
<Route>
<Route handler={Master}>
  <DefaultRoute handler={Navbar} name="Home"/>
</Route>
<Route handler={HomePage} name="HomePage" path="/home"/>
<Route handler={OwnList} name="ViewMovieBox" path="/movies"/>
<Route handler={SearchAll} name="MovieBox" path="/add"/>
</Route>
);
