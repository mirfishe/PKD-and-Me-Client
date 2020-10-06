import React, {Component} from "react";

import {Alert} from '@material-ui/lab/';
import {Grid} from '@material-ui/core';

import {ITitle, IEdition, IMedia, IUserReview} from "../../Helpers/interfaces"
import {baseURL} from "../../Helpers/constants"
import Edition from "../Editions/Edition";
import TitleDisplay from "./TitleDisplay";
import UserReview from "../UserReviews/UserReview";
import AddUserReview from "../UserReviews/AddUserReview";

interface IProps {
    userID: number | null,
    isLoggedIn: boolean | null,
    isAdmin: boolean | null,
    sessionToken: string,
    titleID: number | null,
    setTitleID: (titleID: number | null) => void
};

interface IState {
    // titleID: number | null,
    titleResultsFound: boolean | null,
    titleMessage: string,
    errTitleMessage: string,
    titleData?: ITitle,
    editionMessage: string,
    errEditionMessage: string,
    editionResultsFound: boolean | null,
    editionList: IEdition[],
    userReviewMessage: string,
    errUserReviewMessage: string,
    userReviewResultsFound: boolean | null,
    userReviewList: IUserReview[],
    userReviewedTitle: boolean
};

class Title extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            // titleID: null,
            titleMessage: "",
            errTitleMessage: "",
            titleResultsFound: null,
            editionMessage: "",
            errEditionMessage: "",
            editionResultsFound: null,
            editionList: [],
            userReviewMessage: "",
            errUserReviewMessage: "",
            userReviewResultsFound: null,
            userReviewList: [],
            userReviewedTitle: false
        };

        // this.getTitle = this.getTitle.bind(this);
        // this.getEditions = this.getEditions.bind(this);

    };

    userReviewUpdated = () => {
        this.getTitle();
    };

    getTitle = () => {
        // console.log("Title.tsx getTitle");
        // console.log("Title.tsx getTitle baseURL", baseURL);

        this.setState({titleMessage: ""});
        this.setState({errTitleMessage: ""});
        this.setState({userReviewedTitle: false});

        let url: string = baseURL + "title";

        // if (this.state.titleID !== null) {
        //     url = url + "/" + this.state.titleID;
        // };

        if (this.props.titleID !== null) {
            url = url + "/" + this.props.titleID;

            // console.log("Title.tsx getTitle url", url);

            fetch(url)
            .then(response => {
                // console.log("Title.tsx getTitle response", response);
                if (!response.ok) {
                    throw Error(response.status + " " + response.statusText + " " + response.url);
                } else {
                    return response.json();
                };
            })
            .then(data => {
                // console.log("Title.tsx getTitle data", data);

                // let titleResponse: IGetResponse = data;
                // console.log("Title.tsx getTitle titleResponse", titleResponse);

                this.setState({titleResultsFound: data.resultsFound});
                // this.setState({titleMessage: data.message});

                if (data.resultsFound) {
                    // this.setState({titleList: data.titles});
                    this.setState({titleData: data.titles[0]});

                    this.setState({editionList: data.titles[0].editions});
                    if (this.state.editionList.length > 0) {
                        this.setState({editionResultsFound: true});
                        // this.setState({editionMessage: "Successfully retrieved editions."});
                    } else {
                        this.setState({editionResultsFound: false});
                        // this.setState({editionMessage: "No editions found."});
                        this.setState({errEditionMessage: "No editions found."});
                    };

                    this.setState({userReviewList: data.titles[0].userReviews});
                    if (this.state.userReviewList.length > 0) {
                        this.setState({userReviewResultsFound: true});
                        // this.setState({userReviewMessage: "Successfully retrieved user reviews."});

                        for (let i = 0; i < this.state.userReviewList.length; i++) {

                            if (this.props.userID === this.state.userReviewList[i].userID) {
                                this.setState({userReviewedTitle: true});
                            };
                        };

                    } else {
                        this.setState({userReviewResultsFound: false});
                        // this.setState({userReviewMessage: "No user reviews found."});
                        this.setState({errUserReviewMessage: "No user reviews found."});
                    };

                } else {
                    this.setState({errTitleMessage: data.message});
                };

            })
            .catch(error => {
                console.log("Title.tsx getTitle error", error);
                // console.log("Title.tsx getTitle error.name", error.name);
                // console.log("Title.tsx getTitle error.message", error.message);
                this.setState({errTitleMessage: error.name + ": " + error.message});
            });

        };

    };

    // getEditions = () => {
    //     // console.log("Titles.tsx getEditions");
    //     // console.log("Titles.tsx getEditions baseURL", baseURL);

    //     // console.log('Titles.tsx getEditions titleID', titleID);
    //     // this.setState({titleID: titleID});

    //     let url: string = baseURL + "edition";

    //     // if (this.state.titleID !== null) {
    //     //     url = url + "/title/" + this.state.titleID;
    //     // };

    //     // if (titleID !== null) {
    //     //     url = url + "/title/" + titleID;
    //     // };

    //     if (this.props.titleID !== null) {
    //         url = url + "/title/" + this.props.titleID;

    //         // console.log("Titles.tsx getEditions url", url);

    //         fetch(url)
    //         .then(response => {
    //             // console.log("Titles.tsx getEditions response", response);
    //             if (!response.ok) {
    //                 throw Error(response.status + " " + response.statusText + " " + response.url);
    //             } else {
    //                 return response.json();
    //             };
    //         })
    //         .then(data => {
    //             // console.log("Titles.tsx getEditions data", data);

    //             // let editionResponse: IGetResponse = data;
    //             // console.log("Titles.tsx getEditions titleResponse", titleResponse);

    //             this.setState({editionResultsFound: data.resultsFound});
    //             this.setState({editionMessage: data.message});

    //             if (data.resultsFound) {
    //                 this.setState({editionList: data.editions});
    //             } else {
    //                 this.setState({errEditionMessage: data.message});
    //             };

    //         })
    //         .catch(error => {
    //             console.log("Titles.tsx getEditions error", error);
    //             // console.log("Titles.tsx getEditions error.name", error.name);
    //             // console.log("Titles.tsx getEditions error.message", error.message);
    //             this.setState({errEditionMessage: error.name + ": " + error.message});
    //         });

    //     };

    // };

    // getUserReviews = () => {
    //     // console.log("UserReviews.tsx getUserReviews");
    //     // console.log("UserReviews.tsx getUserReviews baseURL", baseURL);

    //     let url: string = baseURL + "userreview";

    //     if (this.props.titleID !== null) {
    //         url = url + "/title/" + this.props.titleID;

    //         // console.log("UserReviews.tsx getUserReviews url", url);

    //         fetch(url)
    //         .then(response => {
    //             // console.log("UserReviews.tsx getUserReviews response", response);
    //             if (!response.ok) {
    //                 throw Error(response.status + " " + response.statusText + " " + response.url);
    //             } else {
    //                 return response.json();
    //             };
    //         })
    //         .then(data => {
    //             // console.log("UserReviews.tsx getUserReviews data", data);

    //             // let editionResponse: IGetResponse = data;
    //             // console.log("UserReviews.tsx getUserReviews titleResponse", titleResponse);

    //             this.setState({userReviewResultsFound: data.resultsFound});
    //             this.setState({userReviewMessage: data.message});

    //             if (data.resultsFound) {
    //                 this.setState({userReviewList: data.userReviews});
    //             } else {
    //                 this.setState({errUserReviewMessage: data.message});
    //             };

    //         })
    //         .catch(error => {
    //             console.log("UserReviews.tsx getUserReviews error", error);
    //             // console.log("UserReviews.tsx getUserReviews error.name", error.name);
    //             // console.log("UserReviews.tsx getUserReviews error.message", error.message);
    //             this.setState({errUserReviewMessage: error.name + ": " + error.message});
    //         });
    //     };

    // };

    componentDidMount() {
        this.getTitle();
        // this.getEditions();
        // this.getUserReviews();
      };

    render() {

        return(
            <Grid container>
                <Grid item xs={10}>
                {this.state.titleMessage !== "" ? <Alert severity="info">{this.state.titleMessage}</Alert> : null}
                {this.state.errTitleMessage !== "" ? <Alert severity="error">{this.state.errTitleMessage}</Alert> : null}
                {this.state.errTitleMessage !== null ? <TitleDisplay titleData={this.state.titleData}/> : null}
                </Grid>
                <Grid item xs={10}>
                {this.state.editionMessage !== "" ? <Alert severity="info">{this.state.editionMessage}</Alert> : null}
                {this.state.errEditionMessage !== "" ? <Alert severity="error">{this.state.errEditionMessage}</Alert> : null}
                {this.state.editionResultsFound ? <Edition editionList={this.state.editionList} /> : null}
                </Grid>
                <Grid item xs={10}>
                {this.state.userReviewMessage !== "" ? <Alert severity="info">{this.state.userReviewMessage}</Alert> : null}
                {this.state.errUserReviewMessage !== "" ? <Alert severity="error">{this.state.errUserReviewMessage}</Alert> : null}
                {this.state.userReviewResultsFound ? <UserReview userID={this.props.userID} isLoggedIn={this.props.isLoggedIn} isAdmin={this.props.isAdmin} sessionToken={this.props.sessionToken} titleID={this.props.titleID} userReviewUpdated={this.userReviewUpdated} userReviewList={this.state.userReviewList} /> : null}
                </Grid>
                <Grid item xs={10}>
                {this.props.isLoggedIn === true && this.state.userReviewedTitle === false ? <AddUserReview userID={this.props.userID} isLoggedIn={this.props.isLoggedIn} isAdmin={this.props.isAdmin} sessionToken={this.props.sessionToken} titleID={this.props.titleID} userReviewUpdated={this.userReviewUpdated} /> : null}
                </Grid>
            </Grid>
        );
    };

};

export default Title;