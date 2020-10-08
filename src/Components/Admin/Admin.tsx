import React, {Component} from "react";
import {Redirect} from "react-router-dom";

interface IProps {
    userID: number | null,
    isLoggedIn: boolean | null,
    isAdmin: boolean | null,
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

        if (!this.props.isAdmin) {
            return <Redirect to="/" />;
        };

        return(
            <div>
                <h1>Admin</h1>
          </div>
        );
    };
};

export default Admin;