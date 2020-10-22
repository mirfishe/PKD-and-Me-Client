import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {Rating} from "@material-ui/lab/";
import {Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, Alert, Button} from "reactstrap";
import {PencilSquare} from 'react-bootstrap-icons';
import {baseURL} from "../../Helpers/constants";

interface IProps {
    userID: number | null,
    isAdmin: boolean,
    sessionToken: string | null,
    titleID: number | null,
    reviewID: number | null,
    userReviewUpdated: () => void,
    displayIcon?: boolean,
    displayButton?: boolean
};

interface IState {
    message: string,
    errMessage: string,
    modal: boolean,
    userReviewResultsFound: boolean | null,
    userReviewRecordUpdated: boolean | null,
    userReviewRecordDeleted: boolean | null,
    cbxRead: boolean,
    txtDateRead: string | undefined,
    rdoRating: number | null,
    txtShortReview: string | undefined,
    txtLongReview: string | undefined,
    // userReviewData: IUserReview | null,
    // reviewID: number | null,
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

class UpdateUserReview extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            message: "",
            errMessage: "",
            modal: false,
            userReviewResultsFound: null,
            userReviewRecordUpdated: null,
            userReviewRecordDeleted: null,
            cbxRead: false,
            txtDateRead: undefined,
            rdoRating: null,
            txtShortReview: undefined,
            txtLongReview: undefined,
            // userReviewData: null,
            // reviewID: null,
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

    getUserReview = () => {
        // console.log("UpdateUserReview.tsx getUserReview");
        // console.log("UpdateUserReview.tsx getUserReview baseURL", baseURL);

        // console.log("UpdateUserReview.tsx getUserReview this.props.reviewID", this.props.reviewID);

        this.setState({message: ""});
        this.setState({errMessage: ""});
        this.setState({userReviewResultsFound: null});
        // this.setState({userReviewData: null});
        // this.setState({reviewID: null});
        // this.setState({userID: null});
        this.setState({updatedBy: null});
        // this.setState({titleID: null});
        this.setState({read: null});
        this.setState({dateRead: null});
        this.setState({rating: null});
        this.setState({shortReview: null});
        this.setState({longReview: null});
        this.setState({active: null});

        let url: string = baseURL + "userreview/";

        if (this.props.reviewID !== null) {
            url = url + this.props.reviewID;

            // console.log("UpdateUserReview.tsx getUserReview url", url);

            fetch(url, {
                method: "GET",
                headers: new Headers({
                "Content-Type": "application/json"
                }),
            })
            .then(response => {
                // console.log("UpdateUserReview.tsx getUserReview response", response);
                if (!response.ok) {
                    throw Error(response.status + " " + response.statusText + " " + response.url);
                } else {
                    return response.json();
                };
            })
            .then(data => {
                // console.log("UpdateUserReview.tsx getUserReview data", data);

                this.setState({userReviewResultsFound: data.resultsFound});
                // this.setState({message: data.message});

                if (data.resultsFound === true) {
                    // this.setState({userReviewData: data.userReviews[0]});
                    // console.log("UpdateUserReview.tsx getUserReview userReviewData", this.state.userReviewData);

                    this.setState({cbxRead: data.userReviews[0].read});

                    if (data.userReviews[0].dateRead !== undefined && data.userReviews[0].dateRead !== null) {
                        this.setState({txtDateRead: data.userReviews[0].dateRead.toString().substring(0, 10)});
                    } else {
                        this.setState({txtDateRead: undefined});
                    };

                    this.setState({rdoRating: data.userReviews[0].rating});
                    this.setState({txtShortReview: data.userReviews[0].shortReview});
                    this.setState({txtLongReview: data.userReviews[0].longReview});
    
                    // this.setState({reviewID: data.userReviews[0].reviewID});
                    // this.setState({userID: data.userReviews[0].userID});
                    this.setState({updatedBy: data.userReviews[0].updatedBy});
                    // this.setState({titleID: data.userReviews[0].titleID});
                    this.setState({read: data.userReviews[0].read});
                    this.setState({dateRead: data.userReviews[0].dateRead});
                    this.setState({rating: data.userReviews[0].rating});
                    this.setState({shortReview: data.userReviews[0].shortReview});
                    this.setState({longReview: data.userReviews[0].longReview});
                    this.setState({active: data.userReviews[0].active});

                } else {
                    this.setState({errMessage: data.message});
                };

            })
            .catch(error => {
                console.log("UpdateUserReview.tsx getUserReview error", error);
                // console.log("UpdateUserReview.tsx getUserReview error.name", error.name);
                // console.log("UpdateUserReview.tsx getUserReview error.message", error.message);
                this.setState({errMessage: error.name + ": " + error.message});
            });
        };
    };

