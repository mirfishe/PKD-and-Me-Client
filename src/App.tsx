import React, {Component} from "react";
import "./App.css";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import {Alert} from '@material-ui/lab/';
import {AppBar, Toolbar, Typography, IconButton} from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVert from '@material-ui/icons/MoreVert';

import Admin from "./Components/Admin/Admin";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";

interface IState {
  isLoggedIn: boolean | undefined,
  isAdmin: boolean | undefined,
  sessionToken: string,
  titleID: number | undefined
};

class App extends Component<{}, IState> {

    constructor(props: {}) {
      super(props);
      this.state = {
          isLoggedIn: undefined,
          isAdmin: undefined,
          sessionToken: "",
          titleID: undefined
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

  setTitleID = (titleID: number | undefined) => {
    this.setState({titleID: titleID});
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
    // console.log('App.tsx this.state.titleID', this.state.titleID);

  return (
    <div>
      {/* {window.location.hostname} */}
      {/* {this.state.isLoggedIn === undefined ? <Alert severity="error">isLoggedIn undefined</Alert> : null}
      {this.state.isLoggedIn === true ? <Alert severity="error">isLoggedIn</Alert> : null}
      {this.state.isLoggedIn === false ? <Alert severity="error">Not isLoggedIn</Alert> : null}
      {this.state.isAdmin === undefined ? <Alert severity="warning">isAdmin undefined</Alert> : null}
      {this.state.isAdmin === true ? <Alert severity="warning">isAdmin</Alert> : null}
      {this.state.isAdmin === false ? <Alert severity="warning">Not isAdmin</Alert> : null} */}
      {this.state.sessionToken !== "" ? <Alert severity="info">{this.state.sessionToken}</Alert> : null}
      {/* {this.state.isLoggedIn === true ? <button onClick={this.logOut}>Log Out</button> : null} */}
      <Router>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="body1">
            <Link to="/home">Home</Link> <MoreVert />
          </Typography>
          {this.state.isLoggedIn !== true ? <Typography variant="body1"><Link to="/login">Login</Link> <MoreVert /></Typography> : null}
          {this.state.isLoggedIn !== true ? <Typography variant="body1"><Link to="/register">Register</Link> <MoreVert /></Typography> : null}
          {this.state.isLoggedIn === true ? <Typography variant="body1"><a href="#" onClick={() => this.logOut()}>Log Out</a>  <MoreVert /></Typography> : null}
          {this.state.isAdmin === true ? <Typography variant="body1"><Link to="/admin">Admin <IconButton edge="start" color="inherit" aria-label="menu"><MenuIcon /></IconButton></Link></Typography> : null}
        </Toolbar>
      </AppBar>

      <Switch>
          <Route exact path="/" render={() => <Home isLoggedIn={this.state.isLoggedIn} isAdmin={this.state.isAdmin} sessionToken={this.state.sessionToken} titleID={this.state.titleID} setTitleID={this.setTitleID}  />}/>
          <Route exact path="/home" render={() => <Home isLoggedIn={this.state.isLoggedIn} isAdmin={this.state.isAdmin} sessionToken={this.state.sessionToken} titleID={this.state.titleID} setTitleID={this.setTitleID}  />}/>
          <Route exact path="/login" render={() => <Login isLoggedIn={this.state.isLoggedIn} isAdmin={this.state.isAdmin} sessionToken={this.state.sessionToken} setIsLoggedIn={this.setIsLoggedIn} setIsAdmin={this.setIsAdmin} setSessionToken={this.setSessionToken} />} />
          <Route exact path="/register" render={() => <Register isLoggedIn={this.state.isLoggedIn} isAdmin={this.state.isAdmin} sessionToken={this.state.sessionToken} setIsLoggedIn={this.setIsLoggedIn} setIsAdmin={this.setIsAdmin} setSessionToken={this.setSessionToken} />} />
          <Route exact path="/admin" render={() => <Admin isLoggedIn={this.state.isLoggedIn} isAdmin={this.state.isAdmin} sessionToken={this.state.sessionToken} />}/>
      </Switch>
      </Router>
    </div>
  );
    };
};

export default App;
