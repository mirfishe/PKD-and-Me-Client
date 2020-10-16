import React, {Component} from "react";
import "./App.css";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import {Alert} from "@material-ui/lab/";
import {Grid, AppBar, Toolbar, Typography, Button} from "@material-ui/core/";
import HomeIcon from "@material-ui/icons/Home";
// import MenuIcon from "@material-ui/icons/Menu";

import {baseURL} from "./Helpers/constants";
import Admin from "./Components/Admin/Admin";
import Home from "./Components/Home/Home";
import Login from "./Components/User/Login";
import Register from "./Components/User/Register";
import UpdateUser from "./Components/User/UpdateUser";
import Checklist from "./Components/Checklist/Checklist";

interface IState {
  message: string,
  errMessage: string,
  userResultsFound: boolean | null,
  userID: number | null,
  isAdmin: boolean,
  sessionToken: string | null,
  titleID: number | null,
  categoryID: number | null,
  titleSort: string | null,
  titleUpdated: boolean
};

class App extends Component<{}, IState> {

    constructor(props: {}) {
      super(props);
      this.state = {
        message: "",
        errMessage: "",
        userResultsFound: null,
        userID: null,
        isAdmin: false,
        sessionToken: null,
        titleID: null,
        categoryID: null,
        titleSort: null,
        titleUpdated: false
      };

  };

  setUserID = (userID: number | null) => {
    this.setState({userID: userID});
  };

  setIsAdmin = (isAdmin: boolean) => {
    this.setState({isAdmin: isAdmin});
  };

  setSessionToken = (sessionToken: string | null) => {
    this.setState({sessionToken: sessionToken});
    this.updateToken(sessionToken);
  };

  setTitleID = (titleID: number | null) => {
    this.setState({titleID: titleID});
  };

  setCategoryID = (categoryID: number | null) => {
    this.setState({categoryID: categoryID});
  };

  setTitleSort = (titleSort: string | null) => {
    this.setState({titleSort: titleSort});
  };

  setTitleUpdated = (titleUpdated: boolean) => {
    this.setState({titleUpdated: titleUpdated});
  };

  updateToken = (newToken: string | null) => {
    if (newToken !== "" && newToken !== null) {
      localStorage.setItem("token", newToken);
      // console.log("App.tsx updateToken newToken", newToken);
      // console.log("App.tsx updateToken this.state.sessionToken", this.state.sessionToken); // Never shows the current value of sessionToken
      // console.log("App.tsx updateToken User token changed.");
    };
  };

  clearToken = () => {
    localStorage.clear();
    // setSessionToken("");
    // console.log("App.tsx clearToken localStorage token", localStorage.getItem("token"));
    // console.log("App.tsx sessionToken", sessionToken); // Never shows the current value of sessionToken
    // console.log("App.tsx clearToken User logged out.");
  };

  logOut = () => {
    this.setState({userID: null});
    this.setState({isAdmin: false});
    this.setState({sessionToken: null});
    this.clearToken();
  };

  goToHome = () => {
    this.setState({titleID: null});
    // The order of these matter because of the way that the state is cleared. The results aren't cleared because there still is a titleSort state?
    this.setState({titleSort: null});
    this.setState({categoryID: null});
  };

