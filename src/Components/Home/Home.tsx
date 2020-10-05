import React, {Component} from "react";

import {Alert} from '@material-ui/lab/';
import {Grid} from '@material-ui/core';

import {ICategory, ITitle} from "../../Helpers/interfaces"
import {baseURL} from "../../Helpers/constants"
import Category from "../Categories/Category";
import Title from "../Titles/Title";
import TitleItem from "../Titles/TitleItem";

interface IProps {
    isLoggedIn: boolean | undefined,
    isAdmin: boolean | undefined,
    sessionToken: string,
    titleID: number | undefined,
    setTitleID: (titleID: number | undefined) => void
};

interface IState {
    message: string,
    errMessage: string,
    categoryResultsFound: boolean | undefined,
    categoryList: ICategory[],
    categoryID: number | undefined,
    titleMessage: string,
    errTitleMessage: string,
    titleResultsFound: boolean | undefined,
    titleList: ITitle[]
};

class Home extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            message: "",
            errMessage: "",
            categoryResultsFound: undefined,
            categoryList: [],
            categoryID: undefined,
            titleMessage: "",
            errTitleMessage: "",
            titleResultsFound: undefined,
            titleList: []
        };

        // this.getCategories = this.getCategories.bind(this);
        // this.getTitles = this.getTitles.bind(this);

    };

    getCategories = () => {
        // console.log("Home.tsx getCategories");
        // console.log("Home.tsx getCategories baseURL", baseURL);

        this.props.setTitleID(undefined);

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
            // this.setState({message: data.message});

            if (data.resultsFound) {
                // Would like to remove categories that don't have titles associated with them
                // if (data.categories.titles.length > 0) {
                    this.setState({categoryList: data.categories});
                // };
            } else {
                this.setState({errMessage: data.message});
            };

        })
        .catch(error => {
            console.log("Home.tsx getCategories error", error);
            // console.log("Home.tsx getCategories error.name", error.name);
            // console.log("Home.tsx getCategories error.message", error.message);
            this.setState({errMessage: error.name + ": " + error.message});
        });

    };

    getTitles = (categoryID?: number) => {
        // console.log("Home.tsx getTitles");
        // console.log("Home.tsx getTitles baseURL", baseURL);

        // console.log("Home.tsx getTitles this.props.titleID", this.props.titleID);
        this.props.setTitleID(undefined);

        // console.log("Home.tsx getTitles categoryID", categoryID);
        this.setState({categoryID: categoryID});

        let url: string = baseURL + "title";

        // if (this.state.categoryID !== undefined) {
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
            this.setState({titleMessage: data.message});

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
                {this.state.message !== "" ? <Alert severity="info">{this.state.message}</Alert> : null}
                {this.state.errMessage !== "" ? <Alert severity="error">{this.state.errMessage}</Alert> : null}
                {this.state.categoryResultsFound !== undefined ? <Category getTitles={this.getTitles} categoryList={this.state.categoryList} /> : null}
                </Grid>

                {this.props.titleID !== undefined ?
                <Grid item xs={10}>
                <Title isLoggedIn={this.props.isLoggedIn} isAdmin={this.props.isAdmin} sessionToken={this.props.sessionToken} titleID={this.props.titleID} setTitleID={this.props.setTitleID} />
                </Grid>
                :
                <Grid item xs={10}>
                {this.state.titleMessage !== "" ? <Alert severity="info">{this.state.titleMessage}</Alert> : null}
                {this.state.errTitleMessage !== "" ? <Alert severity="error">{this.state.errTitleMessage}</Alert> : null}
                {this.state.titleResultsFound ? <TitleItem /*getEditions={this.getEditions}*/ titleID={this.props.titleID} setTitleID={this.props.setTitleID} titleList={this.state.titleList} /> : <h1>Philip K. Dick and Me</h1>}
                </Grid>
                }
          </Grid>
        );
    };
};

export default Home;