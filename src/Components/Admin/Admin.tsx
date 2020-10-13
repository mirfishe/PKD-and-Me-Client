import React, {Component} from "react";
import {Redirect, BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import {AppBar, Toolbar, Typography} from "@material-ui/core/";

import AddCategory from "./AddCategory";
import AddMedia from "./AddMedia";
import AddTitle from "./AddTitle";
import AddEdition from "./AddEdition";

interface IProps {
    userID: number | null,
    // isLoggedIn: boolean | null,
    isAdmin: boolean,
    sessionToken: string
};

interface IState {

};

class Admin extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {

        };

    };


    render() {

        // console.log("Admin.tsx this.props.isAdmin", this.props.isAdmin);

        if (this.props.isAdmin !== true) {
            return <Redirect to="/" />;
        };

        return(
            <Router>
            <AppBar position="static" color="transparent">
            <Toolbar>

                {this.props.isAdmin === true ? <Typography variant="button"><Link to="/category">Category</Link></Typography> : null}
                {this.props.isAdmin === true ? <Typography variant="button"><Link to="/media">Media</Link></Typography> : null}
                {this.props.isAdmin === true ? <Typography variant="button"><Link to="/title">Title</Link></Typography> : null}
                {this.props.isAdmin === true ? <Typography variant="button"><Link to="/edition">Edition</Link></Typography> : null}
      
            </Toolbar>
            </AppBar>
      
            <Switch>

                <Route exact path="/category" render={() => <AddCategory userID={this.props.userID} /*isLoggedIn={this.props.isLoggedIn}*/ isAdmin={this.props.isAdmin} sessionToken={this.props.sessionToken} />}/>
                <Route exact path="/media" render={() => <AddMedia userID={this.props.userID} /*isLoggedIn={this.props.isLoggedIn}*/ isAdmin={this.props.isAdmin} sessionToken={this.props.sessionToken} />}/>
                <Route exact path="/title" render={() => <AddTitle userID={this.props.userID} /*isLoggedIn={this.props.isLoggedIn}*/ isAdmin={this.props.isAdmin} sessionToken={this.props.sessionToken} />}/>
                <Route exact path="/edition" render={() => <AddEdition userID={this.props.userID} /*isLoggedIn={this.props.isLoggedIn}*/ isAdmin={this.props.isAdmin} sessionToken={this.props.sessionToken} />}/>

            </Switch>
            </Router>
        );
    };
};

export default Admin;