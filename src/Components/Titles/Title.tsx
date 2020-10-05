import React, {Component} from "react";
import {ITitle, IEdition, IUserReview} from "../../Helpers/interfaces"
import {baseURL} from "../../Helpers/constants"
import Edition from "../Editions/Edition";
import TitleDisplay from "./TitleDisplay";
import UserReview from "../UserReviews/UserReview";

interface IProps {
    isLoggedIn: boolean | undefined,
    isAdmin: boolean | undefined,
    sessionToken: string,
    titleID: number | undefined
};

interface IState {
    // titleID: number | undefined,
    titleResultsFound: boolean | undefined,
    message: string,
    errMessage: string,
    titleData?: ITitle,
    editionResultsFound: boolean | undefined,
    editionList: IEdition[],
    userReviewResultsFound: boolean | undefined,
    userReviewList: IUserReview[]
};

class Title extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            // titleID: undefined,
            message: "",
            errMessage: "",
            titleResultsFound: undefined,
            editionResultsFound: undefined,
            editionList: [],
            userReviewResultsFound: undefined,
            userReviewList: []
        };

        // this.getTitle = this.getTitle.bind(this);
        // this.getEditions = this.getEditions.bind(this);

    };

    getTitle = () => {
        // console.log("Title.tsx getTitle");
        // console.log("Title.tsx getTitle baseURL", baseURL);

        let url: string = baseURL + "title";

        // if (this.state.titleID !== undefined) {
        //     url = url + "/" + this.state.titleID;
        // };

        if (this.props.titleID !== undefined) {
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
                console.log("Title.tsx getTitle data", data);

                // let titleResponse: IGetResponse = data;
                // console.log("Title.tsx getTitle titleResponse", titleResponse);

                this.setState({titleResultsFound: data.resultsFound});
                this.setState({message: data.message});

                if (data.resultsFound) {
                    // this.setState({titleList: data.titles});
                    this.setState({titleData: data.titles[0]});
                } else {
                    this.setState({errMessage: data.message});
                };

            })
            .catch(error => {
                console.log("Title.tsx getTitle error", error);
                // console.log("Title.tsx getTitle error.name", error.name);
                // console.log("Title.tsx getTitle error.message", error.message);
                this.setState({errMessage: error.name + ": " + error.message});
            });

        };

    };

    getEditions = () => {
        // console.log("Titles.tsx getEditions");
        // console.log("Titles.tsx getEditions baseURL", baseURL);

        // console.log('Titles.tsx getEditions titleID', titleID);
        // this.setState({titleID: titleID});

        let url: string = baseURL + "edition";

        // if (this.state.titleID !== undefined) {
        //     url = url + "/title/" + this.state.titleID;
        // };

        // if (titleID !== undefined) {
        //     url = url + "/title/" + titleID;
        // };

        if (this.props.titleID !== undefined) {
            url = url + "/" + this.props.titleID;

            // console.log("Titles.tsx getEditions url", url);

            fetch(url)
            .then(response => {
                // console.log("Titles.tsx getEditions response", response);
                if (!response.ok) {
                    throw Error(response.status + " " + response.statusText + " " + response.url);
                } else {
                    return response.json();
                };
            })
            .then(data => {
                console.log("Titles.tsx getEditions data", data);

                // let editionResponse: IGetResponse = data;
                // console.log("Titles.tsx getEditions titleResponse", titleResponse);

                this.setState({editionResultsFound: data.resultsFound});
                this.setState({message: data.message});

                if (data.resultsFound) {
                    this.setState({editionList: data.editions});
                } else {
                    this.setState({errMessage: data.message});
                };

            })
            .catch(error => {
                console.log("Titles.tsx getEditions error", error);
                // console.log("Titles.tsx getEditions error.name", error.name);
                // console.log("Titles.tsx getEditions error.message", error.message);
                this.setState({errMessage: error.name + ": " + error.message});
            });

        };

    };

    getUserReviews = () => {
        // console.log("UserReviews.tsx getUserReviews");
        // console.log("UserReviews.tsx getUserReviews baseURL", baseURL);

        let url: string = baseURL + "userreview";

        if (this.props.titleID !== undefined) {
            url = url + "/title/" + this.props.titleID;

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

    };

    componentDidMount() {
        this.getTitle();
        this.getEditions();
        this.getUserReviews();
      };

    render() {

        return(
            <div>
                {this.state.message !== "" ? <p>{this.state.message}</p> : null}
                {this.state.errMessage !== "" ? <p>{this.state.errMessage}</p> : null}

                {this.state.titleData !== undefined ? <TitleDisplay titleData={this.state.titleData}/> : null}
                <div>
                {this.state.editionResultsFound ? <Edition editionList={this.state.editionList} /> : null}
                </div>
                <div>
                {this.state.userReviewResultsFound ? <UserReview userReviewList={this.state.userReviewList} /> : null}
                </div>
            </div>
        );
    };

};

export default Title;