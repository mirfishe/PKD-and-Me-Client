import React, {Component} from "react";

import {Alert} from '@material-ui/lab/';
import {Grid} from '@material-ui/core';

import {ICategory, ITitle} from "../../Helpers/interfaces"
import {baseURL} from "../../Helpers/constants"
import About from "./About";
import Category from "../Categories/Category";
import Title from "../Titles/Title";
import TitleItem from "../Titles/TitleItem";

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
    titleList: ITitle[]
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
            titleList: []
        };

        // this.getCategories = this.getCategories.bind(this);
        // this.getTitles = this.getTitles.bind(this);

    };

    getCategories = () => {
        // console.log("Home.tsx getCategories");
        // console.log("Home.tsx getCategories baseURL", baseURL);

        this.setState({categoryMessage: ""});
        this.setState({errCategoryMessage: ""});

        this.props.setTitleID(null);

        let url: string = baseURL + "category";

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

            if (data.resultsFound) {
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

        // console.log("Home.tsx getTitles this.props.titleID", this.props.titleID);
        this.props.setTitleID(null);

        // console.log("Home.tsx getTitles categoryID", categoryID);
        this.setState({categoryID: categoryID});

        let url: string = baseURL + "title";

        // if (this.state.categoryID !== null) {
        //     url = url + "/category/" + this.state.categoryID;
        // };

        if (categoryID) {
            url = url + "/category/" + categoryID;
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

            if (data.resultsFound) {
                this.setState({titleList: data.titles});
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

    // getEditions = (titleID?: number) => {
    //     // console.log("Titles.tsx getEditions");
    // };
    
    componentDidMount() {
        this.getCategories();
      };

    render() {

        return(
            <Grid container>
                <Grid item xs={2}>
                {this.state.categoryMessage !== "" ? <Alert severity="info">{this.state.categoryMessage}</Alert> : null}
                {this.state.errCategoryMessage !== "" ? <Alert severity="error">{this.state.errCategoryMessage}</Alert> : null}
                {this.state.categoryResultsFound !== null ? <Category getTitles={this.getTitles} categoryList={this.state.categoryList} /> : null}
                </Grid>

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