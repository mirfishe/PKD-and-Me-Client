import React, {Component} from "react";
import {Redirect} from "react-router-dom";

import {Alert} from '@material-ui/lab/';
import {Grid, Button, InputLabel, TextField} from '@material-ui/core';

import {baseURL, emailRegExp, emailFormat} from "../../Helpers/constants"
import {IUser} from "../../Helpers/interfaces"

interface IProps {
    isLoggedIn: boolean | undefined,
    isAdmin: boolean | undefined,
    sessionToken: string,
    setIsLoggedIn: (isLoggedIn: boolean) => void,
    setIsAdmin: (setIsAdmin: boolean) => void,
    setSessionToken: (sessionToken: string) => void
};

interface IState {
    message: string,
    errMessage: string,
    userResultsFound: boolean | undefined,
    userRecordUpdated: boolean | undefined,
    // userList: IUser[],
    txtFirstName: string,
    txtLastName: string,
    txtEmail: string,
    txtPassword: string,
    errFirstName: string,
    errLastName: string,
    errEmail: string,
    errPassword: string,
    userData?: IUser | undefined,
    userID: number | undefined,
    firstName: string,
    lastName: string,
    email: string,
    updatedBy: number | undefined,
    admin: boolean | undefined,
    active: boolean | undefined,
    // isLoggedIn: boolean | undefined,
    // isAdmin: boolean | undefined,
    // sessionToken: string
};

