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
    userRecordAdded: boolean | null,
    // userList: IUser[],
    txtFirstName: string | undefined,
    txtLastName: string | undefined,
    txtEmail: string | undefined,
    txtPassword: string | undefined,
    errFirstName: string,
    errLastName: string,
    errEmail: string,
    errPassword: string,
    // userID: number | null,
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    updatedBy: number | null,
    admin: boolean | null,
    active: boolean | null,
    // isAdmin: boolean | null,
    // sessionToken: string
};

class Register extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            message: "",
            errMessage: "",
            modal: false,
            userRecordAdded: null,
            // userList: [],
            txtFirstName: process.env.REACT_APP_FIRSTNAME_DEFAULT,
            txtLastName: process.env.REACT_APP_LASTNAME_DEFAULT,
            txtEmail: process.env.REACT_APP_EMAIL_DEFAULT,
            txtPassword: process.env.REACT_APP_PASSWORD_DEFAULT,
            errFirstName: "",
            errLastName: "",
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

        // this.register = this.register.bind(this);

    };

    register = () => {
        // console.log("Register.tsx register");
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

        let firstNameValidated: boolean = false;
        let lastNameValidated: boolean  = false;
        let emailValidated: boolean = false;
        let passwordValidated: boolean  = false;
        let formValidated: boolean  = false;


        if (this.state.txtFirstName !== undefined && this.state.txtFirstName !== null) {
            if (this.state.txtFirstName.trim().length > 0) {
                firstNameValidated = true;
                this.setState({errFirstName: ""});
                // console.log("Register.tsx register Valid First Name");
                // console.log("Register.tsx register firstNameValidated true", firstNameValidated);
            } else {
                firstNameValidated = false;
                this.setState({errFirstName: "Please enter a first name."});
                // console.log("Register.tsx register Invalid First Name");
                // console.log("Register.tsx register firstNameValidated false", firstNameValidated);
            };
        };

        if (this.state.txtLastName !== undefined && this.state.txtLastName !== null) {
            if (this.state.txtLastName.trim().length > 0) {
                lastNameValidated = true;
                this.setState({errLastName: ""});
                // console.log("Register.tsx register Valid Last Name");
                // console.log("Register.tsx register lastNameValidated true", lastNameValidated);
            } else {
                lastNameValidated = false;
                this.setState({errLastName: "Please enter a last name."});
                // console.log("Register.tsx register Invalid Last Name");
                // console.log("Register.tsx register lastNameValidated false", lastNameValidated);
            };
        };

        if (this.state.txtEmail !== undefined && this.state.txtEmail !== null) {
            if (this.state.txtEmail.trim().match(emailRegExp) && this.state.txtEmail.trim().length > 0) {
            // if (this.state.txtEmail.trim().match(emailFormat) && this.state.txtEmail.trim().length > 0) {
                emailValidated = true;
                this.setState({errEmail: ""});
                // console.log("Register.tsx register Valid Email Address");
                // console.log("Register.tsx register emailValidated true", emailValidated);
            } else {
                emailValidated = false;
                this.setState({errEmail: "Please enter a valid email address."});
                // console.log("Register.tsx register Invalid Email Address");
                // console.log("Register.tsx register emailValidated false", emailValidated);
            };
        };

        if (this.state.txtPassword !== undefined && this.state.txtPassword !== null) {
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
        };

        if (firstNameValidated === true && lastNameValidated === true && emailValidated === true && passwordValidated === true) {
            formValidated = true;
            // console.log("Register.tsx register Valid Form");
            // console.log("Register.tsx register formValidated true", formValidated);
        } else {
            formValidated = false;
            // console.log("Register.tsx register Invalid Form");
            // console.log("Register.tsx register formValidated false", formValidated);
        };

        // console.log("Register.tsx register firstNameValidated", firstNameValidated);
        // console.log("Register.tsx register lastNameValidated", lastNameValidated);
        // console.log("Register.tsx register emailValidated", emailValidated);
        // console.log("Register.tsx register passwordValidated", passwordValidated);
        // console.log("Register.tsx register formValidated", formValidated);

        if (formValidated === true) {

            if (this.state.txtFirstName !== undefined && this.state.txtFirstName !== null && this.state.txtLastName !== undefined && this.state.txtLastName !== null && this.state.txtEmail !== undefined && this.state.txtEmail !== null && this.state.txtPassword !== undefined && this.state.txtPassword !== null) {
                let userObject = {
                    firstName:  this.state.txtFirstName.trim(),
                    lastName:  this.state.txtLastName.trim(),
                    email:  this.state.txtEmail.trim(),
                    password:  this.state.txtPassword.trim()
                };
                // console.log("Register.tsx register userObject", userObject);

                let url: string = baseURL + "user/register/";
                // console.log("Register.tsx register url", url);

                fetch(url, {
                    method: "POST",
                    headers:    new Headers ({
                        "Content-Type": "application/json"
                    }),
                    body: JSON.stringify({user: userObject})
                })
                .then(response => {
                    // console.log("Register.tsx register response", response);
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
                    // console.log("Register.tsx register data", data);

                    // if (data !== 500) {
                        // let registerResponse: IPostResponse = data;
                        // console.log("Register.tsx register registerResponse", registerResponse);
    
                        this.setState({userRecordAdded: data.recordAdded});
                        // this.setState({isAdmin: data.isAdmin});
                        // this.setState({message: data.message});

                        this.props.setIsAdmin(data.isAdmin);

                        if (data.recordAdded === true) {
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
                            // this.setState({errMessage: data.error});
                            this.setState({errMessage: data.errorMessages});
                        };
                    // } else {
                    //     // console.log("Login.js error", json);
                    //     this.setState({errMessage: "Registration failed."});
                    // };

                })
                .catch(error => {
                    console.log("Register.tsx register error", error);
                    // console.log("Register.tsx register error.name", error.name);
                    // console.log("Register.tsx register error.message", error.message);
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
             <Button outline size="sm" color="info" onClick={this.toggle}>Register</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                <ModalBody>
                <Form>
                <FormGroup>
                {this.state.message !== "" ? <Alert severity="info">{this.state.message}</Alert> : null}
                {this.state.errMessage !== "" ? <Alert severity="error">{this.state.errMessage}</Alert> : null}
                </FormGroup>
                <FormGroup>

                <Label for="txtFirstName">First Name</Label>
                <Input type="text" id="txtFirstName" label="First Name" value={this.state.txtFirstName} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtFirstName: event.target.value});}} />
                {this.state.errFirstName !== "" ? <Alert severity="error">{this.state.errFirstName}</Alert> : null}

                </FormGroup>
                <FormGroup>

                <Label for="txtLastName">Last Name</Label>
                <Input type="text" id="txtLastName" label="Last Name" value={this.state.txtLastName} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtLastName: event.target.value});}} />
                {this.state.errLastName !== "" ? <Alert severity="error">{this.state.errLastName}</Alert> : null}

                </FormGroup>
                <FormGroup>

                    <Label for="txtEmail">Email Address</Label>
                    <Input id="txtEmail" label="Email Address" value={this.state.txtEmail} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtEmail: event.target.value});}} />
                    {this.state.errEmail !== "" ? <Alert severity="error">{this.state.errEmail}</Alert> : null}

                </FormGroup>
                <FormGroup>

                    <Label for="txtPassword">Password</Label>
                    <Input type="password" id="txtPassword" value={this.state.txtPassword} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtPassword: event.target.value});}} />
                    {this.state.errPassword !== "" ? <Alert severity="error">{this.state.errPassword}</Alert> : null}
                    
                </FormGroup>

                <ModalFooter>
                     <Button outline size="lg" color="primary" onClick={this.register}>Register</Button>
                     <Button outline size="lg" color="danger" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </ModalBody>
          </Modal>
        </React.Fragment>
        );
    };
};

export default Register;