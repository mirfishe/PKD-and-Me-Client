import React from "react";
import "./App.css";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Admin from "./Components/Admin/Admin";
import Categories from "./Components/Categories/Categories";
import Editions from "./Components/Editions/Editions";
import Login from "./Components/Login/Login";
import Media from "./Components/Media/Media";
import Titles from "./Components/Titles/Titles";

function App() {
  return (
    <React.Fragment>
      <Router>
      <nav>
        <Link to="/categories">Categories</Link>
        <Link to="/media">Media</Link>
        <Link to="/titles">Titles</Link>
        <Link to="/editions">Editions</Link>
        <Link to="/login">Login/Register</Link>
        <Link to="/admin">Admin</Link>
      </nav>
      <Switch>
          <Route exact path="/categories" component={Categories} />
          <Route exact path="/media" component={Media} />
          <Route exact path="/titles" component={Titles} />
          <Route exact path="/editions" component={Editions} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/admin" component={Admin} />
      </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
