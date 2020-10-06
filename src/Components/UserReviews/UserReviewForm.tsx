import React, {Component} from "react";
import {Redirect} from "react-router-dom";

import {Alert, Rating} from '@material-ui/lab/';
import {Grid, Button, Checkbox, InputLabel, TextField, Select, MenuItem, Typography} from '@material-ui/core';

import {baseURL} from "../../Helpers/constants"
import {IUserReview} from "../../Helpers/interfaces"

interface IProps {
    isLoggedIn: boolean | undefined,
    isAdmin: boolean | undefined,
    sessionToken: string,
    titleID: number | undefined
};

interface IState {
    message: string,
    errMessage: string,
    userReviewRecordAdded: boolean | undefined,
    userReviewResultsFound: boolean | undefined,
    userReviewRecordUpdated: boolean | undefined,
    cbxRead: boolean,
    txtDateRead: string,
    rdoRating: number | null,
    txtShortReview: string,
    txtLongReview: string,
    userReviewData?: IUserReview | undefined,
    reviewID: number | undefined,
    userID: number | undefined,
    updatedBy: number | undefined,
    // titleID: number | undefined,
    read: boolean | undefined,
    dateRead: Date | undefined,
    rating: number | undefined,
    shortReview: string,
    longReview: string,
    active: boolean | undefined
};

