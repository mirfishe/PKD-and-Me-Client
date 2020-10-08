import React, {FunctionComponent} from 'react';

import {Grid} from '@material-ui/core';

import {IUser} from "../../Helpers/interfaces"

interface IProps {
    // userList: IUser[],
    userID: number | null,
    firstName: string,
    lastName: string,
    email: string,
    updatedBy: number | null,
    admin: boolean | null,
    active: boolean | null,
    isLoggedIn: boolean | null,
    isAdmin: boolean | null,
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
    if (props.admin !== null) {
        if (props.admin === true) {
            displayAdmin = "Admin";
        } else {
            displayAdmin = "Not An Admin";
        };
    } else {
        displayAdmin = "Admin null";
    };

    let displayActive: string = "";
    if (props.active !== null) {
        if (props.active === true) {
            displayActive = "Active";
        } else {
            displayActive = "Not Active";
        };
    } else {
        displayActive = "Active null";
    };

    let displayIsLoggedIn: string = "";
    if (props.isLoggedIn !== null) {
        if (props.isLoggedIn === true) {
            displayIsLoggedIn = "isLoggedIn";
        } else {
            displayIsLoggedIn = "Not isLoggedIn";
        };
    } else {
        displayIsLoggedIn = "isLoggedIn null";
    };

    let displayIsAdmin: string = "";
    if (props.isAdmin !== null) {
        if (props.isAdmin === true) {
            displayIsAdmin = "isAdmin";
        } else {
            displayIsAdmin = "Not isAdmin";
        };
    } else {
        displayIsAdmin = "isAdmin null";
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
            {props.updatedBy !== null ? <p>{props.updatedBy}</p> : null}

            {/* {props.admin === null ? <p>Admin null</p> : null}
            {props.admin === true ? <p>Admin</p> : null}
            {props.admin === false ? <p>Not An Admin</p> : null} */}
            {displayAdmin !== "" ? <p>{displayAdmin}</p> : null}

            {/* {props.active === null ? <p>Active null</p> : null}
            {props.active === true ? <p>Active</p> : null}
            {props.active === false ? <p>Not Active</p> : null} */}
            {displayActive !== "" ? <p>{displayActive}</p> : null}

            {/* {props.isLoggedIn === null ? <p>isLoggedIn null</p> : null}
            {props.isLoggedIn === true ? <p>isLoggedIn</p> : null}
            {props.isLoggedIn === false ? <p>Not isLoggedIn</p> : null} */}
            {displayIsLoggedIn !== "" ? <p>{displayIsLoggedIn}</p> : null}

            {/* {props.isAdmin === null ? <p>isAdmin null</p> : null}
            {props.isAdmin === true ? <p>isAdmin</p> : null}
            {props.isAdmin === false ? <p>Not isAdmin</p> : null} */}
            {displayIsAdmin !== "" ? <p>{displayIsAdmin}</p> : null}

            <p>{props.sessionToken}</p>
        </Grid>
    );

};

export default User;
