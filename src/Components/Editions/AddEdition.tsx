import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, Alert, Button} from "reactstrap";
import {Image, Plus} from 'react-bootstrap-icons';
import {baseURL} from "../../Helpers/constants";
import {IMedia} from "../../Helpers/interfaces";

interface IProps {
    userID: number | null,
    isAdmin: boolean,
    sessionToken: string | null,
    titleID: number | null,
    titlePublicationDate: Date | null,
    editionUpdated: () => void,
    displayIcon?: boolean,
    displayButton?: boolean
};

interface IState {
    message: string,
    errMessage: string,
    modal: boolean,
    editionRecordAdded: boolean | null,
    mediaMessage: string,
    errMediaMessage: string,
    mediaResultsFound: boolean | null,
    mediaList: IMedia[],
    errMediaID: string,
    ddMediaID: number | null | unknown,
    txtPublicationDate: string | undefined,
    txtImageName: string | undefined,
    txtASIN: string | undefined,
    txtTextLinkShort: string | undefined,
    txtTextLinkFull: string | undefined,
    txtImageLinkSmall: string | undefined,
    txtImageLinkMedium: string | undefined,
    txtImageLinkLarge: string | undefined,
    txtTextImageLink: string | undefined,
    editionID: number | null,
    mediaID: number | null,
    publicationDate: Date | null,
    imageName: string | null,
    ASIN: string | null,
    textLinkShort: string | null,
    textLinkFull: string | null,
    imageLinkSmall: string | null,
    imageLinkMedium: string | null,
    imageLinkLarge: string | null,
    textImageLink: string | null,
    active: boolean | null,
    ASINMessage: string,
    errASINMessage: string,
    ASINResultsFound: boolean | null
};

