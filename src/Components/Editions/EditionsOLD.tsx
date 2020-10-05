import React, {Component} from "react";

import {Alert} from '@material-ui/lab/';
import {Grid} from '@material-ui/core';

import {IEdition} from "../../Helpers/interfaces"
import {baseURL} from "../../Helpers/constants"
import Edition from "./Edition";

interface IProps {
    isLoggedIn: boolean | undefined,
    isAdmin: boolean | undefined,
    sessionToken: string,
    mediaID?: number
};

interface IState {
    message: string,
    errMessage: string,
    mediaID: number | undefined,
    editionResultsFound: boolean | undefined,
    editionList: IEdition[]
};

class Editions extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            message: "",
            errMessage: "",
            editionResultsFound: undefined,
            editionList: [],
            mediaID: undefined
        };

        this.setState({mediaID: props.mediaID});


        // this.getEditions = this.getEditions.bind(this);

    };

    getEditions = () => {
        // console.log("Editions.tsx getEditions");
        // console.log("Editions.tsx getEditions baseURL", baseURL);

        // console.log('Editions.tsx this.state.mediaID', this.state.mediaID);

        let url: string = baseURL + "edition";

        if (this.state.mediaID !== undefined) {
            url = url + "/media/" + this.state.mediaID;
        };

        // console.log("Editions.tsx getEditions url", url);

        fetch(url)
        .then(response => {
            // console.log("Editions.tsx getEditions response", response);
            if (!response.ok) {
                throw Error(response.status + " " + response.statusText + " " + response.url);
            } else {
                return response.json();
            };
        })
        .then(data => {
            // console.log("Editions.tsx getEditions data", data);

            // let editionResponse: IGetResponse = data;
            // console.log("Editions.tsx getEditions titleResponse", titleResponse);

            this.setState({editionResultsFound: data.resultsFound});
            this.setState({message: data.message});

            if (data.resultsFound) {
                this.setState({editionList: data.editions});
            } else {
                this.setState({errMessage: data.message});
            };

        })
        .catch(error => {
            console.log("Editions.tsx getEditions error", error);
            // console.log("Editions.tsx getEditions error.name", error.name);
            // console.log("Editions.tsx getEditions error.message", error.message);
            this.setState({errMessage: error.name + ": " + error.message});
        });

    };

    componentDidMount() {
        this.getEditions();
      };

    render() {

        return(
            <Grid container>
                <Grid item xs={12}>
                {this.state.message !== "" ? <Alert severity="info">{this.state.message}</Alert> : null}
                {this.state.errMessage !== "" ? <Alert severity="error">{this.state.errMessage}</Alert> : null}
                </Grid>
                <Grid item xs={10}>
                {this.state.editionResultsFound ? <Edition editionList={this.state.editionList} /> : null}
                </Grid>
          </Grid>
        );
    };
};

export default Editions;