  getUser = (token: string | null) => {
    // console.log("App.tsx getUser");
    // console.log("App.tsx getUser baseURL", baseURL);

    this.setState({message: ""});
    this.setState({errMessage: ""});

    let url: string = baseURL + "user/";

    if (token !== "" && token !== null) {

        fetch(url, {
            method: "GET",
            headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": token
            }),
        })
        .then(response => {
            // console.log("App.tsx getUser response", response);
            // if (!response.ok) {
            //     throw Error(response.status + " " + response.statusText + " " + response.url);
            // } else {
                // if (response.status === 200) {
                    return response.json();
                // } else {
                //     return response.status;
                // };
            // };
        })
        .then(data => {
            // console.log("App.tsx getUser data", data);

            this.setState({userResultsFound: data.resultsFound});
            // this.setState({message: data.message});

            if (data.resultsFound === true) {

              if (data.users[0].active === true) {
                // this.setState({userID: data.users[0].userID});
                this.setUserID(data.users[0].userID);
                this.setIsAdmin(data.users[0].admin);
              } else {
                // Won't hit this because no records will be returned if the user is not active
                this.logOut();
              };

            } else {
              // console.log("App.tsx getUser data.resultsFound !== true", data.message);
              // this.setState({errMessage: data.message});
              this.logOut();
            };

        })
        .catch(error => {
            console.log("App.tsx getUser error", error);
            // console.log("App.tsx getUser error.name", error.name);
            // console.log("App.tsx getUser error.message", error.message);
            // this.setState({errMessage: error.name + ": " + error.message});
        });

    };

  };

  componentDidMount() {
    // console.log("App.tsx componentDidMount");
    if (localStorage.getItem("token") !== "" && localStorage.getItem("token") !== null) {

      this.setSessionToken(localStorage.getItem("token"));
      // console.log("App.tsx componentDidMount localStorage token", localStorage.getItem("token"));
      // console.log("App.tsx componentDidMount this.state.sessionToken", this.state.sessionToken); // Never shows the current value of sessionToken

      // Doesn't store if the user is active or is an admin
      // Doesn't store the userID except inside the sessionToken hash
      // ########## TEMPORARY ##########
      // this.setUserID(1);
      // this.setIsAdmin(true);
      // Fetch from the API to check these
      this.getUser(localStorage.getItem("token"));
    };
  };

  render() {

    // console.log("App.tsx this.state.userID", this.state.userID);
    // console.log("App.tsx this.state.isAdmin", this.state.isAdmin);
    // console.log("App.tsx this.state.sessionToken", this.state.sessionToken);
    // console.log("App.tsx localStorage.getItem(\"token\")", localStorage.getItem("token"));
    // console.log("App.tsx this.state.titleID", this.state.titleID);
    // console.log("App.tsx this.state.categoryID", this.state.categoryID);
    // console.log("App.tsx this.state.titleSort", this.state.titleSort);
    // console.log("App.tsx this.state.titleUpdated", this.state.titleUpdated);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
      <Router>
        
      {/* {window.location.hostname} */}
      {/* {this.state.userID !== null ? <Alert severity="info">{this.state.userID}</Alert> : null} */}
      {/* this.state.isAdmin === null ? <Alert severity="warning">isAdmin null</Alert> : null}
      {this.state.isAdmin === true ? <Alert severity="warning">isAdmin</Alert> : null}
      {this.state.isAdmin === false ? <Alert severity="warning">Not isAdmin</Alert> : null} */}
      {/* {this.state.sessionToken !== "" && this.state.sessionToken !== null ? <Alert severity="info">this.state.sessionToken={this.state.sessionToken}</Alert> : null} */}
      {/* {localStorage.getItem("token") !== "" && localStorage.getItem("token") !== null ? <Alert severity="info">localStorage.getItem("token")={localStorage.getItem("token")}</Alert> : null} */}

      {this.state.message !== "" ? <Alert severity="info">{this.state.message}</Alert> : null}
      {this.state.errMessage !== "" ? <Alert severity="error">{this.state.errMessage}</Alert> : null}

      <AppBar position="static" color="transparent" >
        <Toolbar>
        <Grid container spacing={2}>
          {/* <Grid item xs={1} style={{border: "5px solid black"}}>
          <Typography variant="body1">
            <Link to="/home"><HomeIcon color="primary" /></Link>
          </Typography>
            </Grid>
            <Grid item xs={1}> */}

          <Grid item xs={1}>
          <Typography variant="body1">
          <Link to="/home" onClick={() => this.goToHome()}><HomeIcon color="primary" /></Link>
          </Typography>
          </Grid>

          {this.state.isAdmin === true ? <Grid item xs={1}><Typography variant="button"><Link to="/admin">Admin</Link></Typography></Grid> : null}

          {/* {this.state.sessionToken === "" || this.state.sessionToken === null ? <Typography variant="body1"><Link to="/login">Login</Link></Typography></Grid> : null} */}
          {this.state.sessionToken === "" || this.state.sessionToken === null ? <Grid item xs={1}><Login userID={this.state.userID} isAdmin={this.state.isAdmin} sessionToken={this.state.sessionToken} setUserID={this.setUserID} setIsAdmin={this.setIsAdmin} setSessionToken={this.setSessionToken} /></Grid> : null}

          {/* {this.state.sessionToken === "" || this.state.sessionToken === null ? <Grid item xs={1}><Typography variant="body1"><Link to="/register">Register</Link></Typography></Grid> : null} */}
          {this.state.sessionToken === "" || this.state.sessionToken === null ? <Grid item xs={1}><Register userID={this.state.userID} isAdmin={this.state.isAdmin} sessionToken={this.state.sessionToken} setUserID={this.setUserID} setIsAdmin={this.setIsAdmin} setSessionToken={this.setSessionToken} /></Grid> : null}

          {/* {this.state.sessionToken !== "" && this.state.sessionToken !== null ? <Grid item xs={1}><Typography variant="body1"><Link to="/updateuser">Update Profile</Link> </Typography></Grid> : null} */}
          {this.state.sessionToken !== "" && this.state.sessionToken !== null ? <Grid item xs={1}><UpdateUser userID={this.state.userID} isAdmin={this.state.isAdmin} sessionToken={this.state.sessionToken} setUserID={this.setUserID} setIsAdmin={this.setIsAdmin} setSessionToken={this.setSessionToken} /></Grid> : null}

          {/* {this.state.sessionToken !== "" && this.state.sessionToken !== null ? <Grid item xs={1}><Typography variant="body1"><a href="#" onClick={() => this.logOut()}>Log Out</a></Typography></Grid> : null} */}

          {this.state.sessionToken !== "" && this.state.sessionToken !== null ? <Grid item xs={1}><Button variant="text" color="primary" onClick={() => this.logOut()}>Log Out</Button></Grid> : null}

          {this.state.sessionToken !== "" && this.state.sessionToken !== null && this.state.categoryID !== undefined && this.state.categoryID !== null ?
          <Grid item xs={1}><Checklist userID={this.state.userID} isAdmin={this.state.isAdmin} sessionToken={this.state.sessionToken} titleID={this.state.titleID} setTitleID={this.setTitleID} categoryID={this.state.categoryID} setCategoryID={this.setCategoryID} titleSort={this.state.titleSort} setTitleSort={this.setTitleSort} titleUpdated={this.state.titleUpdated} /></Grid>
          : null}

        </Grid>

        </Toolbar>
      </AppBar>


      <Grid container spacing={2}>
      <Grid item xs={12}>
      <Switch>
          <Route exact path="/" render={() => <Home userID={this.state.userID} isAdmin={this.state.isAdmin} sessionToken={this.state.sessionToken} titleID={this.state.titleID} setTitleID={this.setTitleID} categoryID={this.state.categoryID} setCategoryID={this.setCategoryID} titleSort={this.state.titleSort} setTitleSort={this.setTitleSort} titleUpdated={this.state.titleUpdated} setTitleUpdated={this.setTitleUpdated} />}/>
          <Route exact path="/home" render={() => <Home userID={this.state.userID} isAdmin={this.state.isAdmin} sessionToken={this.state.sessionToken} titleID={this.state.titleID} setTitleID={this.setTitleID} categoryID={this.state.categoryID} setCategoryID={this.setCategoryID} titleSort={this.state.titleSort} setTitleSort={this.setTitleSort} titleUpdated={this.state.titleUpdated} setTitleUpdated={this.setTitleUpdated} />}/>
          <Route exact path="/login" render={() => <Login userID={this.state.userID} isAdmin={this.state.isAdmin} sessionToken={this.state.sessionToken} setUserID={this.setUserID} setIsAdmin={this.setIsAdmin} setSessionToken={this.setSessionToken} />} />
          <Route exact path="/register" render={() => <Register userID={this.state.userID} isAdmin={this.state.isAdmin} sessionToken={this.state.sessionToken} setUserID={this.setUserID} setIsAdmin={this.setIsAdmin} setSessionToken={this.setSessionToken} />} />
          <Route exact path="/updateuser" render={() => <UpdateUser userID={this.state.userID} isAdmin={this.state.isAdmin} sessionToken={this.state.sessionToken} setUserID={this.setUserID} setIsAdmin={this.setIsAdmin} setSessionToken={this.setSessionToken} />} />
          <Route exact path="/admin" render={() => <Admin userID={this.state.userID} isAdmin={this.state.isAdmin} sessionToken={this.state.sessionToken} />}/>
      </Switch>
      </Grid>
      </Grid>

      </Router>
      </Grid>
    </Grid>
  );
    };
};

export default App;
