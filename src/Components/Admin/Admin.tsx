import React, {Component} from "react";
import {Redirect, BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import {Grid, List, ListItem, Typography} from "@material-ui/core/";

import AddCategory from "./AddCategory";
import AddMedia from "./AddMedia";
import AddTitle from "./AddTitle";
import AddEdition from "./AddEdition";

interface IProps {
    userID: number | null,
    isAdmin: boolean,
    sessionToken: string | null
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
            <Grid container spacing={2}>
            <Router>

            <Grid item xs={2}>
            <List>
            {this.props.isAdmin === true ? <ListItem><Typography variant="button"><Link to="/category">Category</Link></Typography></ListItem> : null}

            {this.props.isAdmin === true ? <ListItem><Typography variant="button"><Link to="/media">Media</Link></Typography></ListItem> : null}

            {this.props.isAdmin === true ? <ListItem><Typography variant="button"><Link to="/title">Title</Link></Typography></ListItem> : null}

            {this.props.isAdmin === true ? <ListItem><Typography variant="button"><Link to="/edition">Edition</Link></Typography></ListItem> : null}
            </List>
            </Grid>

            <Switch>

            <Grid item xs={10}>

                <Route exact path="/category" render={() => <AddCategory userID={this.props.userID} isAdmin={this.props.isAdmin} sessionToken={this.props.sessionToken} />}/>
                <Route exact path="/media" render={() => <AddMedia userID={this.props.userID} isAdmin={this.props.isAdmin} sessionToken={this.props.sessionToken} />}/>
                <Route exact path="/title" render={() => <AddTitle userID={this.props.userID} isAdmin={this.props.isAdmin} sessionToken={this.props.sessionToken} />}/>
                <Route exact path="/edition" render={() => <AddEdition userID={this.props.userID} isAdmin={this.props.isAdmin} sessionToken={this.props.sessionToken} />}/>

            </Grid>

            </Switch>
            </Router>
            </Grid>
        );
    };
};

export default Admin;