class AddEdition extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            message: "",
            errMessage: "",
            modal: false,
            mediaMessage: "",
            errMediaMessage: "",
            mediaResultsFound: null,
            mediaList: [],
            editionRecordAdded: null,
            errMediaID: "",
            ddMediaID: null,
            txtPublicationDate: undefined,
            txtImageName: undefined,
            txtASIN: undefined,
            txtTextLinkShort: undefined,
            txtTextLinkFull: undefined,
            txtImageLinkSmall: undefined,
            txtImageLinkMedium: undefined,
            txtImageLinkLarge: undefined,
            txtTextImageLink: undefined,
            editionID: null,
            mediaID: null,
            publicationDate: null,
            imageName: null,
            ASIN: null,
            textLinkShort: null,
            textLinkFull: null,
            imageLinkSmall: null,
            imageLinkMedium: null,
            imageLinkLarge: null,
            textImageLink: null,
            active: null,
            ASINMessage: "",
            errASINMessage: "",
            ASINResultsFound: null
        };

    };

    getMedia = () => {
        // console.log("AddEdition.tsx getMedia");
        // console.log("AddEdition.tsx getMedia baseURL", baseURL);

        this.setState({mediaMessage: ""});
        this.setState({errMediaMessage: ""});
        this.setState({mediaResultsFound: null});
        this.setState({mediaList: []});

        let url: string = baseURL + "media/";

        fetch(url)
        .then(response => {
            // console.log("AddEdition.tsx getMedia response", response);
            if (!response.ok) {
                throw Error(response.status + " " + response.statusText + " " + response.url);
            } else {
                return response.json();
            };
        })
        .then(data => {
            // console.log("AddEdition.tsx getMedia data", data);

            this.setState({mediaResultsFound: data.resultsFound});
            // this.setState({mediaMessage: data.message});

            if (data.resultsFound === true) {

                this.setState({mediaList: data.media});

            } else {
                this.setState({errMediaMessage: data.message});
            };

        })
        .catch(error => {
            console.log("AddEdition.tsx getMedia error", error);
            // console.log("AddEdition.tsx getMedia error.name", error.name);
            // console.log("AddEdition.tsx getMedia error.message", error.message);
            this.setState({errMediaMessage: error.name + ": " + error.message});
        });

    };

    addEdition = () => {
        // console.log("AddEdition.tsx addEdition");
        // console.log("AddEdition.tsx addEdition baseURL", baseURL);

        this.setState({message: ""});
        this.setState({errMessage: ""});
        this.setState({editionRecordAdded: null});
        this.setState({errMediaID: ""});
        this.setState({editionID: null});
        this.setState({mediaID: null});
        this.setState({publicationDate: null});
        this.setState({imageName: null});
        this.setState({ASIN: null});
        this.setState({textLinkShort: null});
        this.setState({textLinkFull: null});
        this.setState({imageLinkSmall: null});
        this.setState({imageLinkMedium: null});
        this.setState({imageLinkLarge: null});
        this.setState({textImageLink: null});
        this.setState({active: null});

        let mediaIDValidated: boolean  = false;
        let formValidated: boolean  = false;

        // Check to make sure that this.props.titleID is a number?

        if (this.state.ddMediaID !== undefined) {
            if (this.state.ddMediaID !== null) {
                mediaIDValidated = true;
                this.setState({errMediaID: ""});
                // console.log("AddEdition.tsx addEdition Valid mediaID");
                // console.log("AddEdition.tsx addEdition mediaIDValidated true", mediaIDValidated);
            } else {
                mediaIDValidated = false;
                this.setState({errMediaID: "Please select a media."});
                // console.log("AddEdition.tsx addEdition Invalid mediaID");
                // console.log("AddEdition.tsx addEdition mediaIDValidated false", mediaIDValidated);
            };
        };

        if (mediaIDValidated === true) {
            formValidated = true;
            // console.log("AddEdition.tsx addEdition Valid Form");
            // console.log("AddEdition.tsx addEdition formValidated true", formValidated);
        } else {
            formValidated = false;
            // console.log("AddEdition.tsx addEdition Invalid Form");
            // console.log("AddEdition.tsx addEdition formValidated false", formValidated);
        };

        // console.log("AddEdition.tsx addEdition titleIDValidated", titleIDValidated);
        // console.log("AddEdition.tsx addEdition mediaIDValidated", mediaIDValidated);
        // console.log("AddEdition.tsx addEdition formValidated", formValidated);

        if (formValidated === true && this.props.sessionToken !== null) {

            let editionObject = {
                titleID: this.props.titleID,
                mediaID: this.state.ddMediaID,
                // imageName: this.state.txtImageName.trim(),
                // ASIN: this.state.txtASIN.trim(),
                // textLinkShort: this.state.txtTextLinkShort.trim(),
                // textLinkFull: this.state.txtTextLinkFull.trim(),
                // imageLinkSmall: this.state.txtImageLinkSmall.trim(),
                // imageLinkMedium: this.state.txtImageLinkMedium.trim(),
                // imageLinkLarge: this.state.txtImageLinkLarge.trim(),
                // textImageLink: this.state.txtTextImageLink.trim()
            };

            // If the user doesn't enter a publication date, then it isn't added/updated
            if (this.state.txtPublicationDate !== null && this.state.txtPublicationDate !== undefined) {
                if (this.state.txtPublicationDate.trim().length !== 0) {
                    Object.assign(editionObject, {publicationDate: this.state.txtPublicationDate.trim()});
                };
            };

            // If the user doesn't enter an image name, then it isn't added/updated
            if (this.state.txtImageName !== null && this.state.txtImageName !== undefined) {
                if (this.state.txtImageName.trim().length !== 0) {
                    Object.assign(editionObject, {imageName: this.state.txtImageName.trim()});
                };
            };

            // If the user doesn't enter an ASIN, then it isn't added/updated
            if (this.state.txtASIN !== null && this.state.txtASIN !== undefined) {
                if (this.state.txtASIN.trim().length !== 0) {
                    Object.assign(editionObject, {ASIN: this.state.txtASIN.trim()});
                };
            };

            // If the user doesn't enter s textLinkShort, then it isn't added/updated
            if (this.state.txtTextLinkShort !== null && this.state.txtTextLinkShort !== undefined) {
                if (this.state.txtTextLinkShort.trim().length !== 0) {
                    Object.assign(editionObject, {textLinkShort: this.state.txtTextLinkShort.trim()});
                };
            };

            // If the user doesn't enter a textLinkFull, then it isn't added/updated
            if (this.state.txtTextLinkFull !== null && this.state.txtTextLinkFull !== undefined) {
                if (this.state.txtTextLinkFull.trim().length !== 0) {
                    Object.assign(editionObject, {textLinkFull: this.state.txtTextLinkFull.trim()});
                };
            };

            // If the user doesn't enter an imageLinkSmall, then it isn't added/updated
            if (this.state.txtImageLinkSmall !== null && this.state.txtImageLinkSmall !== undefined) {
                if (this.state.txtImageLinkSmall.trim().length !== 0) {
                    Object.assign(editionObject, {imageLinkSmall: this.state.txtImageLinkSmall.trim()});
                };
            };

            // If the user doesn't enter an imageLinkMedium, then it isn't added/updated
            if (this.state.txtImageLinkMedium !== null && this.state.txtImageLinkMedium !== undefined) {
                if (this.state.txtImageLinkMedium.trim().length !== 0) {
                    Object.assign(editionObject, {imageLinkMedium: this.state.txtImageLinkMedium.trim()});
                };
            };

            // If the user doesn't enter an imageLinkLarge, then it isn't added/updated
            if (this.state.txtImageLinkLarge !== null && this.state.txtImageLinkLarge !== undefined) {
                if (this.state.txtImageLinkLarge.trim().length !== 0) {
                    Object.assign(editionObject, {imageLinkLarge: this.state.txtImageLinkLarge.trim()});
                };
            };

            // If the user doesn't enter a textImageLink, then it isn't added/updated
            if (this.state.txtTextImageLink !== null && this.state.txtTextImageLink !== undefined) {
                if (this.state.txtTextImageLink.trim().length !== 0) {
                    Object.assign(editionObject, {textImageLink: this.state.txtTextImageLink.trim()});
                };
            };

            // console.log("AddEdition.tsx addEdition editionObject", editionObject);

            let url: string = baseURL + "edition/";
            // console.log("AddEdition.tsx addEdition url", url);

            fetch(url, {
                method: "POST",
                headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": this.props.sessionToken
                }),
                body: JSON.stringify({edition: editionObject})
            })
            .then(response => {
                // console.log("AddEdition.tsx addEdition response", response);
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
                // console.log("AddEdition.tsx addEdition data", data);

                this.setState({editionRecordAdded: data.recordAdded});
                // this.setState({message: data.message});

                if (data.recordAdded === true) {

                    // this.setState({txtASIN: data.ASIN});

                    this.setState({editionID: data.editionID});
                    this.setState({mediaID: data.mediaID});
                    this.setState({publicationDate: data.publicationDate});
                    this.setState({imageName: data.imageName});
                    this.setState({ASIN: data.ASIN});
                    this.setState({textLinkShort: data.textLinkShort});
                    this.setState({textLinkFull: data.textLinkFull});
                    this.setState({imageLinkSmall: data.imageLinkSmall});
                    this.setState({imageLinkMedium: data.imageLinkMedium});
                    this.setState({imageLinkLarge: data.imageLinkLarge});
                    this.setState({textImageLink: data.textImageLink});
                    this.setState({active: data.active});

                    this.props.editionUpdated();
                    // Need to call this here because there are two buttons on the form besides the Cancel button
                    this.toggle();

                } else {
                    // this.setState({errMessage: data.error});
                    this.setState({errMessage: data.errorMessages});
                };

            })
            .catch(error => {
                console.log("AddEdition.tsx addEdition error", error);
                // console.log("AddEdition.tsx addEdition error.name", error.name);
                // console.log("AddEdition.tsx addEdition error.message", error.message);
                this.setState({errMessage: error.name + ": " + error.message});
            });

        };

    };

    checkASIN = (ASIN: string | null) => {
        // console.log("AddEdition.tsx checkASIN");
        // console.log("AddEdition.tsx checkASIN baseURL", baseURL);

        this.setState({ASINMessage: ""});
        this.setState({errASINMessage: ""});
        this.setState({ASINResultsFound: null});

        let url: string = baseURL + "edition/ASIN/";

        if (ASIN !== null && ASIN !== "") {
            url = url + ASIN;

            // console.log("AddEdition.tsx checkASIN url", url);

            fetch(url)
            .then(response => {
                // console.log("AddEdition.tsx checkASIN response", response);
                if (!response.ok) {
                    throw Error(response.status + " " + response.statusText + " " + response.url);
                } else {
                    return response.json();
                };
            })
            .then(data => {
                console.log("AddEdition.tsx checkASIN data", data);

                this.setState({ASINResultsFound: data.resultsFound});
                this.setState({ASINMessage: data.message});

                if (data.resultsFound === true) {
                    this.setState({ASINMessage: data.message + "That ASIN already exists in the database. " + data.editions[0].title.titleName + " (" + data.editions[0].medium.media + ") editionID=" + data.editions[0].editionID});

                    // console.log("AddEdition.tsx checkASIN", data.editions[0].title.titleName);
                    // console.log("AddEdition.tsx checkASIN", data.editions[0].medium.media);
                    // console.log("AddEdition.tsx checkASIN", data.editions[0].editionID);

                } else {
                    this.setState({errASINMessage: data.message + "That ASIN does not exist in the database"});
                };

            })
            .catch(error => {
                console.log("AddEdition.tsx checkASIN error", error);
                // console.log("AddEdition.tsx checkASIN error.name", error.name);
                // console.log("AddEdition.tsx checkASIN error.message", error.message);
                this.setState({errASINMessage: error.name + ": " + error.message});
            });

        };

    };

    componentDidMount() {
        this.getMedia();
    };

    copyTitlePublicationDate = () => {
        // console.log("AddEdition.tsx copyTitlePublicationDate this.props.titlePublicationDate", this.props.titlePublicationDate);

        if (this.props.titlePublicationDate !== undefined && this.props.titlePublicationDate !== null) {
            this.setState({txtPublicationDate: this.props.titlePublicationDate.toString().substring(0, 10)});
        } else {
            this.setState({txtPublicationDate: undefined});
        };

    };

    // handleOpen = () => {
    //     this.setState({modal: true});
    // };
    
    // handleClose = () => {
    //     this.setState({modal: false});
    // };

    toggle = () => {
        this.setState({modal: !this.state.modal});
    };

    render() {

        // console.log("AddEdition.tsx render() this.props.titlePublicationDate", this.props.titlePublicationDate);

        // console.log("AddEdition.tsx render() this.props.isAdmin", this.props.isAdmin);

        if (this.props.isAdmin !== true) {
            return <Redirect to="/" />;
        };

        return(
            <React.Fragment>
                            
            {this.props.displayButton === true ?  <Button outline size="sm" color="info" onClick={this.toggle}>Add Edition</Button> : null}

            {this.props.displayIcon === true ? <Plus className="addEditIcon" onClick={this.toggle} /> : null}

            <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                <ModalHeader toggle={this.toggle}>Add Edition</ModalHeader>
                <ModalBody>
                <Form>
                <FormGroup>
                {this.state.message !== "" ? <Alert severity="info">{this.state.message}</Alert> : null}
                {this.state.errMessage !== "" ? <Alert severity="error">{this.state.errMessage}</Alert> : null}
                {this.state.mediaMessage !== "" ? <Alert severity="info">{this.state.mediaMessage}</Alert> : null}
                {this.state.errMediaMessage !== "" ? <Alert severity="error">{this.state.errMediaMessage}</Alert> : null}
                </FormGroup>

                <FormGroup row>
                <Col>

                <Label for="ddMediaID">Media</Label>
                <Input type="select" id="ddMediaID" labelId="lblMediaID" /*value={this.state.ddMediaID}*/ onChange={(event) => {/*console.log(event.target.value);*/ this.setState({ddMediaID: event.target.value});}}>
                <option selected value="">Select a Media</option>
                {this.state.mediaList.map((media: IMedia) => {
                return (
                    <option value={media.mediaID}>{media.media}</option>
                    )
                })}
                </Input>
                {this.state.errMediaID !== "" ? <Alert severity="error">{this.state.errMediaID}</Alert> : null}

                </Col>
                <Col>
                    
                    <Label for="txtPublicationDate">Publication Date</Label>
                    <Input type="date" id="txtPublicationDate" value={this.state.txtPublicationDate} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtPublicationDate: event.target.value});}} />

                </Col>

                </FormGroup>

                <FormGroup>
    
                <Label for="txtImageName">Image Name</Label>
                <Input type="text" id="txtImageName" value={this.state.txtImageName} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtImageName: event.target.value});}} />
                {this.state.txtImageName !== null && this.state.txtImageName !== undefined && this.state.txtImageName !== "" ? <img src={this.state.txtImageName} alt="" /> : <Image size="150" className="noImageIcon"/>}
    
                </FormGroup>
                <FormGroup>
    
                <Label for="txtASIN">ASIN</Label>
                <Input type="text" id="txtASIN" value={this.state.txtASIN} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtASIN: event.target.value});}} />

                </FormGroup>
                <FormGroup>
    
                <Label for="txtTextLinkShort">Text Link Short</Label>
                <Input type="text" id="txtTextLinkShort" value={this.state.txtTextLinkShort} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtTextLinkShort: event.target.value});}} />

                </FormGroup>
                <FormGroup>
    
                <Label for="txtTextLinkFull">Text Link Full</Label>
                <Input type="textarea" id="txtTextLinkFull" rows={5} value={this.state.txtTextLinkFull} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtTextLinkFull: event.target.value});}} />

                </FormGroup>
                <FormGroup>
    
                <Label for="txtImageLinkSmall">Image Link Small</Label>
                <Input type="textarea" id="txtImageLinkSmall" rows={10} value={this.state.txtImageLinkSmall} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtImageLinkSmall: event.target.value});}} />

                </FormGroup>
                <FormGroup>
    
                <Label for="txtImageLinkMedium">Image Link Medium</Label>
                <Input type="textarea" id="txtImageLinkMedium" rows={10} value={this.state.txtImageLinkMedium} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtImageLinkMedium: event.target.value});}} />

                </FormGroup>
                <FormGroup>
    
                <Label for="txtImageLinkLarge">Image Link Large</Label>
                <Input type="textarea" id="txtImageLinkLarge" rows={10} value={this.state.txtImageLinkLarge} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtImageLinkLarge: event.target.value});}} />

                </FormGroup>
                <FormGroup>
    
                <Label for="txtTextImageLink">Text Image Link</Label>
                <Input type="textarea" id="txtTextImageLink" rows={10} value={this.state.txtTextImageLink} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtTextImageLink: event.target.value});}} />

                </FormGroup>

                <ModalFooter>
                     <Button outline size="lg" color="primary" onClick={this.addEdition}>Add Edition</Button>
                     <Button outline size="lg" color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </ModalBody>
          </Modal>
        </React.Fragment>
        );
    };
};

export default AddEdition;