class UserReviewForm extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            message: "",
            errMessage: "",
            userReviewRecordAdded: undefined,
            userReviewResultsFound: undefined,
            userReviewRecordUpdated: undefined,
            cbxRead: false,
            txtDateRead: "",
            rdoRating: null,
            txtShortReview: "",
            txtLongReview: "",
            userReviewData: undefined,
            reviewID: undefined,
            userID: undefined,
            updatedBy: undefined,
            // titleID: undefined,
            read: undefined,
            dateRead: undefined,
            rating: undefined,
            shortReview: "",
            longReview: "",
            active: undefined
        };

    };

    addUserReview = () => {
        // console.log("UserReviewForm.tsx addUserReview");
        // console.log("UserReviewForm.tsx addUserReview baseURL", baseURL);

        // console.log("UserReviewForm.tsx this.state.cbxRead", this.state.cbxRead);
        // console.log("UserReviewForm.tsx this.state.txtDateRead", this.state.txtDateRead);
        // console.log("UserReviewForm.tsx this.state.rdoRating", this.state.rdoRating);
        // console.log("UserReviewForm.tsx this.state.txtShortReview", this.state.txtShortReview);
        // console.log("UserReviewForm.tsx this.state.txtLongReview", this.state.txtLongReview);

        this.setState({message: ""});
        this.setState({errMessage: ""});
        this.setState({reviewID: undefined});
        this.setState({userID: undefined});
        this.setState({updatedBy: undefined});
        // this.setState({titleID: undefined});
        this.setState({read: undefined});
        this.setState({dateRead: undefined});
        this.setState({rating: undefined});
        this.setState({shortReview: ""});
        this.setState({longReview: ""});
        this.setState({active: undefined});

        // Check to make sure that this.state.txtDateRead) is a date?

        // Check to make sure that this.props.titleID is a number
        // txtDateRead is expecting a date and rdoRating is expecting a number
        if (this.state.txtDateRead !== undefined && this.state.rdoRating !== undefined) {

            let userReviewObject = {
                titleID: this.props.titleID,
                read: this.state.cbxRead,
                dateRead: this.state.txtDateRead,
                rating: this.state.rdoRating,
                shortReview: this.state.txtShortReview.trim(),
                longReview: this.state.txtLongReview.trim()
            };

            // console.log("UserReviewForm.tsx updateUserReview userReviewObject", userReviewObject);

            let url: string = baseURL + "userreview";

            fetch(url, {
                method: "POST",
                headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": this.props.sessionToken
                }),
                body: JSON.stringify({userReview: userReviewObject})
            })
            .then(response => {
                console.log("UserReviewForm.tsx addUserReview response", response);
                if (!response.ok) {
                    throw Error(response.status + " " + response.statusText + " " + response.url);
                } else {
                    return response.json();
                };
            })
            .then(data => {
                console.log("UserReviewForm.tsx addUserReview data", data);

                this.setState({userReviewRecordAdded: data.recordAdded});
                this.setState({message: data.message});

                if (data.resultsFound) {
                    this.setState({cbxRead: data.read});
                    this.setState({txtDateRead: data.dateRead});
                    this.setState({rdoRating: data.rating});
                    this.setState({txtShortReview: data.shortReview});
                    this.setState({txtLongReview: data.longReview});

                    this.setState({reviewID: data.reviewID});
                    this.setState({userID: data.userID});
                    this.setState({updatedBy: data.updatedBy});
                    // this.setState({titleID: data.titleID});
                    this.setState({read: data.read});
                    this.setState({dateRead: data.dateRead});
                    this.setState({rating: data.rating});
                    this.setState({shortReview: data.shortReview});
                    this.setState({longReview: data.longReview});
                    this.setState({active: data.active});
                } else {
                    this.setState({errMessage: data.message});
                };

            })
            .catch(error => {
                console.log("UserReviewForm.tsx addUserReview error", error);
                // console.log("UserReviewForm.tsx addUserReview error.name", error.name);
                // console.log("UserReviewForm.tsx addUserReview error.message", error.message);
                this.setState({errMessage: error.name + ": " + error.message});
            });

        };

    };

    getUserReview = () => {
        // console.log("UserReviewForm.tsx getUserReview");
        // console.log("UserReviewForm.tsx getUserReview baseURL", baseURL);

        this.setState({message: ""});
        this.setState({errMessage: ""});
        this.setState({userReviewData: undefined});
        this.setState({reviewID: undefined});
        this.setState({userID: undefined});
        this.setState({updatedBy: undefined});
        // this.setState({titleID: undefined});
        this.setState({read: undefined});
        this.setState({dateRead: undefined});
        this.setState({rating: undefined});
        this.setState({shortReview: ""});
        this.setState({longReview: ""});
        this.setState({active: undefined});

        let url: string = baseURL + "userreview";

        if (this.state.reviewID !== undefined) {
            url = url + "/" + this.state.reviewID;

            fetch(url, {
                method: "GET",
                headers: new Headers({
                "Content-Type": "application/json"
                }),
            })
            .then(response => {
                // console.log("UserReviewForm.tsx getUserReview response", response);
                if (!response.ok) {
                    throw Error(response.status + " " + response.statusText + " " + response.url);
                } else {
                    return response.json();
                };
            })
            .then(data => {
                // console.log("UserReviewForm.tsx getUserReview data", data);

                this.setState({userReviewResultsFound: data.resultsFound});
                this.setState({message: data.message});

                if (data.resultsFound) {
                    this.setState({userReviewData: data.userReviews[0]});
                    // console.log("UserReviewForm.tsx getUserReview userReviewData", this.state.userReviewData);

                    this.setState({cbxRead: data.userReviews[0].read});
                    this.setState({txtDateRead: data.userReviews[0].dateRead});
                    this.setState({rdoRating: data.userReviews[0].rating});
                    this.setState({txtShortReview: data.userReviews[0].shortReview});
                    this.setState({txtLongReview: data.userReviews[0].longReview});
    
                    this.setState({reviewID: data.userReviews[0].reviewID});
                    this.setState({userID: data.userReviews[0].userID});
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
                console.log("UserReviewForm.tsx getUserReview error", error);
                // console.log("UserReviewForm.tsx getUserReview error.name", error.name);
                // console.log("UserReviewForm.tsx getUserReview error.message", error.message);
                this.setState({errMessage: error.name + ": " + error.message});
            });
        };
    };

    updateUserReview = (deleteUserReview: boolean) => {
        // console.log("UserReviewForm.tsx updateUserReview");
        // this.setState({message: "form submitted"});

        this.setState({message: ""});
        this.setState({errMessage: ""});
        this.setState({userReviewData: undefined});
        // this.setState({reviewID: undefined});
        this.setState({userID: undefined});
        this.setState({updatedBy: undefined});
        // this.setState({titleID: undefined});
        this.setState({read: undefined});
        this.setState({dateRead: undefined});
        this.setState({rating: undefined});
        this.setState({shortReview: ""});
        this.setState({longReview: ""});
        this.setState({active: undefined});

        // txtDateRead is expecting a date and rdoRating is expecting a number
        if (this.state.txtDateRead !== undefined && this.state.rdoRating !== undefined) {

            let userReviewObject = {
                titleID: this.props.titleID,
                read: this.state.cbxRead,
                dateRead: this.state.txtDateRead,
                rating: this.state.rdoRating,
                shortReview: this.state.txtShortReview.trim(),
                longReview: this.state.txtLongReview.trim(),
                // active:     this.state.active
                active:     !deleteUserReview
            };

            // console.log("UserReviewForm.tsx updateUserReview userReviewObject", userReviewObject);

            let url: string = baseURL + "userreview/";
            // console.log("UserReviewForm.tsx updateUserReview url", url);

            if (this.state.reviewID !== undefined) {
                url = url + "/" + this.state.reviewID;
            };

            fetch(url, {
                method: "PUT",
                headers:    new Headers ({
                    "Content-Type": "application/json",
                    "Authorization": this.props.sessionToken
                }),
                body: JSON.stringify({userReview: userReviewObject})
            })
            .then(response => {
                // console.log("UserReviewForm.tsx updateUserReview response", response);
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
                // console.log("UserReviewForm.tsx updateUserReview data", data);

                this.setState({userReviewRecordUpdated: data.recordUpdated});
                // this.setState({isLoggedIn: data.isLoggedIn});
                // this.setState({isAdmin: data.isAdmin});
                this.setState({message: data.message});

                if (data.recordUpdated) {
                    this.setState({cbxRead: data.read});
                    this.setState({txtDateRead: data.dateRead});
                    this.setState({rdoRating: data.rating});
                    this.setState({txtShortReview: data.shortReview});
                    this.setState({txtLongReview: data.longReview});

                    this.setState({reviewID: data.reviewID});
                    this.setState({userID: data.userID});
                    this.setState({updatedBy: data.updatedBy});
                    // this.setState({titleID: data.titleID});
                    this.setState({read: data.read});
                    this.setState({dateRead: data.dateRead});
                    this.setState({rating: data.rating});
                    this.setState({shortReview: data.shortReview});
                    this.setState({longReview: data.longReview});
                    this.setState({active: data.active});
                } else {
                    // console.log("UpdateUser.tsx data.errorMessages", data.errorMessages);
                    // this.setState({errMessage: data.error});
                    this.setState({errMessage: data.errorMessages});
                };

            })
            .catch(error => {
                console.log("UserReviewForm.tsx updateUserReview error", error);
                // console.log("UserReviewForm.tsx updateUserReview error.name", error.name);
                // console.log("UserReviewForm.tsx updateUserReview error.message", error.message);
                this.setState({errMessage: error.name + ": " + error.message});
            });

        };

    };

    componentDidMount() {
        // this.getUserReview();
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

                <InputLabel htmlFor="cbxRead">Read</InputLabel>
                <Checkbox id="cbxRead" value={this.state.cbxRead} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({cbxRead: !this.state.cbxRead});}} />

                </Grid>
                <Grid item xs={12}>

                <InputLabel htmlFor="txtDateRead">Date Read</InputLabel>
                <TextField type="date" id="txtDateRead" variant="outlined" fullWidth
          margin="normal" value={this.state.txtDateRead} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtDateRead: event.target.value});}} />

                </Grid>
                <Grid item xs={12}>

                <Typography component="legend">Rating</Typography>
                <Rating name="rdoRating" defaultValue={0} max={10} value={this.state.rdoRating} onChange={(event, newValue) => {/*console.log(event.target.value);*/ this.setState({rdoRating: newValue});}} />

                </Grid>
                <Grid item xs={12}>

                <InputLabel htmlFor="txtShortReview">Short Review</InputLabel>
                <TextField type="text" id="txtShortReview" label="Short Review" variant="outlined" fullWidth
          margin="normal" value={this.state.txtShortReview} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtShortReview: event.target.value});}} />

                </Grid>
                <Grid item xs={12}>

                <InputLabel htmlFor="txtLongReview">Long Review</InputLabel>
                <TextField type="text" id="txtLongReview" label="Long Review" variant="outlined" fullWidth
          margin="normal" value={this.state.txtLongReview} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtLongReview: event.target.value});}} />
                </Grid>

                <Grid item xs={12}>
                {this.state.reviewID === undefined ? <Button variant="contained" color="primary" onClick={this.addUserReview}>Add Review</Button>
                : 
                <React.Fragment>
                <Button variant="contained" color="primary" onClick={(event) => {/*console.log(event.target.value);*/ this.updateUserReview(false);}}>Update Review</Button>
                <Button variant="contained" color="secondary" onClick={(event) => {/*console.log(event.target.value);*/ this.updateUserReview(true);}}>Delete Review</Button>
                </React.Fragment>
                }
                </Grid>
          </Grid>
        );
    };
};

export default UserReviewForm;