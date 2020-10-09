import React, {Component} from "react";
import "./App.css";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

// import {Alert} from '@material-ui/lab/';
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core/';
import HomeIcon from '@material-ui/icons/Home';
// import MenuIcon from '@material-ui/icons/Menu';

import Admin from "./Components/Admin/Admin";
import Home from "./Components/Home/Home";
import Login from "./Components/User/Login";
import Register from "./Components/User/Register";
import UpdateUser from "./Components/User/UpdateUser";
import Checklist from "./Components/Checklist/Checklist"

interface IState {
  userID: number | null,
  // isLoggedIn: boolean | null,
  isAdmin: boolean,
  sessionToken: string,
  titleID: number | null,
  categoryID: number | null
};

class App extends Component<{}, IState> {

    constructor(props: {}) {
      super(props);
      this.state = {
        userID: null,
        // isLoggedIn: null,
        isAdmin: false,
        sessionToken: "",
        titleID: null,
        categoryID: null
      };

  };

  setUserID = (userID: number | null) => {
    this.setState({userID: userID});
  };

  // setIsLoggedIn = (isLoggedIn: boolean) => {
  //   this.setState({isLoggedIn: isLoggedIn});
  // };

  setIsAdmin = (isAdmin: boolean) => {
    this.setState({isAdmin: isAdmin});
  };

  setSessionToken = (sessionToken: string) => {
    this.setState({sessionToken: sessionToken});
  };

  setTitleID = (titleID: number | null) => {
    this.setState({titleID: titleID});
  };

  setCategoryID = (categoryID: number | null) => {
    this.setState({categoryID: categoryID});
  };

  logOut = () => {
    this.setState({userID: null});
    // this.setState({isLoggedIn: null});
    this.setState({isAdmin: false});
    this.setState({sessionToken: ""});
  };

