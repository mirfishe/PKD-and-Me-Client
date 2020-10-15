import React, {Component} from "react";

import {Alert} from "@material-ui/lab/";
import {Grid} from "@material-ui/core";

import {ITitle, ICategory, IEdition, IUserReview} from "../../Helpers/interfaces"
import {baseURL} from "../../Helpers/constants"
import Edition from "../Editions/Edition";
import TitleDisplay from "./TitleDisplay";
import UserReview from "../UserReviews/UserReview";
import AddUserReview from "../UserReviews/AddUserReview";

interface IProps {
    userID: number | null,
    isAdmin: boolean,
    sessionToken: string,
    titleID: number | null,
    setTitleID: (titleID: number | null) => void,
    titleUpdated: boolean,
    setTitleUpdated: (titleUpdated: boolean) => void
};

interface IState {
    // titleID: number | null,
    titleResultsFound: boolean | null,
    titleMessage: string,
    errTitleMessage: string,
    titleData: ITitle | null,
    overallTitleRatingMessage: string,
    errOverallTitleRatingMessage: string,
    overallTitleRatingResultsFound: boolean | null,
    overallTitleRating: number | null,
    overallTitleRatingCount: number,
    categoryMessage: string,
    errCategoryMessage: string,
    categoryResultsFound: boolean | null,
    categoryList: ICategory[],
    categoryName: string,
    editionMessage: string,
    errEditionMessage: string,
    editionResultsFound: boolean | null,
    editionList: IEdition[],
    // mediaMessage: string,
    // errMediaMessage: string,
    // mediaResultsFound: boolean | null,
    // mediaList: IMedia[] | undefined,
    // mediaName: string,
    userReviewMessage: string,
    errUserReviewMessage: string,
    userReviewResultsFound: boolean | null,
    userReviewResultsHaveReviews: boolean,
    userReviewList: IUserReview[],
    userReviewedTitle: boolean,
    userReviewedTitleReviewID: number | null,
    userReviewedTitleRead: boolean | null,
    userReviewedTitleDateRead: Date | null
};

