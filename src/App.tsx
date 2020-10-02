import React, {Component} from "react";
import "./App.css";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Admin from "./Components/Admin/Admin";
import Categories from "./Components/Categories/Categories";
import Editions from "./Components/Editions/Editions";
import Login from "./Components/Login/Login";
import Media from "./Components/Media/Media";
import Register from "./Components/Register/Register";
import Titles from "./Components/Titles/Titles";

interface IState {
  isLoggedIn: boolean | undefined,
  isAdmin: boolean | undefined,
  sessionToken: string
};

class App extends Component<{}, IState> {

    constructor(props: {}) {
      super(props);
      this.state = {
          isLoggedIn: undefined,
          isAdmin: undefined,
          sessionToken: ""
      };

  };

  setIsLoggedIn = (isLoggedIn: boolean) => {
    this.setState({isLoggedIn: isLoggedIn});
  };

  setIsAdmin = (isAdmin: boolean) => {
    this.setState({isAdmin: isAdmin});
  };

  setSessionToken = (sessionToken: string) => {
    this.setState({sessionToken: sessionToken});
  };

  logOut = () => {
    this.setState({isLoggedIn: undefined});
    this.setState({isAdmin: undefined});
    this.setState({sessionToken: ""});
  };

  render() {

    // console.log('App.tsx this.state.isLoggedIn', this.state.isLoggedIn);
    // console.log('App.tsx this.state.isAdmin', this.state.isAdmin);
    // console.log('App.tsx this.state.sessionToken', this.state.sessionToken);

  return (
    <React.Fragment>
      {/* {window.location.hostname} */}
      {this.state.isLoggedIn === undefined ? <p>isLoggedIn undefined</p> : null}
      {this.state.isLoggedIn === true ? <p>isLoggedIn</p> : null}
      {this.state.isLoggedIn === false ? <p>Not isLoggedIn</p> : null}
      {this.state.isAdmin === undefined ? <p>isAdmin undefined</p> : null}
      {this.state.isAdmin === true ? <p>isAdmin</p> : null}
      {this.state.isAdmin === false ? <p>Not isAdmin</p> : null}
      <p>{this.state.sessionToken}</p>
      {this.state.isLoggedIn === true ? <button onClick={this.logOut}>Log Out</button> : null}
      <Router>
      <nav>
        <Link to="/categories">Categories</Link>
        <Link to="/media">Media</Link>
        <Link to="/titles">Titles</Link>
        <Link to="/editions">Editions</Link>
        {this.state.isLoggedIn !== true ? <Link to="/login">Login</Link> : null}
        {this.state.isLoggedIn !== true ? <Link to="/register">Register</Link> : null}
        {this.state.isAdmin === true ? <Link to="/admin">Admin</Link> : null}
        {this.state.isLoggedIn === true ? <a href="#" onClick={() => this.logOut()}>Log Out</a>: null}
      </nav>
      <Switch>
          <Route exact path="/categories" component={Categories} />
          <Route exact path="/media" component={Media} />
          <Route exact path="/titles" component={Titles} />
          <Route exact path="/editions" component={Editions} />
          <Route exact path="/login" render={() => <Login isLoggedIn={this.state.isLoggedIn} isAdmin={this.state.isAdmin} sessionToken={this.state.sessionToken} setIsLoggedIn={this.setIsLoggedIn} setIsAdmin={this.setIsAdmin} setSessionToken={this.setSessionToken} />} />
          <Route exact path="/register" render={() => <Register isLoggedIn={this.state.isLoggedIn} isAdmin={this.state.isAdmin} sessionToken={this.state.sessionToken} setIsLoggedIn={this.setIsLoggedIn} setIsAdmin={this.setIsAdmin} setSessionToken={this.setSessionToken} />}  />
          <Route exact path="/admin" component={Admin} />
      </Switch>
      </Router>
    </React.Fragment>
  );
    };
};

export default App;