class UpdateUser extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            message: "",
            errMessage: "",
            userResultsFound: undefined,
            userRecordUpdated: undefined,
            // userList: [],
            txtFirstName: "",
            txtLastName: "",
            txtEmail: "",
            txtPassword: "",
            errFirstName: "",
            errLastName: "",
            errEmail: "",
            errPassword: "",
            userData: undefined,
            userID: undefined,
            firstName: "",
            lastName: "",
            email: "",
            updatedBy: undefined,
            admin: undefined,
            active: undefined
            // isLoggedIn: undefined,
            // isAdmin: undefined,
            // sessionToken: ""
        };

    };

    getUser = () => {
        // console.log("UpdateUser.tsx getUser");
        // console.log("UpdateUser.tsx getUser baseURL", baseURL);

        this.setState({userData: undefined});
        this.setState({userID: undefined});
        this.setState({firstName: ""});
        this.setState({lastName: ""});
        this.setState({email: ""});
        this.setState({updatedBy: undefined});
        this.setState({admin: undefined});
        this.setState({active: undefined});

        let url: string = baseURL + "user";

        fetch(url, {
            method: "GET",
            headers: new Headers({
              "Content-Type": "application/json",
              "Authorization": this.props.sessionToken
            }),
        })
        .then(response => {
            // console.log("UpdateUser.tsx getUser response", response);
            if (!response.ok) {
                throw Error(response.status + " " + response.statusText + " " + response.url);
            } else {
                return response.json();
            };
        })
        .then(data => {
            // console.log("UpdateUser.tsx getUser data", data);

            this.setState({userResultsFound: data.resultsFound});
            this.setState({message: data.message});

            if (data.resultsFound) {
                this.setState({userData: data.users[0]});
                // console.log("UpdateUser.tsx getUser userData", this.state.userData);

                this.setState({txtFirstName: data.users[0].firstName});
                this.setState({txtLastName: data.users[0].lastName});
                this.setState({txtEmail: data.users[0].email});

                this.setState({userID: data.users[0].userID});
                this.setState({firstName: data.users[0].firstName});
                this.setState({lastName: data.users[0].lastName});
                this.setState({email: data.users[0].email});
                this.setState({updatedBy: data.users[0].updatedBy});
                this.setState({admin: data.users[0].admin});
                this.setState({active: data.users[0].active});
            } else {
                this.setState({errMessage: data.message});
            };

        })
        .catch(error => {
            console.log("UpdateUser.tsx getUser error", error);
            // console.log("UpdateUser.tsx getUser error.name", error.name);
            // console.log("UpdateUser.tsx getUser error.message", error.message);
            this.setState({errMessage: error.name + ": " + error.message});
        });

    };

    updateUser = () => {
        // console.log("UpdateUser.tsx updateUser");
        // this.setState({message: "form submitted"});

        this.setState({message: ""});
        this.setState({errMessage: ""});
        // this.setState({userList: []});
        this.setState({userID: undefined});
        this.setState({firstName: ""});
        this.setState({lastName: ""});
        this.setState({email: ""});
        this.setState({updatedBy: undefined});
        this.setState({admin: undefined});
        this.setState({active: undefined});
        // this.setState({isLoggedIn: undefined});
        // this.setState({isAdmin: undefined});
        // this.setState({sessionToken: ""});

        let firstNameValidated: boolean = false;
        let lastNameValidated: boolean  = false;
        let emailValidated: boolean = false;
        let passwordValidated: boolean  = false;
        let formValidated: boolean  = false;


        if (this.state.txtFirstName !== undefined) {
            if (this.state.txtFirstName.trim().length > 0) {
                firstNameValidated = true;
                this.setState({errFirstName: ""});
                // console.log("UpdateUser.tsx updateUser Valid First Name");
                // console.log("UpdateUser.tsx updateUser firstNameValidated true", firstNameValidated);
            } else {
                firstNameValidated = false;
                this.setState({errFirstName: "Please enter a first name."});
                // console.log("UpdateUser.tsx updateUser Invalid First Name");
                // console.log("UpdateUser.tsx updateUser firstNameValidated false", firstNameValidated);
            };
        };

        if (this.state.txtLastName !== undefined) {
            if (this.state.txtLastName.trim().length > 0) {
                lastNameValidated = true;
                this.setState({errLastName: ""});
                // console.log("UpdateUser.tsx updateUser Valid Last Name");
                // console.log("UpdateUser.tsx updateUser lastNameValidated true", lastNameValidated);
            } else {
                lastNameValidated = false;
                this.setState({errLastName: "Please enter a last name."});
                // console.log("UpdateUser.tsx updateUser Invalid Last Name");
                // console.log("UpdateUser.tsx updateUser lastNameValidated false", lastNameValidated);
            };
        };

        if (this.state.txtEmail !== undefined) {
            if (this.state.txtEmail.trim().match(emailRegExp) && this.state.txtEmail.trim().length > 0) {
            // if (this.state.txtEmail.trim().match(emailFormat) && this.state.txtEmail.trim().length > 0) {
                emailValidated = true;
                this.setState({errEmail: ""});
                // console.log("UpdateUser.tsx updateUser Valid Email Address");
                // console.log("UpdateUser.tsx updateUser emailValidated true", emailValidated);
            } else {
                emailValidated = false;
                this.setState({errEmail: "Please enter a valid email address."});
                // console.log("UpdateUser.tsx updateUser Invalid Email Address");
                // console.log("UpdateUser.tsx updateUser emailValidated false", emailValidated);
            };
        };

        if (this.state.txtPassword !== undefined) {
            // If the user doesn't enter a password, then it isn't updated
            if (this.state.txtPassword.trim().length !== 0) {
                if (this.state.txtPassword.trim().length > 4) {
                    passwordValidated = true;
                    this.setState({errPassword: ""});
                    // console.log("Register.tsx register Valid Password");
                    // console.log("Register.tsx register passwordValidated true", passwordValidated);
                } else {
                    passwordValidated = false;
                    this.setState({errPassword: "Password must be at least 5 characters."});
                    // console.log("Register.tsx register Invalid Password");
                    // console.log("Register.tsx register passwordValidated false", passwordValidated);
                };
            } else {
                passwordValidated = true;
                this.setState({errPassword: ""});
            };
        };

        if (firstNameValidated && lastNameValidated && emailValidated && passwordValidated) {
            formValidated = true;
            // console.log("UpdateUser.tsx updateUser Valid Form");
            // console.log("UpdateUser.tsx updateUser formValidated true", formValidated);
        } else {
            formValidated = false;
            // console.log("UpdateUser.tsx updateUser Invalid Form");
            // console.log("UpdateUser.tsx updateUser formValidated false", formValidated);
        };

        // console.log("UpdateUser.tsx updateUser firstNameValidated", firstNameValidated);
        // console.log("UpdateUser.tsx updateUser lastNameValidated", lastNameValidated);
        // console.log("UpdateUser.tsx updateUser emailValidated", emailValidated);
        // console.log("UpdateUser.tsx updateUser formValidated", formValidated);

        if (formValidated) {

            if (this.state.txtFirstName !== undefined && this.state.txtLastName !== undefined && this.state.txtEmail !== undefined && this.state.txtPassword !== undefined) {
                let userObject = {
                    firstName:  this.state.txtFirstName.trim(),
                    lastName:  this.state.txtLastName.trim(),
                    email:  this.state.txtEmail.trim(),
                    updatedBy:  this.state.userID,
                    active:     this.state.active
                };

                // If the user doesn't enter a password, then it isn't updated
                if (this.state.txtPassword.trim().length !== 0) {
                    Object.assign(userObject, {password: this.state.txtPassword.trim()});
                };

                // console.log("UpdateUser.tsx updateUser userObject", userObject);

                let url: string = baseURL + "user/";
                // console.log("UpdateUser.tsx updateUser url", url);

                fetch(url, {
                    method: "PUT",
                    headers:    new Headers ({
                        "Content-Type": "application/json",
                        "Authorization": this.props.sessionToken
                    }),
                    body: JSON.stringify({user: userObject})
                })
                .then(response => {
                    // console.log("UpdateUser.tsx updateUser response", response);
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
                    // console.log("UpdateUser.tsx updateUser data", data);
    
                    this.setState({userRecordUpdated: data.recordUpdated});
                    // this.setState({isLoggedIn: data.isLoggedIn});
                    // this.setState({isAdmin: data.isAdmin});
                    this.setState({message: data.message});

                    this.props.setIsLoggedIn(data.isLoggedIn);
                    this.props.setIsAdmin(data.isAdmin);

                    if (data.recordUpdated) {
                        // this.setState({userList: data});
                        this.setState({userID: data.userID});
                        this.setState({firstName: data.firstName});
                        this.setState({lastName: data.lastName});
                        this.setState({email: data.email});
                        this.setState({updatedBy: data.updatedBy});
                        this.setState({admin: data.admin});
                        this.setState({active: data.active});
                        // console.log("UpdateUser.tsx updateUser this.props.sessionToken", this.props.sessionToken);
                        // console.log("UpdateUser.tsx updateUser data.sessionToken", data.sessionToken);
                        // this.props.setSessionToken(data.sessionToken)
                    } else {
                        // console.log("UpdateUser.tsx data.errorMessages", data.errorMessages);
                        // this.setState({errMessage: data.error});
                        this.setState({errMessage: data.errorMessages});
                    };

                })
                .catch(error => {
                    console.log("UpdateUser.tsx updateUser error", error);
                    // console.log("UpdateUser.tsx updateUser error.name", error.name);
                    // console.log("UpdateUser.tsx updateUser error.message", error.message);
                    this.setState({errMessage: error.name + ": " + error.message});
                });

            };

        };

    };

    componentDidMount() {
        this.getUser();
      };

    render() {

        if (!this.props.isLoggedIn) {
            return <Redirect to="/" />;
        };

        // console.log("UpdateUser.tsx this.state.errMessage", this.state.errMessage);

        return(
            <Grid container>
                <Grid item xs={12}>
                {this.state.message !== "" ? <Alert severity="info">{this.state.message}</Alert> : null}
                {this.state.errMessage !== "" ? <Alert severity="error">{this.state.errMessage}</Alert> : null}
                </Grid>
                <Grid item xs={12}>

                <InputLabel htmlFor="txtFirstName">First Name</InputLabel>
                <TextField type="text" id="txtFirstName" label="First Name" required variant="outlined" fullWidth
          margin="normal" value={this.state.txtFirstName} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtFirstName: event.target.value});}} />
                {this.state.errFirstName !== "" ? <Alert severity="error">{this.state.errFirstName}</Alert> : null}

                </Grid>
                <Grid item xs={12}>

                <InputLabel htmlFor="txtLastName">Last Name</InputLabel>
                <TextField type="text" id="txtLastName" label="Last Name" required variant="outlined" fullWidth
          margin="normal" value={this.state.txtLastName} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtLastName: event.target.value});}} />
                {this.state.errLastName !== "" ? <Alert severity="error">{this.state.errLastName}</Alert> : null}

                </Grid>
                <Grid item xs={12}>

                <InputLabel htmlFor="txtEmail">Email Address</InputLabel>
                <TextField id="txtEmail" label="Email Address" required variant="outlined" fullWidth
          margin="normal" value={this.state.txtEmail} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtEmail: event.target.value});}} />
                {this.state.errEmail !== "" ? <Alert severity="error">{this.state.errEmail}</Alert> : null}

                </Grid>
                <Grid item xs={12}>

                <InputLabel htmlFor="txtPassword">Password</InputLabel>
                <TextField type="password" id="txtPassword" required label="Password" variant="outlined" fullWidth
          margin="normal" value={this.state.txtPassword} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtPassword: event.target.value});}} />
                {this.state.errPassword !== "" ? <Alert severity="error">{this.state.errPassword}</Alert> : null}

                </Grid>
                <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={this.updateUser}>Update</Button>
                </Grid>
          </Grid>
        );
    };
};

export default UpdateUser;