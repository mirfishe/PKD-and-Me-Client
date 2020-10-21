import React, {Component} from "react";
import {Redirect, BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {Container, Col, Row, Nav, Navbar, NavbarBrand, NavItem, NavbarText} from "reactstrap";

// import {Grid, List, NavItem, Typography} from "@material-ui/core/";

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

            <Router>

            <Container>
            <Row>
            <Navbar light>
            <Nav>

            {this.props.isAdmin === true ? <NavItem><Link to="/category">Category</Link></NavItem> : null}

            {this.props.isAdmin === true ? <NavItem><Link to="/media">Media</Link></NavItem> : null}

            {this.props.isAdmin === true ? <NavItem><Link to="/title">Title</Link></NavItem> : null}

            {this.props.isAdmin === true ? <NavItem><Link to="/edition">Edition</Link></NavItem> : null}

            </Nav>

            </Navbar>

            </Row>

            <Switch>

                <Row>

                <Route exact path="/category" render={() => <AddCategory userID={this.props.userID} isAdmin={this.props.isAdmin} sessionToken={this.props.sessionToken} />}/>
                <Route exact path="/media" render={() => <AddMedia userID={this.props.userID} isAdmin={this.props.isAdmin} sessionToken={this.props.sessionToken} />}/>
                <Route exact path="/title" render={() => <AddTitle userID={this.props.userID} isAdmin={this.props.isAdmin} sessionToken={this.props.sessionToken} />}/>
                <Route exact path="/edition" render={() => <AddEdition userID={this.props.userID} isAdmin={this.props.isAdmin} sessionToken={this.props.sessionToken} />}/>

                </Row>

            </Switch>
            </Container>
            </Router>

        );
    };
};

export default Admin;