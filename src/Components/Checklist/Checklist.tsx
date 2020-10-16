import React, {Component} from "react";

import {Alert} from "@material-ui/lab/";
import {Grid, Button, Drawer} from "@material-ui/core";

import {ITitle, IUserReview} from "../../Helpers/interfaces";
import {baseURL} from "../../Helpers/constants";
import ChecklistItem from "./ChecklistItem";
import ChecklistItem2 from "./ChecklistItem2";

interface IProps {
    userID: number | null,
    isAdmin: boolean,
    sessionToken: string | null,
    titleID: number | null,
    setTitleID: (titleID: number | null) => void,
    categoryID: number | null,
    setCategoryID: (categoryID: number | null) => void,
    titleSort: string | null
    setTitleSort: (titleSort: string | null) => void,
    titleUpdated: boolean
};

interface IState {
    drawerOpen: boolean,
    checklistMessage: string,
    errChecklistMessage: string,
    checklistResultsFound: boolean | null,
    checklistRecordUpdated: boolean | null,
    checklistList: ITitle[],
    categoryName: string,
    userReviewList: IUserReview[]
};

class Checklist extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            drawerOpen: false,
            checklistMessage: "",
            errChecklistMessage: "",
            checklistResultsFound: null,
            checklistRecordUpdated: null,
            checklistList: [],
            categoryName: "",
            userReviewList: []
        };

    };

    getChecklist = () => {
        // console.log("Checklist.tsx getChecklist");
        // console.log("Checklist.tsx getChecklist baseURL", baseURL);

        this.setState({checklistMessage: ""});
        this.setState({errChecklistMessage: ""});
        this.setState({checklistResultsFound: null});
        this.setState({checklistList: []});
        this.setState({categoryName: ""});
        this.setState({userReviewList: []});

        // console.log("Checklist.tsx getChecklist this.props.userID", this.props.userID);
        // console.log("Checklist.tsx getChecklist this.props.sessionToken", this.props.sessionToken);
        // console.log("Checklist.tsx getChecklist this.props.categoryID", this.props.categoryID);

        let url: string = baseURL + "title/checklist/";

        // Don"t show all titles when there is no categoryID?
        if (this.props.categoryID !== undefined && this.props.categoryID !== null) {
            url = url + this.props.categoryID;

            if (this.props.titleSort !== undefined && this.props.titleSort !== null) {
                // url = url + "/" + "publicationDate";
                url = url + "/" + this.props.titleSort;
            };

            // console.log("Checklist.tsx getChecklist url", url);

            if (this.props.sessionToken !== null) {

                fetch(url, {
                    method: "GET",
                    headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": this.props.sessionToken
                    }),
                })
                .then(response => {
                    // console.log("Checklist.tsx getChecklist response", response);
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
                    // console.log("Checklist.tsx getChecklist data", data);

                    // let titleResponse: IGetResponse = data;
                    // console.log("Checklist.tsx getChecklist titleResponse", titleResponse);

                    this.setState({checklistResultsFound: data.resultsFound});
                    // this.setState({checklistMessage: data.message});

                    if (data.resultsFound === true) {
                        this.setState({checklistList: data.titles});
                        // console.log("Checklist.tsx getChecklist checklistList", this.state.checklistList);

                        if (data.titles[0].category !== undefined && data.titles[0].category !== null) {
                            this.setState({categoryName: data.titles[0].category.category});
                        };

                        if (this.state.checklistList !== undefined && this.state.checklistList !== null) {
                            if (this.state.checklistList.length > 0) {

                                for (let i = 0; i < this.state.checklistList.length; i++) {

                                    // console.log("Checklist.tsx getChecklist data.titles[i].userReviews", data.titles[i].userReviews);
                                    this.setState({userReviewList: data.titles[i].userReviews});

                                    if (this.state.userReviewList !== undefined && this.state.userReviewList !== null) {
                                        if (this.state.userReviewList.length > 0) {

                                            for (let j = 0; j < this.state.userReviewList.length; j++) {

                                                // console.log("Checklist.tsx getChecklist this.state.checklistList[i]", this.state.checklistList[i]);

                                                // console.log("Checklist.tsx getChecklist data.titles[i].userReviews[j].reviewID", data.titles[i].userReviews[j].reviewID);
                                                // console.log("Checklist.tsx getChecklist data.titles[i].userReviews[j].read", data.titles[i].userReviews[j].read);
                                                // console.log("Checklist.tsx getChecklist data.titles[i].userReviews[j].dateRead", data.titles[i].userReviews[j].dateRead);

                                                Object.assign(this.state.checklistList[i], {reviewID: data.titles[i].userReviews[j].reviewID});
                                                Object.assign(this.state.checklistList[i], {read: data.titles[i].userReviews[j].read});
                                                Object.assign(this.state.checklistList[i], {dateRead: data.titles[i].userReviews[j].dateRead});

                                                // console.log("Checklist.tsx getChecklist this.state.checklistList[i]", this.state.checklistList[i]);

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
                    console.log("Checklist.tsx getChecklist error", error);
                    // console.log("Checklist.tsx getChecklist error.name", error.name);
                    // console.log("Checklist.tsx getChecklist error.message", error.message);
                    this.setState({errChecklistMessage: error.name + ": " + error.message});
                });
            };
        };

    };

    updateChecklist = (titleID: number, read: boolean | undefined, reviewID?: number) => {
        // console.log("Checklist.tsx updateChecklist");
        // this.setState({message: "form submitted"});

        // console.log("Checklist.tsx updateChecklist titleID", titleID);
        // console.log("Checklist.tsx updateChecklist read", read);
        // console.log("Checklist.tsx updateChecklist reviewID", reviewID);

        this.setState({checklistMessage: ""});
        this.setState({errChecklistMessage: ""});
        this.setState({checklistRecordUpdated: null});

        // If read is false and there are no other values in the userReviews table, should the record be deleted?
        let userReviewObject = {
            titleID: titleID,
            read: read,
            active: true // always true?
        };

        // console.log("Checklist.tsx updateChecklist userReviewObject", userReviewObject);

        let url: string = baseURL + "userreview/";
        let updateChecklistMethod: string = "";

        if (reviewID !== undefined && reviewID !== null) {
            url = url + reviewID;
            updateChecklistMethod = "PUT";
        } else {
            updateChecklistMethod = "POST";
        };

        // console.log("Checklist.tsx updateChecklist url", url);
        // console.log("Checklist.tsx updateChecklist updateChecklistMethod", updateChecklistMethod);

        if (this.props.sessionToken !== null) {

            fetch(url, {
                method: updateChecklistMethod,
                headers:    new Headers ({
                    "Content-Type": "application/json",
                    "Authorization": this.props.sessionToken
                }),
                body: JSON.stringify({userReview: userReviewObject})
            })
            .then(response => {
                // console.log("Checklist.tsx updateChecklist response", response);
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
                // console.log("Checklist.tsx updateChecklist data", data);

                if (updateChecklistMethod === "PUT") {
                    this.setState({checklistRecordUpdated: data.recordUpdated});
                } else if (updateChecklistMethod === "POST") {
                    this.setState({checklistRecordUpdated: data.recordAdded});
                } else {
                    this.setState({checklistRecordUpdated: null});
                };

                this.setState({checklistMessage: data.message});

                if (this.state.checklistRecordUpdated === true) {

                    // Need to update this component after this function runs
                    // Need to update the state to do it
                    this.updateChecklistItemRead(titleID);

                    // Need to update the other components after this function runs
                    // this.props.userReviewUpdated();

                } else {
                    this.setState({errChecklistMessage: data.message});
                };

            })
            .catch(error => {
                console.log("Checklist.tsx updateChecklist error", error);
                // console.log("Checklist.tsx updateChecklist error.name", error.name);
                // console.log("Checklist.tsx updateChecklist error.message", error.message);
                this.setState({errChecklistMessage: error.name + ": " + error.message});
            });

        };

    };

    updateChecklistItemRead = (titleID: number) => {
        // console.log("Checklist.tsx updateChecklistItemRead");

        let newChecklistList = this.state.checklistList.slice();
        // console.log("Checklist.tsx updateChecklistItemRead newChecklistList", newChecklistList);

        for (let i = 0; i < newChecklistList.length; i++) {
            if (newChecklistList[i].titleID === titleID) {
                // console.log("Checklist.tsx updateChecklistItemRead checked titleID", titleID);
                // console.log("Checklist.tsx updateChecklistItemRead newChecklistList[i].titleName", newChecklistList[i].titleName);
                // console.log("Checklist.tsx updateChecklistItemRead newChecklistList[i].read", newChecklistList[i].read);
    
                newChecklistList[i].read = !newChecklistList[i].read;

                // console.log("Checklist.tsx updateChecklistItemRead newChecklistList[i].titleName", newChecklistList[i].titleName);
                // console.log("Checklist.tsx updateChecklistItemRead newChecklistList[i].read", newChecklistList[i].read);
            };
        };

        this.setState({checklistList: newChecklistList});
        // console.log("Checklist.tsx updateChecklistItemRead newChecklistList", newChecklistList);

    };
    
    componentDidMount() {
        this.getChecklist();
    };

    componentDidUpdate(prevProps: IProps) {
        if (this.props.categoryID !== prevProps.categoryID) {
            // console.log("Checklist.tsx componentDidUpdate prevProps.categoryID", prevProps.categoryID);
            // console.log("Checklist.tsx componentDidUpdate this.props.categoryID", this.props.categoryID);
            this.getChecklist();
        };

        if (this.props.titleSort !== prevProps.titleSort) {
            // console.log("Checklist.tsx componentDidUpdate prevProps.titleSort", prevProps.titleSort);
            // console.log("Checklist.tsx componentDidUpdate this.props.titleSort", this.props.titleSort);
            this.getChecklist();
        };

        if (this.props.titleID !== prevProps.titleID) {
            // console.log("Checklist.tsx componentDidUpdate prevProps.titleID", prevProps.titleID);
            // console.log("Checklist.tsx componentDidUpdate this.props.titleID", this.props.titleID);

            this.getChecklist();
        };

        if (this.props.titleUpdated !== prevProps.titleUpdated) {
            // console.log("Checklist.tsx componentDidUpdate prevProps.titleUpdated", prevProps.titleUpdated);
            // console.log("Checklist.tsx componentDidUpdate this.props.titleUpdated", this.props.titleUpdated);

            this.getChecklist();
        };
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
                <Button variant="text" color="primary" onClick={this.handleOpen}>Checklist</Button>
                <Drawer anchor="right" open={this.state.drawerOpen} onClose={this.handleClose}>
                {this.state.checklistMessage !== "" ? <Alert severity="info">{this.state.checklistMessage}</Alert> : null}
                {this.state.errChecklistMessage !== "" ? <Alert severity="error">{this.state.errChecklistMessage}</Alert> : null}
                <Button variant="text" color="primary" onClick={this.handleClose}>Close</Button>
                {/* <ChecklistItem checklistList={this.state.checklistList} updateChecklist={this.updateChecklist} setTitleID={this.props.setTitleID} categoryName={this.state.categoryName} titleSort={this.props.titleSort} setTitleSort={this.props.setTitleSort} /> */}
                <ChecklistItem2 checklistList={this.state.checklistList} updateChecklist={this.updateChecklist} setTitleID={this.props.setTitleID} categoryName={this.state.categoryName} titleSort={this.props.titleSort} setTitleSort={this.props.setTitleSort} />
                </Drawer>
                </Grid>

          </Grid>
        );
    };
};

export default Checklist;