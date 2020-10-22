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
    userRecordUpdated: boolean | null,
    // userList: IUser[],
    txtFirstName: string | undefined,
    txtLastName: string | undefined,
    txtEmail: string | undefined,
    txtPassword: string | undefined,
    errFirstName: string,
    errLastName: string,
    errEmail: string,
    errPassword: string,
    // userData: IUser | null,
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

class UpdateUser extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            message: "",
            errMessage: "",
            modal: false,
            userResultsFound: null,
            userRecordUpdated: null,
            // userList: [],
            txtFirstName: process.env.REACT_APP_FIRSTNAME_DEFAULT,
            txtLastName: process.env.REACT_APP_LASTNAME_DEFAULT,
            txtEmail: process.env.REACT_APP_EMAIL_DEFAULT,
            txtPassword: undefined,
            errFirstName: "",
            errLastName: "",
            errEmail: "",
            errPassword: "",
            // userData: null,
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

    };

    getUser = () => {
        // console.log("UpdateUser.tsx getUser");
        // console.log("UpdateUser.tsx getUser baseURL", baseURL);

        this.setState({message: ""});
        this.setState({errMessage: ""});
        // this.setState({userData: null});
        // this.setState({userID: null});
        this.setState({firstName: null});
        this.setState({lastName: null});
        this.setState({email: null});
        this.setState({updatedBy: null});
        this.setState({admin: null});
        this.setState({active: null});

        let url: string = baseURL + "user/";

        if (this.props.sessionToken !== null) {

            fetch(url, {
                method: "GET",
                headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": this.props.sessionToken
                }),
            })
            .then(response => {
                // console.log("UpdateUser.tsx getUser response", response);
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
                // console.log("UpdateUser.tsx getUser data", data);

                this.setState({userResultsFound: data.resultsFound});
                // this.setState({message: data.message});

                if (data.resultsFound === true) {
                    // this.setState({userData: data.users[0]});
                    // console.log("UpdateUser.tsx getUser userData", this.state.userData);

                    this.setState({txtFirstName: data.users[0].firstName});
                    this.setState({txtLastName: data.users[0].lastName});
                    this.setState({txtEmail: data.users[0].email});

                    // this.setState({userID: data.users[0].userID});
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

    };

    updateUser = (deleteUser: boolean) => {
        // console.log("UpdateUser.tsx updateUser");
        // this.setState({message: "form submitted"});

        this.setState({message: ""});
        this.setState({errMessage: ""});
        // this.setState({userData: null});
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
                // console.log("UpdateUser.tsx updateUser Valid First Name");
                // console.log("UpdateUser.tsx updateUser firstNameValidated true", firstNameValidated);
            } else {
                firstNameValidated = false;
                this.setState({errFirstName: "Please enter a first name."});
                // console.log("UpdateUser.tsx updateUser Invalid First Name");
                // console.log("UpdateUser.tsx updateUser firstNameValidated false", firstNameValidated);
            };
        };

        if (this.state.txtLastName !== undefined && this.state.txtLastName !== null) {
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

        if (this.state.txtEmail !== undefined && this.state.txtEmail !== null) {
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

        if (this.state.txtPassword !== null && this.state.txtPassword !== undefined) {
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
        } else {
            passwordValidated = true;
            this.setState({errPassword: ""});
        };

        if (firstNameValidated === true && lastNameValidated === true && emailValidated === true && passwordValidated === true) {
            formValidated = true;
            // console.log("UpdateUser.tsx updateUser Valid Form");
            // console.log("UpdateUser.tsx updateUser formValidated true", formValidated);
        } else {
            formValidated = false;
            // console.log("UpdateUser.tsx updateUser Invalid Form");
            // console.log("UpdateUser.tsx updateUser formValidated false", formValidated);
        };

        // console.log("Register.tsx register firstNameValidated", firstNameValidated);
        // console.log("Register.tsx register lastNameValidated", lastNameValidated);
        // console.log("Register.tsx register emailValidated", emailValidated);
        // console.log("Register.tsx register passwordValidated", passwordValidated);
        // console.log("Register.tsx register formValidated", formValidated);

        if (formValidated === true && this.props.sessionToken !== null) {

            if (this.state.txtFirstName !== undefined && this.state.txtFirstName !== null && this.state.txtLastName !== undefined && this.state.txtLastName !== null && this.state.txtEmail !== undefined && this.state.txtEmail !== null) {
                let userObject = {
                    firstName:  this.state.txtFirstName.trim(),
                    lastName:  this.state.txtLastName.trim(),
                    email:  this.state.txtEmail.trim(),
                    updatedBy:  this.props.userID,
                    // active:     this.state.active
                    active:     !deleteUser
                };

                // If the user doesn't enter a password, then it isn't updated
                if (this.state.txtPassword !== null && this.state.txtPassword !== undefined) {
                    if (this.state.txtPassword.trim().length !== 0) {
                        Object.assign(userObject, {password: this.state.txtPassword.trim()});
                    };
                };

                // console.log("UpdateUser.tsx updateUser userObject", userObject);

                let url: string = baseURL + "user/";

                // Does it matter if the user is updating their own record as an admin or not?
                if (this.props.isAdmin === true) {
                    url = url + this.props.userID;
                };

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
                    // this.setState({isAdmin: data.isAdmin});
                    this.setState({message: data.message});

                    this.props.setIsAdmin(data.isAdmin);

                    if (data.recordUpdated === true) {
                        //this.setState({userData: data});

                        // this.setState({userID: data.userID});
                        this.setState({firstName: data.firstName});
                        this.setState({lastName: data.lastName});
                        this.setState({email: data.email});
                        this.setState({updatedBy: data.updatedBy});
                        this.setState({admin: data.admin});
                        this.setState({active: data.active});
                        // console.log("UpdateUser.tsx updateUser this.props.sessionToken", this.props.sessionToken);
                        // console.log("UpdateUser.tsx updateUser data.sessionToken", data.sessionToken);
                        // this.props.setSessionToken(data.sessionToken)

                        // Need to call this here because there are two buttons on the form besides the Cancel button
                        this.toggle();

                        // You are logged out after you update your profile.

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
        // this.getUser();
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
        // if (this.props.sessionToken === "" || this.props.sessionToken === null) {
        //     return <Redirect to="/" />;
        // };

        // console.log("UpdateUser.tsx this.state.errMessage", this.state.errMessage);

        return(
            <React.Fragment>
             <Button outline size="sm" color="info" onClick={this.toggle}>Profile</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                <ModalHeader toggle={this.toggle}>Update Profile</ModalHeader>
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
                     <Button outline size="lg" color="primary" onClick={(event) => {/*console.log(event.target.value);*/ this.updateUser(false);}}>Update</Button>
                     <Button outline size="lg" color="danger" onClick={(event) => {/*console.log(event.target.value);*/ this.updateUser(true);}}>Delete</Button>
                     <Button outline size="lg" color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </ModalBody>
          </Modal>
        </React.Fragment>
        );
    };
};

export default UpdateUser;