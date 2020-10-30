import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {Rating} from "@material-ui/lab/";
import {Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, Alert, Button} from "reactstrap";
import {Plus} from 'react-bootstrap-icons';
import {baseURL} from "../../Helpers/constants";

interface IProps {
    userID: number | null,
    isAdmin: boolean,
    sessionToken: string | null,
    titleID: number | null,
    userReviewUpdated: () => void,
    displayIcon?: boolean,
    displayButton?: boolean
};

interface IState {
    message: string,
    errMessage: string,
    modal: boolean,
    userReviewRecordAdded: boolean | null,
    cbxRead: boolean,
    txtDateRead: string | undefined,
    rdoRating: number | null,
    txtShortReview: string | undefined,
    txtLongReview: string | undefined,
    // userReviewData: IUserReview | null,
    reviewID: number | null,
    // userID: number | null,
    updatedBy: number | null,
    // titleID: number | null,
    read: boolean | null,
    dateRead: Date | null,
    rating: number | null,
    shortReview: string | null,
    longReview: string | null,
    active: boolean | null
};

class AddUserReview extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            message: "",
            errMessage: "",
            modal: false,
            userReviewRecordAdded: null,
            cbxRead: false,
            txtDateRead: undefined,
            rdoRating: null,
            txtShortReview: undefined,
            txtLongReview: undefined,
            // userReviewData: null,
            reviewID: null,
            // userID: null,
            updatedBy: null,
            // titleID: null,
            read: null,
            dateRead: null,
            rating: null,
            shortReview: null,
            longReview: null,
            active: null
        };

    };

    addUserReview = () => {
        // console.log("AddUserReview.tsx addUserReview");
        // console.log("AddUserReview.tsx addUserReview baseURL", baseURL);

        // console.log("AddUserReview.tsx addUserReview this.props.titleID", this.props.titleID);
        // console.log("AddUserReview.tsx addUserReview this.state.cbxRead", this.state.cbxRead);
        // console.log("AddUserReview.tsx addUserReview this.state.txtDateRead", this.state.txtDateRead);
        // console.log("AddUserReview.tsx addUserReview this.state.rdoRating", this.state.rdoRating);
        // console.log("AddUserReview.tsx addUserReview this.state.txtShortReview", this.state.txtShortReview);
        // console.log("AddUserReview.tsx addUserReview this.state.txtLongReview", this.state.txtLongReview);

        this.setState({message: ""});
        this.setState({errMessage: ""});
        this.setState({userReviewRecordAdded: null});
        this.setState({reviewID: null});
        // this.setState({userID: null});
        this.setState({updatedBy: null});
        // this.setState({titleID: null});
        this.setState({read: null});
        this.setState({dateRead: null});
        this.setState({rating: null});
        this.setState({shortReview: null});
        this.setState({longReview: null});
        this.setState({active: null});

        // Check to make sure that this.state.txtDateRead) is a date?
        // Check to make sure that this.props.titleID is a number?
        // txtDateRead is expecting a date and rdoRating is expecting a number
        // if (this.state.txtDateRead !== null && this.state.rdoRating !== null) {

            let userReviewObject = {
                titleID: this.props.titleID,
                read: this.state.cbxRead,
                // dateRead: this.state.txtDateRead.trim(),
                rating: this.state.rdoRating,
                // shortReview: this.state.txtShortReview.trim(),
                // longReview: this.state.txtLongReview.trim()
            };

            // If the user doesn't enter a date read, then it isn't added/updated
            if (this.state.txtDateRead !== null && this.state.txtDateRead !== undefined) {
                if (this.state.txtDateRead.trim().length !== 0) {
                    Object.assign(userReviewObject, {dateRead: this.state.txtDateRead.trim()});
                };
            };

            // If the user doesn't enter a short review, then it isn't added/updated
            if (this.state.txtShortReview !== null && this.state.txtShortReview !== undefined) {
                if (this.state.txtShortReview.trim().length !== 0) {
                    Object.assign(userReviewObject, {shortReview: this.state.txtShortReview.trim()});
                };
            };

            // If the user doesn't enter a long review, then it isn't added/updated
            if (this.state.txtLongReview !== null && this.state.txtLongReview !== undefined) {
                if (this.state.txtLongReview.trim().length !== 0) {
                    Object.assign(userReviewObject, {longReview: this.state.txtLongReview.trim()});
                };
            };

            // console.log("AddUserReview.tsx addUserReview userReviewObject", userReviewObject);

            let url: string = baseURL + "userreview/";
            // console.log("AddUserReview.tsx addUserReview url", url);

            if (this.props.sessionToken !== null) {

                fetch(url, {
                    method: "POST",
                    headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": this.props.sessionToken
                    }),
                    body: JSON.stringify({userReview: userReviewObject})
                })
                .then(response => {
                    // console.log("AddUserReview.tsx addUserReview response", response);
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
                    // console.log("AddUserReview.tsx addUserReview data", data);

                    this.setState({userReviewRecordAdded: data.recordAdded});
                    this.setState({message: data.message});

                    if (data.recordAdded === true) {
                        this.setState({cbxRead: data.read});

                        if (data.dateRead !== undefined && data.dateRead !== null) {
                            this.setState({txtDateRead: data.dateRead.toString().substring(0, 10)});
                        } else {
                            this.setState({txtDateRead: undefined});
                        };

                        this.setState({rdoRating: data.rating});
                        this.setState({txtShortReview: data.shortReview});
                        this.setState({txtLongReview: data.longReview});

                        this.setState({reviewID: data.reviewID});
                        // this.setState({userID: data.userID});
                        this.setState({updatedBy: data.updatedBy});
                        // this.setState({titleID: data.titleID});
                        this.setState({read: data.read});
                        this.setState({dateRead: data.dateRead});
                        this.setState({rating: data.rating});
                        this.setState({shortReview: data.shortReview});
                        this.setState({longReview: data.longReview});
                        this.setState({active: data.active});

                        // Do I really need to repeat this since I already have all the data after the adding of the review?
                        // this.getUserReview();

                        this.props.userReviewUpdated();

                    } else {
                        this.setState({errMessage: data.message});
                    };

                    // return data.recordAdded;
                })
                // .then(recordAdded => {

                //     console.log("AddUserReview.tsx addUserReview this.state.reviewID", this.state.reviewID);
                //     console.log("AddUserReview.tsx addUserReview this.state.userID", this.state.userID);
                //     console.log("AddUserReview.tsx addUserReview this.state.updatedBy", this.state.updatedBy);
                //     // console.log("AddUserReview.tsx addUserReview this.props.titleID", this.props.titleID);
                //     console.log("AddUserReview.tsx addUserReview this.state.read", this.state.read);
                //     console.log("AddUserReview.tsx addUserReview this.state.dateRead", this.state.dateRead);
                //     console.log("AddUserReview.tsx addUserReview this.state.rating", this.state.rating);
                //     console.log("AddUserReview.tsx addUserReview this.state.shortReview", this.state.shortReview);
                //     console.log("AddUserReview.tsx addUserReview this.state.longReview", this.state.longReview);
                //     console.log("AddUserReview.tsx addUserReview this.state.active", this.state.active);

                //     if (recordAdded) {
                //         this.getUserReview();
                //     };
                // })
                .catch(error => {
                    console.log("AddUserReview.tsx addUserReview error", error);
                    // console.log("AddUserReview.tsx addUserReview error.name", error.name);
                    // console.log("AddUserReview.tsx addUserReview error.message", error.message);
                    this.setState({errMessage: error.name + ": " + error.message});
                });

            };

        // };

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

        if (this.props.sessionToken === "") {
            return <Redirect to="/" />;
        };

        return(
            <React.Fragment>
                            
            {this.props.displayButton === true ?  <Button outline size="sm" color="info" onClick={this.toggle}>Add Review</Button> : null}

            {this.props.displayIcon === true ? <Plus className="addEditIcon" onClick={this.toggle} /> : null}

            <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                <ModalHeader toggle={this.toggle}>Add Review</ModalHeader>
                <ModalBody>
                <Form>
                <FormGroup>
                {this.state.message !== "" ? <Alert color="info">{this.state.message}</Alert> : null}
                {this.state.errMessage !== "" ? <Alert color="danger">{this.state.errMessage}</Alert> : null}
                </FormGroup>
                <FormGroup row>

                <Col>
                <FormGroup>
                <Label for="cbxRead">Read</Label>
                <Input type="checkbox" id="cbxRead" checked={this.state.cbxRead} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({cbxRead: !this.state.cbxRead});}} />
                </FormGroup>

                <FormGroup>
                <Label for="rdoRating">Rating</Label>
                <Rating name="rdoRating" defaultValue={0} max={10} value={this.state.rdoRating} onChange={(event, newValue) => {/*console.log(event.target.value);*/ this.setState({rdoRating: newValue});}} />
                {/* <Label for="rdoRating"><Input type="radio" id="rdoRating" value={this.state.rdoRating} onChange={(event) => {this.setState({rdoRating: event.target.value});}} /> 1</Label>
                    
                <Label for="rdoRating"><Input type="radio" id="rdoRating" value={this.state.rdoRating} onChange={(event) => {this.setState({rdoRating: event.target.value});}} /> 2</Label>
                    
                <Label for="rdoRating"><Input type="radio" id="rdoRating" value={this.state.rdoRating} onChange={(event) => {this.setState({rdoRating: event.target.value});}} /> 3</Label>
                                    
                <Label for="rdoRating"><Input type="radio" id="rdoRating" value={this.state.rdoRating} onChange={(event) => {this.setState({rdoRating: event.target.value});}} /> 4</Label>     

                <Label for="rdoRating"><Input type="radio" id="rdoRating" value={this.state.rdoRating} onChange={(event) => {this.setState({rdoRating: event.target.value});}} /> 5</Label>
                                    
                <Label for="rdoRating"><Input type="radio" id="rdoRating" value={this.state.rdoRating} onChange={(event) => {this.setState({rdoRating: event.target.value});}} /> 6</Label>
                                    
                <Label for="rdoRating"><Input type="radio" id="rdoRating" value={this.state.rdoRating} onChange={(event) => {this.setState({rdoRating: event.target.value});}} /> 7</Label>
                                    
                <Label for="rdoRating"><Input type="radio" id="rdoRating" value={this.state.rdoRating} onChange={(event) => {this.setState({rdoRating: event.target.value});}} /> 8</Label>
                                    
                <Label for="rdoRating"><Input type="radio" id="rdoRating" value={this.state.rdoRating} onChange={(event) => {this.setState({rdoRating: event.target.value});}} /> 9</Label>
                                    
                <Label for="rdoRating"><Input type="radio" id="rdoRating" value={this.state.rdoRating} onChange={(event) => {this.setState({rdoRating: event.target.value});}} /> 10</Label> */}
                </FormGroup>
                </Col>

                <FormGroup>
                <Label for="txtDateRead">Date Read</Label>
                <Input type="date" id="txtDateRead" value={this.state.txtDateRead} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtDateRead: event.target.value});}} />
                </FormGroup>
                
                </FormGroup>
                <FormGroup>
    
                <Label for="txtShortReview">Short Review</Label>
                <Input type="text" id="txtShortReview" value={this.state.txtShortReview} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtShortReview: event.target.value});}} />

                </FormGroup>
                <FormGroup>
    
                <Label for="txtLongReview">Long Review</Label>
                <Input type="textarea" id="txtLongReview" rows={10} value={this.state.txtLongReview} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtLongReview: event.target.value});}} />

                </FormGroup>

                <ModalFooter>
                 <Button outline size="lg" color="primary" onClick={this.addUserReview}>Add Review</Button>
                 <Button outline size="lg" color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
                </Form>
            </ModalBody>
          </Modal>
        </React.Fragment>
        );
    };
};

export default AddUserReview;