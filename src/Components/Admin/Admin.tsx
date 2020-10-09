import React, {Component} from "react";
import {Redirect, BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import {AppBar, Toolbar, Typography, List, ListItem, ListItemText} from "@material-ui/core/";

import AddCategory from "./AddCategory";
import AddMedia from "./AddMedia";
import AddTitle from "./AddTitle";

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

        console.log("Admin.tsx this.props.isAdmin", this.props.isAdmin);

        if (this.props.isAdmin !== true) {
            return <Redirect to="/" />;
        };

        return(
            <Router>
            {/* <AppBar position="static" color="transparent">
            <Toolbar> */}
            <List>

                {this.props.isAdmin === true ? <Typography variant="button"><ListItem><Link to="/addcategory"><ListItemText>Add Category</ListItemText></Link></ListItem></Typography> : null}
                {this.props.isAdmin === true ? <Typography variant="button"><ListItem><Link to="/addmedia"><ListItemText>Add Media</ListItemText></Link></ListItem></Typography> : null}
                {this.props.isAdmin === true ? <Typography variant="button"><ListItem><Link to="/addtitle"><ListItemText>Add Title</ListItemText></Link></ListItem></Typography> : null}
      
            </List>
            {/* </Toolbar>
            </AppBar> */}
      
            <Switch>

                <Route exact path="/addcategory" render={() => <AddCategory userID={this.props.userID} /*isLoggedIn={this.props.isLoggedIn}*/ isAdmin={this.props.isAdmin} sessionToken={this.props.sessionToken} />}/>
                <Route exact path="/addmedia" render={() => <AddMedia userID={this.props.userID} /*isLoggedIn={this.props.isLoggedIn}*/ isAdmin={this.props.isAdmin} sessionToken={this.props.sessionToken} />}/>
                <Route exact path="/addtitle" render={() => <AddTitle userID={this.props.userID} /*isLoggedIn={this.props.isLoggedIn}*/ isAdmin={this.props.isAdmin} sessionToken={this.props.sessionToken} />}/>

            </Switch>
            </Router>
        );
    };
};

export default Admin;