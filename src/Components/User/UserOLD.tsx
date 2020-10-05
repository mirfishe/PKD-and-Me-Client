import React, {FunctionComponent} from 'react';

import {Grid} from '@material-ui/core';

import {IUser} from "../../Helpers/interfaces"

interface IProps {
    // userList: IUser[],
    userID: number | undefined,
    firstName: string,
    lastName: string,
    email: string,
    updatedBy: number | undefined,
    admin: boolean | undefined,
    active: boolean | undefined,
    isLoggedIn: boolean | undefined,
    isAdmin: boolean | undefined,
    sessionToken: string
};

const User: FunctionComponent <(IProps)> = props => {

    // console.log('User.tsx props.userList', props.userList);
    // console.log('User.tsx props.userID', props.userID);
    // console.log('User.tsx props.firstName', props.firstName);
    // console.log('User.tsx props.lastName', props.lastName);
    // console.log('User.tsx props.email', props.email);
    // console.log('User.tsx props.updatedBy', props.updatedBy);
    // console.log('User.tsx props.admin', props.admin);
    // console.log('User.tsx props.active', props.active);
    // console.log('User.tsx props.isLoggedIn', props.isLoggedIn);
    // console.log('User.tsx props.isAdmin', props.isAdmin);
    // console.log('User.tsx props.sessionToken', props.sessionToken);

    let displayAdmin: string = "";
    if (props.admin !== undefined) {
        if (props.admin === true) {
            displayAdmin = "Admin";
        } else {
            displayAdmin = "Not An Admin";
        };
    } else {
        displayAdmin = "Admin undefined";
    };

    let displayActive: string = "";
    if (props.active !== undefined) {
        if (props.active === true) {
            displayActive = "Active";
        } else {
            displayActive = "Not Active";
        };
    } else {
        displayActive = "Active undefined";
    };

    let displayIsLoggedIn: string = "";
    if (props.isLoggedIn !== undefined) {
        if (props.isLoggedIn === true) {
            displayIsLoggedIn = "isLoggedIn";
        } else {
            displayIsLoggedIn = "Not isLoggedIn";
        };
    } else {
        displayIsLoggedIn = "isLoggedIn undefined";
    };

    let displayIsAdmin: string = "";
    if (props.isAdmin !== undefined) {
        if (props.isAdmin === true) {
            displayIsAdmin = "isAdmin";
        } else {
            displayIsAdmin = "Not isAdmin";
        };
    } else {
        displayIsAdmin = "isAdmin undefined";
    };

    return(
        <Grid container>
            {/* {props.userList ? 
            <p key={props.userList.userID}>{props.userList.firstName} {props.userList.lastName}<br />
            {props.userList.email}<br />
            {props.userList.updatedBy}<br />
            {props.userList.admin}<br />
            {props.userList.active}
            </p>
            : ""} */}
            <p>{props.userID}</p>
            <p>{props.firstName} {props.lastName}</p>
            <p>{props.email}</p>
            {props.updatedBy !== undefined ? <p>{props.updatedBy}</p> : null}

            {/* {props.admin === undefined ? <p>Admin undefined</p> : null}
            {props.admin === true ? <p>Admin</p> : null}
            {props.admin === false ? <p>Not An Admin</p> : null} */}
            {displayAdmin !== "" ? <p>{displayAdmin}</p> : null}

            {/* {props.active === undefined ? <p>Active undefined</p> : null}
            {props.active === true ? <p>Active</p> : null}
            {props.active === false ? <p>Not Active</p> : null} */}
            {displayActive !== "" ? <p>{displayActive}</p> : null}

            {/* {props.isLoggedIn === undefined ? <p>isLoggedIn undefined</p> : null}
            {props.isLoggedIn === true ? <p>isLoggedIn</p> : null}
            {props.isLoggedIn === false ? <p>Not isLoggedIn</p> : null} */}
            {displayIsLoggedIn !== "" ? <p>{displayIsLoggedIn}</p> : null}

            {/* {props.isAdmin === undefined ? <p>isAdmin undefined</p> : null}
            {props.isAdmin === true ? <p>isAdmin</p> : null}
            {props.isAdmin === false ? <p>Not isAdmin</p> : null} */}
            {displayIsAdmin !== "" ? <p>{displayIsAdmin}</p> : null}

            <p>{props.sessionToken}</p>
        </Grid>
    );

};

export default User;
