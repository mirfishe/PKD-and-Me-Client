import React, {Component} from "react";

import {Alert} from '@material-ui/lab/';
import {Grid, Button, Drawer} from '@material-ui/core';

import {ICategory, ITitle, IUserReview} from "../../Helpers/interfaces"
import {baseURL} from "../../Helpers/constants"
import About from "./About";
import Category from "../Categories/Category";
import Title from "../Titles/Title";
import TitleItem from "../Titles/TitleItem";
import ChecklistItem from "../Checklist/ChecklistItem"

interface IProps {
    userID: number | null,
    isLoggedIn: boolean | null,
    isAdmin: boolean | null,
    sessionToken: string,
    titleID: number | null,
    setTitleID: (titleID: number | null) => void
};

interface IState {
    categoryMessage: string,
    errCategoryMessage: string,
    categoryResultsFound: boolean | null,
    categoryList: ICategory[],
    categoryID: number | null | undefined,
    titleMessage: string,
    errTitleMessage: string,
    titleResultsFound: boolean | null,
    titleList: ITitle[],
    drawerOpen: boolean,
    checklistMessage: string,
    errChecklistMessage: string,
    checklistResultsFound: boolean | null,
    checklistRecordUpdated: boolean | null,
    checklistList: ITitle[],
    userReviewList: IUserReview[]
};

