import React, {Component} from "react";
import {ICategory, IGetResponse} from "../../Helpers/interfaces"
import {baseURL} from "../../Helpers/constants"
import Category from "./Category";

interface IState {
    resultsFound: boolean | null,
    message: string,
    errMessage: string,
    categoryList: ICategory[]
};

class Categories extends Component<{}, IState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            resultsFound: null,
            categoryList: [],
            message: '',
            errMessage: ''
        };

        this.fetchCategories = this.fetchCategories.bind(this);

    };

    fetchCategories = () => {
        // console.log("fetchCategories");
        // console.log("baseURL", baseURL);

        let url: string = baseURL + "category";

        fetch(url)
        .then(response => {
            // console.log("Categories.tsx fetchCategories response", response);
            if (!response.ok) {
                throw Error(response.status + " " + response.statusText + " " + response.url);
            } else {
                return response.json();
            };
        })
        .then(data => {
            // console.log("Categories.tsx fetchCategories data", data);

            let categoryResponse: IGetResponse = data;
            // console.log("Categories.tsx fetchCategories categoryResponse", categoryResponse);

            this.setState({resultsFound: data.resultsFound});
            this.setState({message: data.message});

            if (categoryResponse.resultsFound) {
                this.setState({categoryList: data.categories});
            } else {
                this.setState({errMessage: data.message});
            };

        })
        .catch(error => {
            console.log("Categories.tsx fetchCategories error", error);
            // console.log("Categories.tsx fetchCategories error.name", error.name);
            // console.log("Categories.tsx fetchCategories error.message", error.message);
            this.setState({errMessage: error.name + ": " + error.message});
        });

    };

    componentDidMount() {
        this.fetchCategories();
      };

    render() {

        return(
            <div>
                <h1>Categories</h1>
                {this.state.errMessage !== '' ? <p>{this.state.errMessage}</p> : null}
                {this.state.resultsFound ? <Category categoryList={this.state.categoryList} /> : null}
          </div>
        );
    };
};

export default Categories;