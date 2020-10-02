import React, {Component} from "react";
import {ICategory, ITitle} from "../../Helpers/interfaces"
import {baseURL} from "../../Helpers/constants"
import Category from "./Category";
import Title from "../Titles/Title";

interface IState {
    message: string,
    errMessage: string,
    categoryResultsFound: boolean | undefined,
    categoryList: ICategory[],
    categoryID: number | undefined,
    titleResultsFound: boolean | undefined,
    titleList: ITitle[]
};

class Categories extends Component<{}, IState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            message: "",
            errMessage: "",
            categoryResultsFound: undefined,
            categoryList: [],
            categoryID: undefined,
            titleResultsFound: undefined,
            titleList: []
        };

        this.getCategories = this.getCategories.bind(this);
        this.getTitles = this.getTitles.bind(this);

    };

    getCategories = () => {
        // console.log("Categories.tsx getCategories");
        // console.log("Categories.tsx getCategories baseURL", baseURL);

        let url: string = baseURL + "category";

        fetch(url)
        .then(response => {
            // console.log("Categories.tsx getCategories response", response);
            if (!response.ok) {
                throw Error(response.status + " " + response.statusText + " " + response.url);
            } else {
                return response.json();
            };
        })
        .then(data => {
            // console.log("Categories.tsx getCategories data", data);

            // let categoryResponse: IGetResponse = data;
            // console.log("Categories.tsx getCategories categoryResponse", categoryResponse);

            this.setState({categoryResultsFound: data.resultsFound});
            this.setState({message: data.message});

            if (data.resultsFound) {
                this.setState({categoryList: data.categories});
            } else {
                this.setState({errMessage: data.message});
            };

        })
        .catch(error => {
            console.log("Categories.tsx getCategories error", error);
            // console.log("Categories.tsx getCategories error.name", error.name);
            // console.log("Categories.tsx getCategories error.message", error.message);
            this.setState({errMessage: error.name + ": " + error.message});
        });

    };

    getTitles = (categoryID?: number) => {
        // console.log("Categories.tsx getTitles");
        // console.log("Categories.tsx getTitles baseURL", baseURL);

        // console.log("Categories.tsx getTitles categoryID", categoryID);
        this.setState({categoryID: categoryID});

        let url: string = baseURL + "title";

        // if (this.state.categoryID !== undefined) {
        //     url = url + "/category/" + this.state.categoryID;
        // };

        if (categoryID) {
            url = url + "/category/" + categoryID;
        };

        // console.log("Categories.tsx getTitles url", url);

        fetch(url)
        .then(response => {
            // console.log("Categories.tsx getTitles response", response);
            if (!response.ok) {
                throw Error(response.status + " " + response.statusText + " " + response.url);
            } else {
                return response.json();
            };
        })
        .then(data => {
            // console.log("Categories.tsx getTitles data", data);

            // let titleResponse: IGetResponse = data;
            // console.log("Categories.tsx getTitles titleResponse", titleResponse);

            this.setState({titleResultsFound: data.resultsFound});
            this.setState({message: data.message});

            if (data.resultsFound) {
                this.setState({titleList: data.titles});
            } else {
                this.setState({errMessage: data.message});
            };

        })
        .catch(error => {
            console.log("Categories.tsx getTitles error", error);
            // console.log("Categories.tsx getTitles error.name", error.name);
            // console.log("Categories.tsx getTitles error.message", error.message);
            this.setState({errMessage: error.name + ": " + error.message});
        });

    };

    getEditions = (titleID?: number) => {
        // console.log("Titles.tsx getEditions");
    };
    
    componentDidMount() {
        this.getCategories();
      };

    render() {

        return(
            <div>
                <h1>Categories</h1>
                {this.state.message !== "" ? <p>{this.state.message}</p> : null}
                {this.state.errMessage !== "" ? <p>{this.state.errMessage}</p> : null}
                {this.state.categoryResultsFound !== undefined ? <Category getTitles={this.getTitles} categoryList={this.state.categoryList} /> : null}
                <div>
                {this.state.titleResultsFound ? <Title getEditions={this.getEditions} titleList={this.state.titleList} /> : null}
                </div>
          </div>
        );
    };
};

export default Categories;