class Home extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            categoryMessage: "",
            errCategoryMessage: "",
            categoryResultsFound: null,
            categoryList: [],
            categoryID: null,
            titleMessage: "",
            errTitleMessage: "",
            titleResultsFound: null,
            titleList: [],
            drawerOpen: false,
            checklistMessage: "",
            errChecklistMessage: "",
            checklistResultsFound: null,
            checklistRecordUpdated: null,
            checklistList: [],
            userReviewList: []
        };

        // this.getCategories = this.getCategories.bind(this);
        // this.getTitles = this.getTitles.bind(this);

    };

    getCategories = () => {
        // console.log("Home.tsx getCategories");
        // console.log("Home.tsx getCategories baseURL", baseURL);

        this.setState({categoryMessage: ""});
        this.setState({errCategoryMessage: ""});
        this.setState({categoryResultsFound: null});

        this.props.setTitleID(null);

        let url: string = baseURL + "category/";

        fetch(url)
        .then(response => {
            // console.log("Home.tsx getCategories response", response);
            if (!response.ok) {
                throw Error(response.status + " " + response.statusText + " " + response.url);
            } else {
                return response.json();
            };
        })
        .then(data => {
            // console.log("Home.tsx getCategories data", data);

            // let categoryResponse: IGetResponse = data;
            // console.log("Home.tsx getCategories categoryResponse", categoryResponse);

            this.setState({categoryResultsFound: data.resultsFound});
            // this.setState({categoryMessage: data.message});

            if (data.resultsFound === true) {
                // Would like to remove categories that don't have titles associated with them
                // if (data.categories.titles.length > 0) {
                    this.setState({categoryList: data.categories});
                // };
            } else {
                this.setState({errCategoryMessage: data.message});
            };

        })
        .catch(error => {
            console.log("Home.tsx getCategories error", error);
            // console.log("Home.tsx getCategories error.name", error.name);
            // console.log("Home.tsx getCategories error.message", error.message);
            this.setState({errCategoryMessage: error.name + ": " + error.message});
        });

    };

    getTitles = (categoryID?: number) => {
        // console.log("Home.tsx getTitles");
        // console.log("Home.tsx getTitles baseURL", baseURL);

        this.setState({titleMessage: ""});
        this.setState({errTitleMessage: ""});
        this.setState({titleResultsFound: null});

        // console.log("Home.tsx getTitles this.props.titleID", this.props.titleID);
        this.props.setTitleID(null);

        // console.log("Home.tsx getTitles categoryID", categoryID);
        this.setState({categoryID: categoryID});

        let url: string = baseURL + "title/";

        // if (this.state.categoryID !== null) {
        //     url = url + "/category/" + this.state.categoryID;
        // };

        if (categoryID) {
            url = url + "category/" + categoryID;
        };

        // console.log("Home.tsx getTitles url", url);

        fetch(url)
        .then(response => {
            // console.log("Home.tsx getTitles response", response);
            if (!response.ok) {
                throw Error(response.status + " " + response.statusText + " " + response.url);
            } else {
                return response.json();
            };
        })
        .then(data => {
            // console.log("Home.tsx getTitles data", data);

            // let titleResponse: IGetResponse = data;
            // console.log("Home.tsx getTitles titleResponse", titleResponse);

            this.setState({titleResultsFound: data.resultsFound});
            // this.setState({titleMessage: data.message});

            if (data.resultsFound === true) {
                this.setState({titleList: data.titles});

                this.getChecklist();

            } else {
                this.setState({errTitleMessage: data.message});
            };

        })
        .catch(error => {
            console.log("Home.tsx getTitles error", error);
            // console.log("Home.tsx getTitles error.name", error.name);
            // console.log("Home.tsx getTitles error.message", error.message);
            this.setState({errTitleMessage: error.name + ": " + error.message});
        });

    };

    getChecklist = () => {
        // console.log("Home.tsx getChecklist");
        // console.log("Home.tsx getChecklist baseURL", baseURL);

        this.setState({checklistMessage: ""});
        this.setState({errChecklistMessage: ""});
        this.setState({checklistResultsFound: null});

        // console.log("Home.tsx getChecklist this.props.categoryID", this.state.categoryID);

        let url: string = baseURL + "title/";

        if (this.state.categoryID !== undefined && this.state.categoryID !== null) {
            url = url + "checklist/" + this.state.categoryID;

            // console.log("Home.tsx getChecklist url", url);

            fetch(url, {
                method: "GET",
                headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": this.props.sessionToken
                }),
            })
            .then(response => {
                // console.log("Home.tsx getChecklist response", response);
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
                // console.log("Home.tsx getChecklist data", data);

                // let titleResponse: IGetResponse = data;
                // console.log("Home.tsx getChecklist titleResponse", titleResponse);

                this.setState({checklistResultsFound: data.resultsFound});
                // this.setState({checklistMessage: data.message});

                if (data.resultsFound === true) {
                    this.setState({checklistList: data.titles});
                    // console.log("Home.tsx getChecklist checklistList", this.state.checklistList);

                    if (this.state.checklistList !== undefined && this.state.checklistList !== null) {
                        if (this.state.checklistList.length > 0) {

                            for (let i = 0; i < this.state.checklistList.length; i++) {

                                // console.log("Home.tsx getChecklist data.titles[i].userReviews", data.titles[i].userReviews);
                                this.setState({userReviewList: data.titles[i].userReviews});

                                if (this.state.userReviewList !== undefined && this.state.userReviewList !== null) {
                                    if (this.state.userReviewList.length > 0) {

                                        for (let j = 0; j < this.state.userReviewList.length; j++) {

                                            // console.log("Home.tsx getChecklist this.state.checklistList[i]", this.state.checklistList[i]);

                                            // console.log("Home.tsx getChecklist data.titles[i].userReviews[j].reviewID", data.titles[i].userReviews[j].reviewID);
                                            // console.log("Home.tsx getChecklist data.titles[i].userReviews[j].read", data.titles[i].userReviews[j].read);
                                            // console.log("Home.tsx getChecklist data.titles[i].userReviews[j].dateRead", data.titles[i].userReviews[j].dateRead);

                                            Object.assign(this.state.checklistList[i], {reviewID: data.titles[i].userReviews[j].reviewID});
                                            Object.assign(this.state.checklistList[i], {read: data.titles[i].userReviews[j].read});
                                            Object.assign(this.state.checklistList[i], {dateRead: data.titles[i].userReviews[j].dateRead});

                                            console.log("Home.tsx getChecklist this.state.checklistList[i]", this.state.checklistList[i]);

                                        };

                                    };
                                };

                            };

                        };
                    };

                } else {
                    this.setState({errChecklistMessage: data.message});
                };

            })
            .catch(error => {
                console.log("Home.tsx getChecklist error", error);
                // console.log("Home.tsx getChecklist error.name", error.name);
                // console.log("Home.tsx getChecklist error.message", error.message);
                this.setState({errChecklistMessage: error.name + ": " + error.message});
            });

        };

    };

    updateChecklist = (titleID: number, read: boolean | undefined, reviewID?: number) => {
        // console.log("Home.tsx updateChecklist");
        // this.setState({message: "form submitted"});

        this.setState({checklistMessage: ""});
        this.setState({errChecklistMessage: ""});
        this.setState({checklistRecordUpdated: null});

        let userReviewObject = {
            titleID: titleID,
            read: read,
            active: true // always true?
        };

        // console.log("Home.tsx updateChecklist userReviewObject", userReviewObject);

        let url: string = baseURL + "userreview/";
        let updateChecklistMethod: string = "";

        if (reviewID !== undefined && reviewID !== null) {
            url = url + reviewID;
            updateChecklistMethod = "PUT";
        } else {
            updateChecklistMethod = "POST";
        };

        // console.log("Home.tsx updateChecklist url", url);
        // console.log("Home.tsx updateChecklist updateChecklistMethod", updateChecklistMethod);

        fetch(url, {
            method: updateChecklistMethod,
            headers:    new Headers ({
                "Content-Type": "application/json",
                "Authorization": this.props.sessionToken
            }),
            body: JSON.stringify({userReview: userReviewObject})
        })
        .then(response => {
            // console.log("Home.tsx updateChecklist response", response);
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
            // console.log("Home.tsx updateChecklist data", data);

            if (updateChecklistMethod === "PUT") {
                this.setState({checklistRecordUpdated: data.recordUpdated});
            } else if (updateChecklistMethod === "POST") {
                this.setState({checklistRecordUpdated: data.recordAdded});
            } else {
                this.setState({checklistRecordUpdated: null});
            };

            this.setState({checklistMessage: data.message});

            if (this.state.checklistRecordUpdated === true) {

                // Need to update this component after this function runs?
                // this.getChecklist();
                // Need to update the other components after this function runs
                // this.props.userReviewUpdated();

            } else {
                this.setState({errChecklistMessage: data.message});
            };

        })
        .catch(error => {
            console.log("Home.tsx updateChecklist error", error);
            // console.log("Home.tsx updateChecklist error.name", error.name);
            // console.log("Home.tsx updateChecklist error.message", error.message);
            this.setState({errChecklistMessage: error.name + ": " + error.message});
        });

    };
    
    componentDidMount() {
        this.getCategories();
      };

    handleOpen = () => {
        this.setState({drawerOpen: true});
    };
    
    handleClose = () => {
        this.setState({drawerOpen: false});
    };

    render() {

        return(
            <Grid container spacing={2}>

                <Grid item xs={2}>
                {this.state.categoryMessage !== "" ? <Alert severity="info">{this.state.categoryMessage}</Alert> : null}
                {this.state.errCategoryMessage !== "" ? <Alert severity="error">{this.state.errCategoryMessage}</Alert> : null}
                {this.state.categoryResultsFound !== null ? <Category getTitles={this.getTitles} categoryList={this.state.categoryList} /> : null}
                </Grid>

                {this.props.isLoggedIn === true && this.state.categoryID !== undefined && this.state.categoryID !== null ?
                <Grid item xs={10}>
                <Button onClick={this.handleOpen}>Checklist</Button>
                <Drawer anchor="right" open={this.state.drawerOpen} onClose={this.handleClose}>
                {this.state.checklistMessage !== "" ? <Alert severity="info">{this.state.checklistMessage}</Alert> : null}
                {this.state.errChecklistMessage !== "" ? <Alert severity="error">{this.state.errChecklistMessage}</Alert> : null}
                <Button onClick={this.handleClose}>Close</Button>
                <ChecklistItem checklistList={this.state.checklistList} updateChecklist={this.updateChecklist} setTitleID={this.props.setTitleID} />
                </Drawer>
                </Grid>
                 : null}

                {this.props.titleID !== null ?
                <Grid item xs={10}>
                <Title userID={this.props.userID} isLoggedIn={this.props.isLoggedIn} isAdmin={this.props.isAdmin} sessionToken={this.props.sessionToken} titleID={this.props.titleID} setTitleID={this.props.setTitleID} />
                </Grid>
                :
                <Grid item xs={10}>
                {this.state.titleMessage !== "" ? <Alert severity="info">{this.state.titleMessage}</Alert> : null}
                {this.state.errTitleMessage !== "" ? <Alert severity="error">{this.state.errTitleMessage}</Alert> : null}
                {this.state.titleResultsFound ? <TitleItem /*getEditions={this.getEditions}*/ titleID={this.props.titleID} setTitleID={this.props.setTitleID} titleList={this.state.titleList} /> : <About />}
                </Grid>
                }

          </Grid>
        );
    };
};

export default Home;