  render() {

    // console.log('App.tsx this.state.userID', this.state.userID);
    // console.log('App.tsx this.state.isLoggedIn', this.state.isLoggedIn);
    // console.log('App.tsx this.state.isAdmin', this.state.isAdmin);
    // console.log('App.tsx this.state.sessionToken', this.state.sessionToken);
    // console.log('App.tsx this.state.titleID', this.state.titleID);
    // console.log('App.tsx this.state.categoryID', this.state.categoryID);

  return (
    <div>
      {/* {window.location.hostname} */}
      {/* {this.state.userID !== null ? <Alert severity="info">{this.state.userID}</Alert> : null} */}
      {/* {this.state.isLoggedIn === null ? <Alert severity="error">isLoggedIn null</Alert> : null}
      {this.state.isLoggedIn === true ? <Alert severity="error">isLoggedIn</Alert> : null}
      {this.state.isLoggedIn === false ? <Alert severity="error">Not isLoggedIn</Alert> : null}
      {this.state.isAdmin === null ? <Alert severity="warning">isAdmin null</Alert> : null}
      {this.state.isAdmin === true ? <Alert severity="warning">isAdmin</Alert> : null}
      {this.state.isAdmin === false ? <Alert severity="warning">Not isAdmin</Alert> : null} */}
      {/* {this.state.sessionToken !== "" ? <Alert severity="info">{this.state.sessionToken}</Alert> : null} */}
      <Router>
      {/* <AppBar position="static" color="transparent"> */}
        <Toolbar>
          <Typography variant="body1">
            <Link to="/home"><HomeIcon color="primary" /></Link>
          </Typography>
          {/* {this.state.sessionToken !== "" ? <Typography variant="body1"><Link to="/login">Login</Link></Typography> : null} */}
          {this.state.sessionToken === "" ? <Login userID={this.state.userID} /*isLoggedIn={this.state.isLoggedIn}*/ isAdmin={this.state.isAdmin} sessionToken={this.state.sessionToken} setUserID={this.setUserID} /*setIsLoggedIn={this.setIsLoggedIn}*/ setIsAdmin={this.setIsAdmin} setSessionToken={this.setSessionToken} /> : null}
          {/* {this.state.sessionToken !== "" ? <Typography variant="body1"><Link to="/register">Register</Link></Typography> : null} */}
          {this.state.sessionToken === "" ? <Register userID={this.state.userID} /*isLoggedIn={this.state.isLoggedIn}*/ isAdmin={this.state.isAdmin} sessionToken={this.state.sessionToken} setUserID={this.setUserID} /*setIsLoggedIn={this.setIsLoggedIn}*/ setIsAdmin={this.setIsAdmin} setSessionToken={this.setSessionToken} /> : null}
          {/* {this.state.sessionToken !== "" ? <Typography variant="body1"><Link to="/updateuser">Update Profile</Link> </Typography> : null} */}
          {this.state.sessionToken !== "" ? <UpdateUser userID={this.state.userID} /*isLoggedIn={this.state.isLoggedIn}*/ isAdmin={this.state.isAdmin} sessionToken={this.state.sessionToken} setUserID={this.setUserID} /*setIsLoggedIn={this.setIsLoggedIn}*/ setIsAdmin={this.setIsAdmin} setSessionToken={this.setSessionToken} /> : null}
          {/* {this.state.sessionToken !== "" ? <Typography variant="body1"><a href="#" onClick={() => this.logOut()}>Log Out</a></Typography> : null} */}
          {this.state.sessionToken !== "" ? <Button variant="text" color="primary" onClick={() => this.logOut()}>Log Out</Button> : null}
          {this.state.isAdmin === true ? <Typography variant="button"><Link to="/admin">Admin</Link></Typography> : null}

          {this.state.sessionToken !== "" && this.state.categoryID !== undefined && this.state.categoryID !== null ?
          <Checklist userID={this.state.userID} /*isLoggedIn={this.state.isLoggedIn}*/ isAdmin={this.state.isAdmin} sessionToken={this.state.sessionToken} titleID={this.state.titleID} setTitleID={this.setTitleID} categoryID={this.state.categoryID} setCategoryID={this.setCategoryID} />
          : null}

        </Toolbar>
      {/* </AppBar> */}

      <Switch>
          <Route exact path="/" render={() => <Home userID={this.state.userID} /*isLoggedIn={this.state.isLoggedIn}*/ isAdmin={this.state.isAdmin} sessionToken={this.state.sessionToken} titleID={this.state.titleID} setTitleID={this.setTitleID} categoryID={this.state.categoryID} setCategoryID={this.setCategoryID} />}/>
          <Route exact path="/home" render={() => <Home userID={this.state.userID} /*isLoggedIn={this.state.isLoggedIn}*/ isAdmin={this.state.isAdmin} sessionToken={this.state.sessionToken} titleID={this.state.titleID} setTitleID={this.setTitleID} categoryID={this.state.categoryID} setCategoryID={this.setCategoryID} />}/>
          <Route exact path="/login" render={() => <Login userID={this.state.userID} /*isLoggedIn={this.state.isLoggedIn}*/ isAdmin={this.state.isAdmin} sessionToken={this.state.sessionToken} setUserID={this.setUserID} /*setIsLoggedIn={this.setIsLoggedIn}*/ setIsAdmin={this.setIsAdmin} setSessionToken={this.setSessionToken} />} />
          <Route exact path="/register" render={() => <Register userID={this.state.userID} /*isLoggedIn={this.state.isLoggedIn}*/ isAdmin={this.state.isAdmin} sessionToken={this.state.sessionToken} setUserID={this.setUserID} /*setIsLoggedIn={this.setIsLoggedIn}*/ setIsAdmin={this.setIsAdmin} setSessionToken={this.setSessionToken} />} />
          <Route exact path="/updateuser" render={() => <UpdateUser userID={this.state.userID} /*isLoggedIn={this.state.isLoggedIn}*/ isAdmin={this.state.isAdmin} sessionToken={this.state.sessionToken} setUserID={this.setUserID} /*setIsLoggedIn={this.setIsLoggedIn}*/ setIsAdmin={this.setIsAdmin} setSessionToken={this.setSessionToken} />} />
          <Route exact path="/admin" render={() => <Admin userID={this.state.userID} /*isLoggedIn={this.state.isLoggedIn}*/ isAdmin={this.state.isAdmin} sessionToken={this.state.sessionToken} />}/>
      </Switch>
      </Router>
    </div>
  );
    };
};

export default App;
