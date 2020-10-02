import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {IUser} from "../../Helpers/interfaces"
import {baseURL, emailRegExp, emailFormat} from "../../Helpers/constants"
import User from "./User";

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
    // userList: IUser[],
    txtEmail: string | undefined,
    txtPassword: string | undefined,
    errEmail: string,
    errPassword: string,
    userID: number | undefined,
    firstName: string,
    lastName: string,
    email: string,
    updatedBy: number | undefined,
    admin: boolean | undefined,
    active: boolean | undefined
    // isLoggedIn: boolean | undefined,
    // isAdmin: boolean | undefined,
    // sessionToken: string
};

class Login extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            message: "",
            errMessage: "",
            userResultsFound: undefined,
            // userList: [],
            txtEmail: process.env.REACT_APP_EMAIL_DEFAULT,
            txtPassword: process.env.REACT_APP_PASSWORD_DEFAULT,
            errEmail: "",
            errPassword: "",
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

        this.logIn = this.logIn.bind(this);

    };

    logIn = () => {
        // console.log("Login.tsx logIn");
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

        let emailValidated: boolean = false;
        let passwordValidated: boolean  = false;
        let formValidated: boolean  = false;

        if (this.state.txtEmail !== undefined) {
            if (this.state.txtEmail.trim().match(emailRegExp) && this.state.txtEmail.trim().length > 0) {
            // if (this.state.txtEmail.trim().match(emailFormat) && this.state.txtEmail.trim().length > 0) {
                emailValidated = true;
                this.setState({errEmail: ""});
                // console.log("Login.tsx logIn Valid Email Address");
                // console.log("Login.tsx logIn emailValidated true", emailValidated);
            } else {
                emailValidated = false;
                this.setState({errEmail: "Please enter a valid email address."});
                // console.log("Login.tsx logIn Invalid Email Address");
                // console.log("Login.tsx logIn emailValidated false", emailValidated);
            };
        };

        if (this.state.txtPassword !== undefined) {
            if (this.state.txtPassword.trim().length > 4) {
                passwordValidated = true;
                this.setState({errPassword: ""});
                // console.log("Login.tsx logIn Valid Password");
                // console.log("Login.tsx logIn passwordValidated true", passwordValidated);
            } else {
                passwordValidated = false;
                this.setState({errPassword: "Password must be at least 5 characters."});
                // console.log("Login.tsx logIn Invalid Password");
                // console.log("Login.tsx logIn passwordValidated false", passwordValidated);
            };
        };

        if (emailValidated && passwordValidated) {
            formValidated = true;
            // console.log("Login.tsx logIn Valid Form");
            // console.log("Login.tsx logIn formValidated true", formValidated);
        } else {
            formValidated = false;
            // console.log("Login.tsx logIn Invalid Form");
            // console.log("Login.tsx logIn formValidated false", formValidated);
        };

        // console.log("Login.tsx logIn emailValidated", emailValidated);
        // console.log("Login.tsx logIn passwordValidated", passwordValidated);
        // console.log("Login.tsx logIn formValidated", formValidated);

        if (formValidated) {

            if (this.state.txtEmail !== undefined && this.state.txtPassword !== undefined) {
                let userObject = {
                    email:  this.state.txtEmail.trim(),
                    password:  this.state.txtPassword.trim()
                };
                // console.log("Login.tsx logIn userObject", userObject);

                let url: string = baseURL + "user/login";
                // console.log("Login.tsx logIn url", url);

                fetch(url, {
                    method: "POST",
                    headers:    new Headers ({
                        "Content-Type": "application/json"
                    }),
                    body: JSON.stringify({user: userObject})
                })
                .then(response => {
                    // console.log("Login.tsx logIn response", response);
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
                    // console.log("Login.tsx logIn data", data);

                    // if (data !== 500 && data !== 401) {
                        // let logInResponse: IGetResponse = data;
                        // console.log("Login.tsx logIn logInResponse", logInResponse);
    
                        this.setState({userResultsFound: data.resultsFound});
                        // this.setState({isLoggedIn: data.isLoggedIn});
                        // this.setState({isAdmin: data.isAdmin});
                        this.setState({message: data.message});

                        this.props.setIsLoggedIn(data.isLoggedIn);
                        this.props.setIsAdmin(data.isAdmin);
    
                        if (data.resultsFound) {
                            // this.setState({userList: data});
                            this.setState({userID: data.userID});
                            this.setState({firstName: data.firstName});
                            this.setState({lastName: data.lastName});
                            this.setState({email: data.email});
                            this.setState({updatedBy: data.updatedBy});
                            this.setState({admin: data.admin});
                            this.setState({active: data.active});
                            // this.setState({isLoggedIn: data.isLoggedIn});
                            // this.setState({sessionToken: data.sessionToken});
                            this.props.setSessionToken(data.sessionToken);
                        } else {
                            // this.setState({isLoggedIn: data.isLoggedIn});
                            this.setState({errMessage: data.error});
                        };
                    // } else {
                    //     // console.log("Login.js error", json);
                    //     this.setState({errMessage: "Login failed."});
                    // };

                })
                .catch(error => {
                    console.log("Login.tsx logIn error", error);
                    // console.log("Login.tsx logIn error.name", error.name);
                    // console.log("Login.tsx logIn error.message", error.message);
                    this.setState({errMessage: error.name + ": " + error.message});
                });

            };

        };

    };

    render() {

        if (this.props.isLoggedIn) {
            return <Redirect to="/categories" />;
        };

        return(
            <div>
                <h1>Login</h1>
                {this.state.message !== "" ? <p>{this.state.message}</p> : null}
                {this.state.errMessage !== "" ? <p>{this.state.errMessage}</p> : null}

                    <label>Email Address</label>
                    <input type="text" id="txtEmail" placeholder="Email Address" value={this.state.txtEmail} onChange={(event) => {/*console.log(event.target.value);*/this.setState({txtEmail: event.target.value});}} />
                    {this.state.errEmail !== "" ? <p>{this.state.errEmail}</p> : null}

                    <label>Password</label>
                    <input type="password" id="txtPassword" placeholder="Password" value={this.state.txtPassword} onChange={(event) => {/*console.log(event.target.value);*/this.setState({txtPassword: event.target.value});}} />
                    {this.state.errPassword !== "" ? <p>{this.state.errPassword}</p> : null}

                    <button onClick={this.logIn}>Log In</button>
                <div>
                {this.state.userResultsFound ? <User /*userList={this.state.userList}*/ userID={this.state.userID} firstName={this.state.firstName} lastName={this.state.lastName} email={this.state.email} updatedBy={this.state.updatedBy} admin={this.state.admin} active={this.state.active} isLoggedIn={this.props.isLoggedIn} isAdmin={this.props.isAdmin} sessionToken={this.props.sessionToken} /> : null}
                </div>
          </div>
        );
    };
};

export default Login;