import React, {Component} from "react";

import {Alert} from '@material-ui/lab/';
import {Grid} from '@material-ui/core';

import {IUserReview} from "../../Helpers/interfaces"
import {baseURL} from "../../Helpers/constants"
import UserReview from "./UserReview";

interface IProps {
    isLoggedIn: boolean | undefined,
    isAdmin: boolean | undefined,
    sessionToken: string
};

interface IState {
    message: string,
    errMessage: string,
    userReviewResultsFound: boolean | undefined,
    userReviewList: IUserReview[]
};

class UserReviews extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            message: "",
            errMessage: "",
            userReviewResultsFound: undefined,
            userReviewList: []
        };

    };

    getUserReviews = () => {
        // console.log("UserReviews.tsx getUserReviews");
        // console.log("UserReviews.tsx getUserReviews baseURL", baseURL);

        let url: string = baseURL + "userreview";

        // console.log("UserReviews.tsx getUserReviews url", url);

        fetch(url)
        .then(response => {
            // console.log("UserReviews.tsx getUserReviews response", response);
            if (!response.ok) {
                throw Error(response.status + " " + response.statusText + " " + response.url);
            } else {
                return response.json();
            };
        })
        .then(data => {
            console.log("UserReviews.tsx getUserReviews data", data);

            // let editionResponse: IGetResponse = data;
            // console.log("UserReviews.tsx getUserReviews titleResponse", titleResponse);

            this.setState({userReviewResultsFound: data.resultsFound});
            this.setState({message: data.message});

            if (data.resultsFound) {
                this.setState({userReviewList: data.userReviews});
            } else {
                this.setState({errMessage: data.message});
            };

        })
        .catch(error => {
            console.log("UserReviews.tsx getUserReviews error", error);
            // console.log("UserReviews.tsx getUserReviews error.name", error.name);
            // console.log("UserReviews.tsx getUserReviews error.message", error.message);
            this.setState({errMessage: error.name + ": " + error.message});
        });

    };

    componentDidMount() {
        this.getUserReviews();
      };

    render() {

        return(
            <Grid container>
                <Grid item xs={12}>
                {this.state.message !== "" ? <Alert severity="info">{this.state.message}</Alert> : null}
                {this.state.errMessage !== "" ? <Alert severity="error">{this.state.errMessage}</Alert> : null}
                </Grid>
                <Grid item xs={10}>
                {this.state.userReviewResultsFound ? <UserReview userReviewList={this.state.userReviewList} /> : null}
                </Grid>
          </Grid>
        );
    };
};

export default UserReviews;