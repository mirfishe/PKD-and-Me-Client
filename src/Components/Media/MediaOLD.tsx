import React, {Component} from "react";

import {Alert} from '@material-ui/lab/';
import {Grid} from '@material-ui/core';

import {IMedia,IEdition} from "../../Helpers/interfaces"
import {baseURL} from "../../Helpers/constants"
import MediaItem from "./MediaItemOLD";
import Edition from "../Editions/Edition";

interface IProps {
    isLoggedIn: boolean | undefined,
    isAdmin: boolean | undefined,
    sessionToken: string
};

interface IState {
    message: string,
    errMessage: string,
    mediaResultsFound: boolean | undefined,
    mediaList: IMedia[],
    mediaID: number | undefined,
    editionResultsFound: boolean | undefined,
    editionList: IEdition[]
};

class Media extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            message: "",
            errMessage: "",
            mediaResultsFound: undefined,
            mediaList: [],
            mediaID: undefined,
            editionResultsFound: undefined,
            editionList: []
        };

        // this.getMedia = this.getMedia.bind(this);
        // this.getEditions = this.getEditions.bind(this);

    };

    getMedia = () => {
        // console.log("Media.tsx getMedia");
        // console.log("Media.tsx getMedia baseURL", baseURL);

        let url: string = baseURL + "media";

        fetch(url)
        .then(response => {
            // console.log("Media.tsx getMedia response", response);
            if (!response.ok) {
                throw Error(response.status + " " + response.statusText + " " + response.url);
            } else {
                return response.json();
            };
        })
        .then(data => {
            // console.log("Media.tsx getMedia data", data);

            // let mediaResponse: IGetResponse = data;
            // console.log("Media.tsx getMedia titleResponse", titleResponse);

            this.setState({mediaResultsFound: data.resultsFound});
            this.setState({message: data.message});

            if (data.resultsFound) {
                this.setState({mediaList: data.media});
            } else {
                this.setState({errMessage: data.message});
            };

        })
        .catch(error => {
            console.log("Media.tsx getMedia error", error);
            // console.log("Media.tsx getMedia error.name", error.name);
            // console.log("Media.tsx getMedia error.message", error.message);
            this.setState({errMessage: error.name + ": " + error.message});
        });

    };

    getEditions = (mediaID?: number) => {
        // console.log("Media.tsx getEditions");
        // console.log("Media.tsx getEditions baseURL", baseURL);

        // console.log('Media.tsx getEditions mediaID', mediaID);
        this.setState({mediaID: mediaID});

        let url: string = baseURL + "edition";

        // if (this.state.mediaID !== undefined) {
        //     url = url + "/media/" + this.state.mediaID;
        // };

        if (mediaID !== undefined) {
            url = url + "/media/" + mediaID;
        };

        // console.log("Media.tsx getEditions url", url);

        fetch(url)
        .then(response => {
            // console.log("Media.tsx getEditions response", response);
            if (!response.ok) {
                throw Error(response.status + " " + response.statusText + " " + response.url);
            } else {
                return response.json();
            };
        })
        .then(data => {
            // console.log("Media.tsx getEditions data", data);

            // let editionResponse: IGetResponse = data;
            // console.log("Media.tsx getEditions titleResponse", titleResponse);

            this.setState({editionResultsFound: data.resultsFound});
            this.setState({message: data.message});

            if (data.resultsFound) {
                this.setState({editionList: data.editions});
            } else {
                this.setState({errMessage: data.message});
            };

        })
        .catch(error => {
            console.log("Media.tsx getEditions error", error);
            // console.log("Media.tsx getEditions error.name", error.name);
            // console.log("Media.tsx getEditions error.message", error.message);
            this.setState({errMessage: error.name + ": " + error.message});
        });

    };

    componentDidMount() {
        this.getMedia();
      };

    render() {

        return(
            <Grid container>
                <Grid item xs={12}>
                {this.state.message !== "" ? <Alert severity="info">{this.state.message}</Alert> : null}
                {this.state.errMessage !== "" ? <Alert severity="error">{this.state.errMessage}</Alert> : null}
                </Grid>
                <Grid item xs={2}>
                {this.state.mediaResultsFound ? <MediaItem getEditions={this.getEditions} mediaList={this.state.mediaList} /> : null}
                </Grid>
                <Grid item xs={10}>
                {this.state.editionResultsFound ? <Edition editionList={this.state.editionList} /> : null}
                </Grid>
          </Grid>
        );
    };
};

export default Media;