    updateUserReview = (deleteUserReview: boolean) => {
        // console.log("UpdateUserReview.tsx updateUserReview");
        // this.setState({message: "form submitted"});

        this.setState({message: ""});
        this.setState({errMessage: ""});
        this.setState({userReviewRecordUpdated: null});
        // this.setState({userReviewData: null});
        // this.setState({reviewID: null});
        // this.setState({userID: null});
        this.setState({updatedBy: null});
        // this.setState({titleID: null});
        this.setState({read: null});
        this.setState({dateRead: null});
        this.setState({rating: null});
        this.setState({shortReview: ""});
        this.setState({longReview: ""});
        this.setState({active: null});

        // Check to make sure that this.state.txtDateRead) is a date?
        // Check to make sure that this.props.titleID is a number?
        // txtDateRead is expecting a date and rdoRating is expecting a number
        // if (this.state.txtDateRead !== null && this.state.rdoRating !== null) {

        let userReviewObject = {
            titleID: this.props.titleID,
            read: this.state.cbxRead,
            // dateRead: this.state.txtDateRead,
            rating: this.state.rdoRating,
            // shortReview: this.state.txtShortReview.trim(),
            // longReview: this.state.txtLongReview.trim(),
            // active: this.state.active
            active: !deleteUserReview
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

        // console.log("UpdateUserReview.tsx updateUserReview userReviewObject", userReviewObject);

        let url: string = baseURL + "userreview/";

        if (this.props.reviewID !== null) {
            url = url + this.props.reviewID;

            // Does it matter if the user is updating their own review as an admin or not?
            if (this.props.isAdmin === true) {
                url = url + "admin/" + this.props.reviewID;
            };

            // console.log("UpdateUserReview.tsx updateUserReview url", url);

            if (this.props.sessionToken !== null) {

                fetch(url, {
                    method: "PUT",
                    headers:    new Headers ({
                        "Content-Type": "application/json",
                        "Authorization": this.props.sessionToken
                    }),
                    body: JSON.stringify({userReview: userReviewObject})
                })
                .then(response => {
                    // console.log("UpdateUserReview.tsx updateUserReview response", response);
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
                    // console.log("UpdateUserReview.tsx updateUserReview data", data);

                    this.setState({userReviewRecordUpdated: data.recordUpdated});
                    this.setState({message: data.message}); // Never seen by the user if the update was successful

                    if (data.recordUpdated === true) {
                        // Never seen by the user if the update was successful
                        // this.setState({cbxRead: data.read});

                        // if (data.dateRead !== undefined && data.dateRead !== null) {
                        //     this.setState({txtDateRead: data.dateRead.toString().substring(0, 10)});
                        // } else {
                        //     this.setState({txtDateRead: ""});
                        // };

                        // this.setState({rdoRating: data.rating});
                        // this.setState({txtShortReview: data.shortReview});
                        // this.setState({txtLongReview: data.longReview});

                        // this.setState({reviewID: data.reviewID});
                        // this.setState({userID: data.userID});
                        this.setState({updatedBy: data.updatedBy});
                        // this.setState({titleID: data.titleID});
                        this.setState({read: data.read});
                        this.setState({dateRead: data.dateRead});
                        this.setState({rating: data.rating});
                        this.setState({shortReview: data.shortReview});
                        this.setState({longReview: data.longReview});
                        this.setState({active: data.active});

                        this.props.userReviewUpdated();
                        // Need to call this here because there are two buttons on the form besides the Cancel button
                        this.toggle();

                    } else {
                        this.setState({errMessage: data.message});
                    };

                })
                .catch(error => {
                    console.log("UpdateUserReview.tsx updateUserReview error", error);
                    // console.log("UpdateUserReview.tsx updateUserReview error.name", error.name);
                    // console.log("UpdateUserReview.tsx updateUserReview error.message", error.message);
                    this.setState({errMessage: error.name + ": " + error.message});
                });
                
            };

        };

    };

    deleteUserReview = () => {
        // console.log("UpdateUserReview.tsx deleteUserReview");
        // this.setState({message: "form submitted"});

        this.setState({message: ""});
        this.setState({errMessage: ""});
        this.setState({userReviewRecordDeleted: null});

        let url: string = baseURL + "userreview/";

        if (this.props.reviewID !== null) {
            url = url + this.props.reviewID;

            // console.log("UpdateUserReview.tsx deleteUserReview url", url);

            if (this.props.sessionToken !== null) {

                fetch(url, {
                    method: "DELETE",
                    headers:    new Headers ({
                        "Content-Type": "application/json",
                        "Authorization": this.props.sessionToken
                    })
                })
                .then(response => {
                    // console.log("UpdateUserReview.tsx deleteUserReview response", response);
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
                    // console.log("UpdateUserReview.tsx deleteUserReview data", data);

                    this.setState({userReviewRecordDeleted: data.recordDeleted});

                    this.setState({message: data.message}); // Never seen by the user if the delete was successful

                    if (data.recordDeleted === true) {

                        this.props.userReviewUpdated();
                        // Need to call this here because there are two buttons on the form besides the Cancel button
                        this.toggle();

                    } else {
                        this.setState({errMessage: data.message});
                    };

                })
                .catch(error => {
                    console.log("UpdateUserReview.tsx deleteUserReview error", error);
                    // console.log("UpdateUserReview.tsx deleteUserReview error.name", error.name);
                    // console.log("UpdateUserReview.tsx deleteUserReview error.message", error.message);
                    this.setState({errMessage: error.name + ": " + error.message});
                });

            };

        };

    };

    componentDidMount() {
        // this.getUserReview();
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
                
            {this.props.displayButton === true ? <Button outline size="sm" color="info" onClick={this.toggle}>Update Review</Button> : null}

            {this.props.displayIcon === true ? <PencilSquare className="addEditIcon" onClick={this.toggle} /> : null}

            <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                <ModalHeader toggle={this.toggle}>Update Review</ModalHeader>
                <ModalBody>
                <Form>
                <FormGroup>
                {this.state.message !== "" ? <Alert severity="info">{this.state.message}</Alert> : null}
                {this.state.errMessage !== "" ? <Alert severity="error">{this.state.errMessage}</Alert> : null}
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
                    <Button outline size="lg" color="primary" onClick={(event) => {/*console.log(event.target.value);*/ this.updateUserReview(false);}}>Update Review</Button>
                    <Button outline size="lg" color="danger" onClick={(event) => {/*console.log(event.target.value);*/ this.updateUserReview(true);}}>Delete Review</Button>
                    {this.props.isAdmin === true ?    <Button outline size="lg" color="warning" onClick={(event) => {/*console.log(event.target.value);*/ this.deleteUserReview();}}>Hard Delete Review</Button> : null}
                    <Button outline size="lg" color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </ModalBody>
          </Modal>
        </React.Fragment>
        );
    };
};

export default UpdateUserReview;