import React, {Component} from "react";
import {Redirect} from "react-router-dom";

interface IProps {
    isLoggedIn: boolean | undefined,
    isAdmin: boolean | undefined,
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
            return <Redirect to="/categories" />;
        };

        return(
            <div>
                <h1>Admin</h1>
          </div>
        );
    };
};

export default Admin;