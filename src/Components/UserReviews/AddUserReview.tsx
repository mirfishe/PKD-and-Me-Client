import React, {Component} from "react";
import {Redirect} from "react-router-dom";

import {Alert, Rating} from '@material-ui/lab/';
import {Grid, Button, Checkbox, InputLabel, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';

import {baseURL} from "../../Helpers/constants"
import {IUserReview} from "../../Helpers/interfaces"

interface IProps {
    userID: number | null,
    isLoggedIn: boolean | null,
    isAdmin: boolean | null,
    sessionToken: string,
    titleID: number | null,
    userReviewUpdated: () => void
};

interface IState {
    message: string,
    errMessage: string,
    dialogOpen: boolean,
    userReviewRecordAdded: boolean | null,
    userReviewResultsFound: boolean | null,
    userReviewRecordUpdated: boolean | null,
    cbxRead: boolean,
    txtDateRead: string,
    rdoRating: number | null,
    txtShortReview: string,
    txtLongReview: string,
    userReviewData?: IUserReview | null,
    reviewID: number | null,
    // userID: number | null,
    updatedBy: number | null,
    // titleID: number | null,
    read: boolean | null,
    dateRead: Date | null,
    rating: number | null,
    shortReview: string,
    longReview: string,
    active: boolean | null
};

class AddUserReview extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            message: "",
            errMessage: "",
            dialogOpen: false,
            userReviewRecordAdded: null,
            userReviewResultsFound: null,
            userReviewRecordUpdated: null,
            cbxRead: false,
            txtDateRead: "",
            rdoRating: null,
            txtShortReview: "",
            txtLongReview: "",
            userReviewData: null,
            reviewID: null,
            // userID: null,
            updatedBy: null,
            // titleID: null,
            read: null,
            dateRead: null,
            rating: null,
            shortReview: "",
            longReview: "",
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
        this.setState({reviewID: null});
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
                // dateRead: this.state.txtDateRead.trim(),
                rating: this.state.rdoRating,
                shortReview: this.state.txtShortReview.trim(),
                longReview: this.state.txtLongReview.trim()
            };

            // If the user doesn't enter a date read, then it isn't added/updated
            if (this.state.txtDateRead.trim().length !== 0) {
                Object.assign(userReviewObject, {dateRead: this.state.txtDateRead.trim()});
            };

            // console.log("AddUserReview.tsx addUserReview userReviewObject", userReviewObject);

            let url: string = baseURL + "userreview";
            // console.log("AddUserReview.tsx addUserReview url", url);

            fetch(url, {
                method: "POST",
                headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": this.props.sessionToken
                }),
                body: JSON.stringify({userReview: userReviewObject})
            })
            .then(response => {
                console.log("AddUserReview.tsx addUserReview response", response);
                if (!response.ok) {
                    throw Error(response.status + " " + response.statusText + " " + response.url);
                } else {
                    return response.json();
                };
            })
            .then(data => {
                console.log("AddUserReview.tsx addUserReview data", data);

                this.setState({userReviewRecordAdded: data.recordAdded});
                this.setState({message: data.message});

                if (data.recordAdded) {
                    this.setState({cbxRead: data.read});

                    if (data.dateRead !== undefined) {
                        this.setState({txtDateRead: data.dateRead.toString().substring(0, 10)});
                    } else {
                        this.setState({txtDateRead: ""});
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

        // };

    };

    componentDidMount() {
        // this.getUserReview();
      };

    handleOpen = () => {
        this.setState({dialogOpen: true});
    };
    
    handleClose = () => {
        this.setState({dialogOpen: false});
    };

    render() {

        if (!this.props.isLoggedIn) {
            return <Redirect to="/" />;
        };

        // console.log("UpdateUser.tsx this.state.errMessage", this.state.errMessage);

        return(
            <div>
            <Button variant="contained" color="primary" onClick={this.handleOpen}>Add Review</Button>
            <Dialog open={this.state.dialogOpen} onClose={this.handleClose} fullWidth={true} maxWidth="md">
                <DialogTitle id="form-dialog-title">Add Review</DialogTitle>
                <DialogContent>
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

                <DialogActions>
                    <Button variant="outlined" color="primary" onClick={this.addUserReview}>Add Review</Button>
                    <Button variant="outlined" color="primary" onClick={this.handleClose}>Cancel</Button>
                </DialogActions>
            </DialogContent>
          </Dialog>
        </div>
        );
    };
};

export default AddUserReview;