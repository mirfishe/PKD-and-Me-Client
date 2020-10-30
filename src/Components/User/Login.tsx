import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert, Button} from "reactstrap";
import {baseURL, emailRegExp} from "../../Helpers/constants";
// import {emailFormat} from "../../Helpers/constants";

interface IProps {
    userID: number | null,
    isAdmin: boolean,
    sessionToken: string | null,
    setUserID: (userID: number | null) => void,
    setIsAdmin: (setIsAdmin: boolean) => void,
    setSessionToken: (sessionToken: string) => void
};

interface IState {
    message: string,
    errMessage: string,
    modal: boolean,
    userResultsFound: boolean | null,
    // userList: IUser[],
    txtEmail: string | undefined,
    txtPassword: string | undefined,
    errEmail: string,
    errPassword: string,
    // userID: number | null,
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    updatedBy: number | null,
    admin: boolean | null,
    active: boolean | null
    // isAdmin: boolean | null,
    // sessionToken: string
};

class Login extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            message: "",
            errMessage: "",
            modal: false,
            userResultsFound: null,
            // userList: [],
            txtEmail: process.env.REACT_APP_EMAIL_DEFAULT,
            txtPassword: process.env.REACT_APP_PASSWORD_DEFAULT,
            errEmail: "",
            errPassword: "",
            // userID: null,
            firstName: null,
            lastName: null,
            email: null,
            updatedBy: null,
            admin: null,
            active: null
            // isAdmin: null,
            // sessionToken: ""
        };

        // this.logIn = this.logIn.bind(this);

    };

    logIn = () => {
        // console.log("Login.tsx logIn");
        // this.setState({message: "form submitted"});

        this.setState({message: ""});
        this.setState({errMessage: ""});
        // this.setState({userList: []});
        // this.setState({userID: null});
        this.setState({firstName: null});
        this.setState({lastName: null});
        this.setState({email: null});
        this.setState({updatedBy: null});
        this.setState({admin: null});
        this.setState({active: null});
        // this.setState({isAdmin: null});
        // this.setState({sessionToken: ""});

        let emailValidated: boolean = false;
        let passwordValidated: boolean  = false;
        let formValidated: boolean  = false;

        if (this.state.txtEmail !== undefined && this.state.txtEmail !== null) {
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

        if (this.state.txtPassword !== undefined && this.state.txtPassword !== null) {
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

        if (emailValidated === true && passwordValidated === true) {
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

        if (formValidated === true) {

            if (this.state.txtEmail !== undefined && this.state.txtEmail !== null && this.state.txtPassword !== undefined && this.state.txtPassword !== null) {
                let userObject = {
                    email:  this.state.txtEmail.trim(),
                    password:  this.state.txtPassword.trim()
                };
                // console.log("Login.tsx logIn userObject", userObject);

                let url: string = baseURL + "user/login/";
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
                        // this.setState({isAdmin: data.isAdmin});
                        // this.setState({message: data.message});

                        this.props.setIsAdmin(data.isAdmin);
    
                        if (data.resultsFound === true) {
                            // this.setState({userList: data});
                            // this.setState({userID: data.userID});
                            this.props.setUserID(data.userID);
                            this.setState({firstName: data.firstName});
                            this.setState({lastName: data.lastName});
                            this.setState({email: data.email});
                            this.setState({updatedBy: data.updatedBy});
                            this.setState({admin: data.admin});
                            this.setState({active: data.active});
                            // this.setState({sessionToken: data.sessionToken});
                            this.props.setSessionToken(data.sessionToken);
                        } else {
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

    // handleOpen = () => {
    //     this.setState({dialogOpen: true});
    // };
    
    // handleClose = () => {
    //     this.setState({dialogOpen: false});
    // };

    toggle = () => {
        this.setState({modal: !this.state.modal});
    };

    render() {

        // Not sure if this is needed since this was changed from a page to a dialog/modal.
        // if (this.props.sessionToken !== "" && this.props.sessionToken !== null) {
        //     return <Redirect to="/" />;
        // };

        return(
            <React.Fragment>
             <Button outline size="sm" color="info" onClick={this.toggle}>Login</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} size="md">
                <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                <ModalBody>
                <Form>
                <FormGroup>
                    {this.state.message !== "" ? <Alert color="info">{this.state.message}</Alert> : null}
                    {this.state.errMessage !== "" ? <Alert color="danger">{this.state.errMessage}</Alert> : null}
                </FormGroup>
                <FormGroup>

                    <Label for="txtEmail">Email Address</Label>
                    <Input id="txtEmail" label="Email Address" value={this.state.txtEmail} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtEmail: event.target.value});}} />
                    {this.state.errEmail !== "" ? <Alert color="danger">{this.state.errEmail}</Alert> : null}

                </FormGroup>
                <FormGroup>

                    <Label for="txtPassword">Password</Label>
                    <Input type="password" id="txtPassword" value={this.state.txtPassword} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtPassword: event.target.value});}} />
                    {this.state.errPassword !== "" ? <Alert color="danger">{this.state.errPassword}</Alert> : null}
                    
                </FormGroup>

                <ModalFooter>
                 <Button outline size="lg" color="primary" onClick={this.logIn}>Log In</Button>
                 <Button outline size="lg" color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
                </Form>
            </ModalBody>
          </Modal>
        </React.Fragment>
        );
    };
};

export default Login;