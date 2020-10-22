import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {Form, FormGroup, Label, Input, Alert, Button} from "reactstrap";
import {baseURL} from "../../Helpers/constants";

interface IProps {
    userID: number | null,
    // isLoggedIn: boolean | null,
    isAdmin: boolean,
    sessionToken: string | null
};

interface IState {
    message: string,
    errMessage: string,
    mediaRecordAdded: boolean | null,
    errMedia: string,
    txtMedia: string | undefined,
    mediaID: number | null,
    media: string | null,
    sortID: number | null,
    active: boolean | null
};

class AddMedia extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            message: "",
            errMessage: "",
            mediaRecordAdded: null,
            errMedia: "",
            txtMedia: undefined,
            mediaID: null,
            media: null,
            sortID: null,
            active: null
        };

    };

    addMedia = () => {
        // console.log("AddMedia.tsx addMedia");
        // console.log("AddMedia.tsx addMedia baseURL", baseURL);

        this.setState({message: ""});
        this.setState({errMessage: ""});
        this.setState({mediaRecordAdded: null});
        this.setState({errMedia: ""});
        this.setState({mediaID: null});
        this.setState({media: null});
        this.setState({sortID: null});
        this.setState({active: null});

        let mediaValidated: boolean  = false;
        let formValidated: boolean  = false;

        if (this.state.txtMedia !== undefined && this.state.txtMedia !== null) {
            if (this.state.txtMedia.trim().length > 0) {
                mediaValidated = true;
                this.setState({errMedia: ""});
                // console.log("AddMedia.tsx addMedia Valid Media");
                // console.log("AddMedia.tsx addMedia mediaValidated true", mediaValidated);
            } else {
                mediaValidated = false;
                this.setState({errMedia: "Please enter a media."});
                // console.log("AddMedia.tsx addMedia Invalid Media");
                // console.log("AddMedia.tsx addMedia mediaValidated false", mediaValidated);
            };
        };

        if (mediaValidated === true) {
            formValidated = true;
            // console.log("AddMedia.tsx addMedia Valid Form");
            // console.log("AddMedia.tsx addMedia formValidated true", formValidated);
        } else {
            formValidated = false;
            // console.log("AddMedia.tsx addMedia Invalid Form");
            // console.log("AddMedia.tsx addMedia formValidated false", formValidated);
        };

        // console.log("AddMedia.tsx addMedia mediaValidated", mediaValidated);
        // console.log("AddMedia.tsx addMedia formValidated", formValidated);

        if (formValidated === true && this.props.sessionToken !== null) {

            if (this.state.txtMedia !== undefined && this.state.txtMedia !== null) {

                let mediaObject = {
                    media: this.state.txtMedia.trim()
                };

                // console.log("AddMedia.tsx addMedia mediaObject", mediaObject);

                let url: string = baseURL + "media/";
                // console.log("AddMedia.tsx addMedia url", url);

                fetch(url, {
                    method: "POST",
                    headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": this.props.sessionToken
                    }),
                    body: JSON.stringify({media: mediaObject})
                })
                .then(response => {
                    // console.log("AddMedia.tsx addMedia response", response);
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
                    // console.log("AddMedia.tsx addMedia data", data);

                    this.setState({mediaRecordAdded: data.recordAdded});
                    this.setState({message: data.message});

                    if (data.recordAdded === true) {

                        // this.setState({txtMedia: data.txtMedia});

                        this.setState({mediaID: data.mediaID});
                        this.setState({media: data.media});
                        this.setState({sortID: data.sortID});
                        this.setState({active: data.active});

                    } else {
                        // this.setState({errMessage: data.error});
                        this.setState({errMessage: data.errorMessages});
                    };

                })
                .catch(error => {
                    console.log("AddMedia.tsx addMedia error", error);
                    // console.log("AddMedia.tsx addMedia error.name", error.name);
                    // console.log("AddMedia.tsx addMedia error.message", error.message);
                    this.setState({errMessage: error.name + ": " + error.message});
                });

            };

        };

    };

    render() {

        // console.log("AddMedia.tsx this.props.isAdmin", this.props.isAdmin);

        if (this.props.isAdmin !== true) {
            return <Redirect to="/" />;
        };

        return(
            <Form>
                <FormGroup> 
                <h3 className="text-center">Add Media</h3>
                </FormGroup>
                <FormGroup>
                {this.state.message !== "" ? <Alert severity="info">{this.state.message}</Alert> : null}
                {this.state.errMessage !== "" ? <Alert severity="error">{this.state.errMessage}</Alert> : null}
                </FormGroup>
                <FormGroup>

                <Label for="txtMedia">Media</Label>
                <Input type="text" id="txtMedia" value={this.state.txtMedia} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtMedia: event.target.value});}} />
                {this.state.errMedia !== "" ? <Alert severity="error">{this.state.errMedia}</Alert> : null}

                </FormGroup>

                <FormGroup>

                <Button size="lg" color="primary" onClick={this.addMedia}>Add Media</Button>
                {/* <Button size="lg" color="primary" onClick={this.handleClose}>Cancel</Button> */}

                </FormGroup>

        </Form>
        );
    };
};

export default AddMedia;