class Title extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            // titleID: null,
            titleMessage: "",
            errTitleMessage: "",
            titleResultsFound: null,
            titleData: null,
            overallTitleRatingMessage: "",
            errOverallTitleRatingMessage: "",
            overallTitleRatingResultsFound: null,
            overallTitleRating: null,
            overallTitleRatingCount: 0,
            categoryMessage: "",
            errCategoryMessage: "",
            categoryResultsFound: null,
            categoryList: [],
            categoryName: "",
            editionMessage: "",
            errEditionMessage: "",
            editionResultsFound: null,
            editionList: [],
            // mediaMessage: "",
            // errMediaMessage: "",
            // mediaResultsFound: null,
            // mediaList: [],
            // mediaName: "",
            userReviewMessage: "",
            errUserReviewMessage: "",
            userReviewResultsFound: null,
            userReviewResultsHaveReviews: false,
            userReviewList: [],
            userReviewedTitle: false,
            userReviewedTitleReviewID: null,
            userReviewedTitleRead: null,
            userReviewedTitleDateRead: null
        };

        // this.getTitle = this.getTitle.bind(this);
        // this.getEditions = this.getEditions.bind(this);

    };

    getTitle = () => {
        // console.log("Title.tsx getTitle");
        // console.log("Title.tsx getTitle baseURL", baseURL);

        this.setState({titleMessage: ""});
        this.setState({errTitleMessage: ""});
        // this.setState({userReviewedTitle: false});
        this.setState({titleResultsFound: null});
        this.setState({titleData: null});
        this.setState({categoryMessage: ""});
        this.setState({errCategoryMessage: ""});
        this.setState({categoryResultsFound: null});
        this.setState({categoryList: []});
        this.setState({categoryName: ""});
        this.setState({editionMessage: ""});
        this.setState({errEditionMessage: ""});
        this.setState({editionResultsFound: null});
        this.setState({editionList: []});
        // this.setState({mediaMessage: ""});
        // this.setState({errMediaMessage: ""});
        // this.setState({mediaResultsFound: null});
        // this.setState({mediaList: []});
        // this.setState({mediaName: ""});
        this.setState({userReviewMessage: ""});
        this.setState({errUserReviewMessage: ""});
        this.setState({userReviewResultsFound: null});
        this.setState({userReviewResultsHaveReviews: false});
        this.setState({userReviewList: []});
        this.setState({userReviewedTitle: false});
        this.setState({userReviewedTitleReviewID: null});
        this.setState({userReviewedTitleRead: null});
        this.setState({userReviewedTitleDateRead: null});

        let url: string = baseURL + "title/";

        // if (this.state.titleID !== null) {
        //     url = url + this.state.titleID;
        // };

        if (this.props.titleID !== null) {
            url = url + this.props.titleID;

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

                if (data.resultsFound === true) {
                    // this.setState({titleList: data.titles});
                    this.setState({titleData: data.titles[0]});

                    this.setState({categoryList: data.titles[0].category});
                    // console.log("Title.tsx getTitle this.state.categoryList", this.state.categoryList);

                    if (this.state.categoryList !== undefined && this.state.categoryList !== null) {

                        this.setState({categoryResultsFound: true});
                        // this.setState({categoryMessage: "Successfully retrieved categories."});
                        this.setState({categoryName: data.titles[0].category.category});

                        // categoryList is an object not an array if there is only one value in the data from the fetch?
                        // if (this.state.categoryList.length > 0) {
                        //     this.setState({categoryResultsFound: true});
                        //     this.setState({categoryMessage: "Successfully retrieved categories."});
                        //     this.setState({categoryName: data.titles[0].category[0].category});
                        // } else {
                        //     this.setState({categoryResultsFound: false});
                        //     this.setState({categoryMessage: "No categories found."});
                        //     this.setState({errCategoryMessage: "No categories found."});
                        // };
                    } else {
                        this.setState({categoryResultsFound: false});
                        // this.setState({categoryMessage: "No categories found."});
                        // this.setState({errCategoryMessage: "No categories found."});
                    };

                    this.setState({editionList: data.titles[0].editions});
                    // console.log("Title.tsx getTitle this.state.editionList", this.state.editionList);

                    if (this.state.editionList !== undefined && this.state.editionList !== null) {
                        if (this.state.editionList.length > 0) {
                            this.setState({editionResultsFound: true});
                            // this.setState({editionMessage: "Successfully retrieved editions."});

                            for (let i = 0; i < this.state.editionList.length; i++) {
                                // console.log("Title.tsx getTitle this.state.editionList[i]", this.state.editionList[i]);
                                // console.log("Title.tsx getTitle this.state.editionList[i].medium", this.state.editionList[i].medium);
                                // console.log("Title.tsx getTitle data.titles[0].editions[i].medium.media", data.titles[0].editions[i].medium.media);

                                Object.assign(this.state.editionList[i], {mediaName: data.titles[0].editions[i].medium.media});

                                // console.log("Title.tsx getTitle this.state.editionList[i]", this.state.editionList[i]);

                                // this.setState({mediaList: this.state.editionList[i].medium});
                                // if (this.state.mediaList !== undefined && this.state.mediaList !== null) {
                                //     console.log("Title.tsx getTitle this.state.mediaList", this.state.mediaList);
                                //     // console.log("Title.tsx getTitle this.state.mediaList.media", this.state.mediaList.media);
                                // };
                            };

                        } else {
                            this.setState({editionResultsFound: false});
                            // this.setState({editionMessage: "No editions found."});
                            // this.setState({errEditionMessage: "No editions found."});
                        };
                    };

                    this.setState({userReviewList: data.titles[0].userReviews});

                    if (this.state.userReviewList !== undefined && this.state.userReviewList !== null) {
                        if (this.state.userReviewList.length > 0) {
                            this.setState({userReviewResultsFound: true});
                            // this.setState({userReviewMessage: "Successfully retrieved user reviews."});

                            for (let i = 0; i < this.state.userReviewList.length; i++) {

                                // console.log("Title.tsx getTitle this.state.userReviewList[i]", this.state.userReviewList[i]);

                                // console.log("Titles.tsx getTitle data.titles[0].userReviews[i].user.firstName", data.titles[0].userReviews[i].user.firstName);
                                // console.log("Titles.tsx getTitle data.titles[0].userReviews[i].user.lastName", data.titles[0].userReviews[i].user.lastName);

                                // if (this.state.userReviewList[i].user !== undefined) {
                                //     console.log("Titles.tsx getTitle this.state.userReviewList[i].user.firstName", this.state.userReviewList[i].user.firstName);
                                //     console.log("Titles.tsx getTitle this.state.userReviewList[i].user.lastName", this.state.userReviewList[i].user.lastName);
                                // };

                                Object.assign(this.state.userReviewList[i], {userFirstName: data.titles[0].userReviews[i].user.firstName});
                                Object.assign(this.state.userReviewList[i], {userLastName: data.titles[0].userReviews[i].user.lastName});

                                // console.log("Title.tsx getTitle this.state.userReviewList[i]", this.state.userReviewList[i]);

                                if (this.state.userReviewList[i].rating !== null || (this.state.userReviewList[i].shortReview !== null && this.state.userReviewList[i].shortReview !== "") || (this.state.userReviewList[i].longReview !== null && this.state.userReviewList[i].longReview !== "")) {
                                    // Only handles the case in which all the reviews for a title don't have a rating, shortReview or longReview
                                    this.setState({userReviewResultsHaveReviews: true});
                                };

                                if (this.props.userID === this.state.userReviewList[i].userID) {
                                    this.setState({userReviewedTitle: true});
                                    this.setState({userReviewedTitleReviewID: this.state.userReviewList[i].reviewID});
                                    this.setState({userReviewedTitleRead: this.state.userReviewList[i].read});
                                    this.setState({userReviewedTitleDateRead: this.state.userReviewList[i].dateRead});
                                };

                                // console.log("Titles.tsx getTitle this.state.userReviewedTitle", this.state.userReviewedTitle);
                                // console.log("Titles.tsx getTitle this.state.userReviewedTitleReviewID", this.state.userReviewedTitleReviewID);
                                // console.log("Titles.tsx getTitle this.state.userReviewResultsHaveReviews", this.state.userReviewResultsHaveReviews);

                            };

                        } else {
                            this.setState({userReviewResultsFound: false});
                            // this.setState({userReviewMessage: "No user reviews found."});
                            // this.setState({errUserReviewMessage: "No user reviews found."});
                        };
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

    getTitleRating = () => {
        // console.log("Title.tsx getTitleRating");
        // console.log("Title.tsx getTitleRating baseURL", baseURL);

        this.setState({overallTitleRatingMessage: ""});
        this.setState({errOverallTitleRatingMessage: ""});
        this.setState({overallTitleRatingResultsFound: null});
        this.setState({overallTitleRating: null});
        this.setState({overallTitleRatingCount: 0});

        let url: string = baseURL + "userreview/";

        // if (this.state.titleID !== null) {
        //     url = url + this.state.titleID;
        // };

        if (this.props.titleID !== null) {
            url = url + "rating/" + this.props.titleID;

            // console.log("Title.tsx getTitleRating url", url);

            fetch(url)
            .then(response => {
                // console.log("Title.tsx getTitleRating response", response);
                if (!response.ok) {
                    throw Error(response.status + " " + response.statusText + " " + response.url);
                } else {
                    return response.json();
                };
            })
            .then(data => {
                // console.log("Title.tsx getTitleRating data", data);

                this.setState({overallTitleRatingResultsFound: data.resultsFound});
                // this.setState({overallTitleRatingMessage: data.message});

                if (data.resultsFound === true) {
                    // console.log("Title.tsx getTitleRating data.userReviews[0].userReviewCount", data.userReviews[0].userReviewCount);
                    // console.log("Title.tsx getTitleRating data.userReviews[0].userReviewSum", data.userReviews[0].userReviewSum);

                    // let userReviewCount: number = data.userReviews[0].userReviewCount;
                    this.setState({overallTitleRatingCount: data.userReviews[0].userReviewCount});

                    if (this.state.overallTitleRatingCount > 0) {

                        let userReviewSum: number = data.userReviews[0].userReviewSum;
                        // Check for division by zero?
                        // let userReviewAverage: number = userReviewSum/0;
                        let userReviewAverage: number = userReviewSum/this.state.overallTitleRatingCount;

                        // console.log("Title.tsx getTitleRating userReviewCount", userReviewCount);
                        // console.log("Title.tsx getTitleRating this.state.overallTitleRatingCount", this.state.overallTitleRatingCount);
                        // console.log("Title.tsx getTitleRating userReviewSum", userReviewSum);
                        // console.log("Title.tsx getTitleRating userReviewAverage", userReviewAverage);

                        this.setState({overallTitleRating: userReviewAverage});
                    };

                } else {
                    this.setState({errOverallTitleRatingMessage: data.message});
                };

            })
            .catch(error => {
                console.log("Title.tsx getTitleRating error", error);
                // console.log("Title.tsx getTitleRating error.name", error.name);
                // console.log("Title.tsx getTitleRating error.message", error.message);
                this.setState({errOverallTitleRatingMessage: error.name + ": " + error.message});
            });

        };

    };

    componentDidMount() {
        this.getTitle();
        this.getTitleRating();
        // this.getEditions();
        // this.getUserReviews();
    };

    componentDidUpdate(prevProps: IProps) {
        if (this.props.titleID !== prevProps.titleID) {
            // console.log("Title.tsx componentDidUpdate prevProps.titleID", prevProps.titleID);
            // console.log("Title.tsx componentDidUpdate this.props.titleID", this.props.titleID);
            this.getTitle();
            this.getTitleRating();
        };

        if (this.props.titleUpdated !== prevProps.titleUpdated) {
            // console.log("Title.tsx componentDidUpdate prevProps.titleUpdated", prevProps.titleUpdated);
            // console.log("Title.tsx componentDidUpdate this.props.titleUpdated", this.props.titleUpdated);
            this.getTitle();
            this.getTitleRating();
        };
    };

    // Needed anymore now that this.props.titleUpdated was created? 
    // titleUpdated = () => {
    //     this.getTitle();
    //     this.getTitleRating();
    //     // this.getEditions();
    //     // this.getUserReviews();
    // };

    userReviewUpdated = () => {
        this.getTitle();
        this.getTitleRating();
        // this.getEditions();
        // this.getUserReviews();
    };

    editionUpdated = () => {
        this.getTitle();
        this.getTitleRating();
        // this.getEditions();
        // this.getUserReviews();
    };

    render() {

        return(
            <Grid container spacing={2}>
                <Grid item xs={12}>
                {this.state.titleMessage !== "" ? <Alert severity="info">{this.state.titleMessage}</Alert> : null}
                {this.state.errTitleMessage !== "" ? <Alert severity="error">{this.state.errTitleMessage}</Alert> : null}
                {this.state.overallTitleRatingMessage !== "" ? <Alert severity="info">{this.state.overallTitleRatingMessage}</Alert> : null}
                {this.state.errOverallTitleRatingMessage !== "" ? <Alert severity="error">{this.state.errOverallTitleRatingMessage}</Alert> : null}
                {this.state.categoryMessage !== "" ? <Alert severity="info">{this.state.categoryMessage}</Alert> : null}
                {this.state.errCategoryMessage !== "" ? <Alert severity="error">{this.state.errCategoryMessage}</Alert> : null}
                {this.state.titleResultsFound !== null ? <TitleDisplay userID={this.props.userID} isAdmin={this.props.isAdmin} sessionToken={this.props.sessionToken} titleID={this.props.titleID} setTitleID={this.props.setTitleID} userReviewUpdated={this.userReviewUpdated} userReviewedTitle={this.state.userReviewedTitle} userReviewedTitleReviewID={this.state.userReviewedTitleReviewID} userReviewedTitleRead={this.state.userReviewedTitleRead} userReviewedTitleDateRead={this.state.userReviewedTitleDateRead} titleData={this.state.titleData} overallTitleRating={this.state.overallTitleRating} overallTitleRatingCount={this.state.overallTitleRatingCount} categoryName={this.state.categoryName} /*titleUpdated={this.titleUpdated}*/ titleUpdated={this.props.titleUpdated} setTitleUpdated={this.props.setTitleUpdated} editionUpdated={this.editionUpdated} /> : null}
                </Grid>
                <Grid item xs={10}>
                {this.state.editionMessage !== "" ? <Alert severity="info">{this.state.editionMessage}</Alert> : null}
                {this.state.errEditionMessage !== "" ? <Alert severity="error">{this.state.errEditionMessage}</Alert> : null}
                {/* {this.state.mediaMessage !== "" ? <Alert severity="info">{this.state.mediaMessage}</Alert> : null}
                {this.state.errMediaMessage !== "" ? <Alert severity="error">{this.state.errMediaMessage}</Alert> : null} */}
                {this.state.editionResultsFound ? <Edition userID={this.props.userID} isAdmin={this.props.isAdmin} sessionToken={this.props.sessionToken} titleID={this.props.titleID} editionList={this.state.editionList} /*mediaName={this.state.mediaName}*/ editionUpdated={this.editionUpdated}  /> : null}
                </Grid>
                <Grid item xs={10}>
                {this.state.userReviewMessage !== "" ? <Alert severity="info">{this.state.userReviewMessage}</Alert> : null}
                {this.state.errUserReviewMessage !== "" ? <Alert severity="error">{this.state.errUserReviewMessage}</Alert> : null}
                {this.state.userReviewResultsFound && this.state.userReviewResultsHaveReviews ? <UserReview userID={this.props.userID} isAdmin={this.props.isAdmin} sessionToken={this.props.sessionToken} titleID={this.props.titleID} userReviewUpdated={this.userReviewUpdated} userReviewList={this.state.userReviewList} /> : null}
                </Grid>
                <Grid item xs={10}>
                {this.props.sessionToken !== "" && this.state.userReviewedTitle === false ? <AddUserReview userID={this.props.userID} isAdmin={this.props.isAdmin} sessionToken={this.props.sessionToken} titleID={this.props.titleID} userReviewUpdated={this.userReviewUpdated} /> : null}
                </Grid>
            </Grid>
        );
    };

};

export default Title;