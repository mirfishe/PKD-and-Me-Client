import React, {Component} from "react";
import {ITitle, IEdition} from "../../Helpers/interfaces"
import {baseURL} from "../../Helpers/constants"
import Title from "./Title";
import Edition from "../Editions/Edition";

interface IProps {
    isLoggedIn: boolean | undefined,
    isAdmin: boolean | undefined,
    sessionToken: string,
    categoryID?: number
};

interface IState {
    categoryID: number | undefined,
    titleResultsFound: boolean | undefined,
    message: string,
    errMessage: string,
    titleList: ITitle[]
    titleID: number | undefined,
    editionResultsFound: boolean | undefined,
    editionList: IEdition[]
};

class Titles extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            message: "",
            errMessage: "",
            categoryID: undefined,
            titleResultsFound: undefined,
            titleList: [],
            titleID: undefined,
            editionResultsFound: undefined,
            editionList: []
        };

        this.setState({categoryID: props.categoryID});


        this.getTitles = this.getTitles.bind(this);
        this.getEditions = this.getEditions.bind(this);

    };

    getTitles = () => {
        // console.log("Titles.tsx getTitles");
        // console.log("Titles.tsx getTitles baseURL", baseURL);

        // console.log('Titles.tsx this.state.categoryID', this.state.categoryID);

        let url: string = baseURL + "title";

        if (this.state.categoryID !== undefined) {
            url = url + "/category/" + this.state.categoryID;
        };

        // console.log("Titles.tsx getTitles url", url);

        fetch(url)
        .then(response => {
            // console.log("Titles.tsx getTitles response", response);
            if (!response.ok) {
                throw Error(response.status + " " + response.statusText + " " + response.url);
            } else {
                return response.json();
            };
        })
        .then(data => {
            // console.log("Titles.tsx getTitles data", data);

            // let titleResponse: IGetResponse = data;
            // console.log("Titles.tsx getTitles titleResponse", titleResponse);

            this.setState({titleResultsFound: data.resultsFound});
            this.setState({message: data.message});

            if (data.resultsFound) {
                this.setState({titleList: data.titles});
            } else {
                this.setState({errMessage: data.message});
            };

        })
        .catch(error => {
            console.log("Titles.tsx getTitles error", error);
            // console.log("Titles.tsx getTitles error.name", error.name);
            // console.log("Titles.tsx getTitles error.message", error.message);
            this.setState({errMessage: error.name + ": " + error.message});
        });

    };

    getEditions = (titleID?: number) => {
        // console.log("Titles.tsx getEditions");
        // console.log("Titles.tsx getEditions baseURL", baseURL);

        // console.log('Titles.tsx getEditions titleID', titleID);
        this.setState({titleID: titleID});

        let url: string = baseURL + "edition";

        // if (this.state.titleID !== undefined) {
        //     url = url + "/title/" + this.state.titleID;
        // };

        if (titleID !== undefined) {
            url = url + "/title/" + titleID;
        };

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
            // console.log("Titles.tsx getEditions data", data);

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

    componentDidMount() {
        this.getTitles();
      };

    render() {

        return(
            <div>
                <h1>Titles</h1>
                {this.state.message !== "" ? <p>{this.state.message}</p> : null}
                {this.state.errMessage !== "" ? <p>{this.state.errMessage}</p> : null}
                {this.state.titleResultsFound ? <Title getEditions={this.getEditions} titleList={this.state.titleList} /> : null}
                <div>
                {this.state.editionResultsFound ? <Edition editionList={this.state.editionList} /> : null}
                </div>
          </div>
        );
    };
};

export default Titles;