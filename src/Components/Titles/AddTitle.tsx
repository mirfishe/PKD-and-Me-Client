import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, Alert, Button} from "reactstrap";
import {Image, Plus} from 'react-bootstrap-icons';
import {baseURL} from "../../Helpers/constants";
import {ICategory} from "../../Helpers/interfaces";

interface IProps {
    userID: number | null,
    isAdmin: boolean,
    sessionToken: string | null,
    // titleUpdated: () => void,
    titleUpdated: boolean,
    setTitleUpdated: (titleUpdated: boolean) => void,
    displayIcon?: boolean,
    displayButton?: boolean
};

interface IState {
    message: string,
    errMessage: string,
    modal: boolean,
    categoryMessage: string,
    errCategoryMessage: string,
    categoryResultsFound: boolean | null,
    categoryList: ICategory[],
    titleRecordAdded: boolean | null,
    errTitleName: string,
    errCategoryID: string,
    txtTitleName: string | undefined,
    txtAuthorFirstName: string | undefined,
    txtAuthorLastName: string | undefined,
    txtPublicationDate: string | undefined,
    txtImageName: string | undefined,
    ddCategoryID: number | null | unknown,
    txtShortDescription: string | undefined,
    txtUrlPKDweb: string | undefined,
    titleID: number | null,
    titleName: string | null,
    titleSort: string | null,
    authorFirstName: string | null,
    authorLastName: string | null,
    publicationDate: Date | null,
    imageName: string | null,
    categoryID: number | null,
    shortDescription: string | null,
    urlPKDweb: string | null,
    active: boolean | null
};

class AddTitle extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            message: "",
            errMessage: "",
            modal: false,
            categoryMessage: "",
            errCategoryMessage: "",
            categoryResultsFound: null,
            categoryList: [],
            titleRecordAdded: null,
            errTitleName: "",
            errCategoryID: "",
            txtTitleName: undefined,
            txtAuthorFirstName: undefined,
            txtAuthorLastName: undefined,
            txtPublicationDate: undefined,
            txtImageName: undefined,
            ddCategoryID: null,
            txtShortDescription: undefined,
            txtUrlPKDweb: undefined,
            titleID: null,
            titleName: null,
            titleSort: null,
            authorFirstName: null,
            authorLastName: null,
            publicationDate: null,
            imageName: null,
            categoryID: null,
            shortDescription: null,
            urlPKDweb: null,
            active: null
        };

    };

    getCategories = () => {
        // console.log("AddTitle.tsx getCategories");
        // console.log("AddTitle.tsx getCategories baseURL", baseURL);

        this.setState({categoryMessage: ""});
        this.setState({errCategoryMessage: ""});
        this.setState({categoryResultsFound: null});
        this.setState({categoryList: []});

        let url: string = baseURL + "category/";

        fetch(url)
        .then(response => {
            // console.log("AddTitle.tsx getCategories response", response);
            if (!response.ok) {
                throw Error(response.status + " " + response.statusText + " " + response.url);
            } else {
                return response.json();
            };
        })
        .then(data => {
            // console.log("AddTitle.tsx getCategories data", data);

            this.setState({categoryResultsFound: data.resultsFound});
            // this.setState({categoryMessage: data.message});

            if (data.resultsFound === true) {

                this.setState({categoryList: data.categories});

            } else {
                this.setState({errCategoryMessage: data.message});
            };

        })
        .catch(error => {
            console.log("AddTitle.tsx getCategories error", error);
            // console.log("AddTitle.tsx getCategories error.name", error.name);
            // console.log("AddTitle.tsx getCategories error.message", error.message);
            this.setState({errCategoryMessage: error.name + ": " + error.message});
        });

    };

    addTitle = () => {
        // console.log("AddTitle.tsx addTitle");
        // console.log("AddTitle.tsx addTitle baseURL", baseURL);

        this.setState({message: ""});
        this.setState({errMessage: ""});
        this.setState({titleRecordAdded: null});
        this.setState({errTitleName: ""});
        this.setState({errCategoryID: ""});
        this.setState({titleID: null});
        this.setState({titleName: null});
        this.setState({titleSort: null});
        this.setState({authorFirstName: null});
        this.setState({authorLastName: null});
        this.setState({publicationDate: null});
        this.setState({imageName: null});
        this.setState({categoryID: null});
        this.setState({shortDescription: null});
        this.setState({urlPKDweb: null});
        this.setState({active: null});

        let titleNameValidated: boolean  = false;
        let categoryIDValidated: boolean  = false;
        let formValidated: boolean  = false;

        if (this.state.txtTitleName !== undefined && this.state.txtTitleName !== null) {
            if (this.state.txtTitleName.trim().length > 0) {
                titleNameValidated = true;
                this.setState({errTitleName: ""});
                // console.log("AddTitle.tsx addTitle Valid TitleName");
                // console.log("AddTitle.tsx addTitle titleNameValidated true", titleNameValidated);
            } else {
                titleNameValidated = false;
                this.setState({errTitleName: "Please enter a title."});
                // console.log("AddTitle.tsx addTitle Invalid TitleName");
                // console.log("AddTitle.tsx addTitle titleNameValidated false", titleNameValidated);
            };
        };

        if (this.state.ddCategoryID !== undefined) {
            if (this.state.ddCategoryID !== null) {
                categoryIDValidated = true;
                this.setState({errCategoryID: ""});
                // console.log("AddTitle.tsx addTitle Valid CategoryID");
                // console.log("AddTitle.tsx addTitle categoryIDValidated true", categoryIDValidated);
            } else {
                categoryIDValidated = false;
                this.setState({errCategoryID: "Please select a category."});
                // console.log("AddTitle.tsx addTitle Invalid CategoryID");
                // console.log("AddTitle.tsx addTitle categoryIDValidated false", categoryIDValidated);
            };
        };

        if (titleNameValidated === true && categoryIDValidated === true) {
            formValidated = true;
            // console.log("AddTitle.tsx addTitle Valid Form");
            // console.log("AddTitle.tsx addTitle formValidated true", formValidated);
        } else {
            formValidated = false;
            // console.log("AddTitle.tsx addTitle Invalid Form");
            // console.log("AddTitle.tsx addTitle formValidated false", formValidated);
        };

        // console.log("AddTitle.tsx addTitle titleNameValidated", titleNameValidated);
        // console.log("AddTitle.tsx addTitle categoryIDValidated", categoryIDValidated);
        // console.log("AddTitle.tsx addTitle formValidated", formValidated);

        if (formValidated === true && this.props.sessionToken !== null) {

            if (this.state.txtTitleName !== undefined && this.state.txtTitleName !== null) {

                let titleObject = {
                    titleName: this.state.txtTitleName.trim(),
                    // authorFirstName: this.state.txtAuthorFirstName.trim(),
                    // authorLastName: this.state.txtAuthorLastName.trim(),
                    // imageName: this.state.txtImageName.trim(),
                    categoryID: this.state.ddCategoryID
                    // shortDescription: this.state.txtShortDescription.trim(),
                    // urlPKDweb: this.state.txtUrlPKDweb.trim()
                };

                // If the user doesn't enter an author first name, then it isn't added/updated
                if (this.state.txtAuthorFirstName !== null && this.state.txtAuthorFirstName !== undefined) {
                    if (this.state.txtAuthorFirstName.trim().length !== 0) {
                        Object.assign(titleObject, {authorFirstName: this.state.txtAuthorFirstName.trim()});
                    };
                };

                // If the user doesn't enter an author last name, then it isn't added/updated
                if (this.state.txtAuthorLastName !== null && this.state.txtAuthorLastName !== undefined) {
                    if (this.state.txtAuthorLastName.trim().length !== 0) {
                        Object.assign(titleObject, {authorLastName: this.state.txtAuthorLastName.trim()});
                    };
                };

                // If the user doesn't enter an image name then it isn't added/updated
                if (this.state.txtImageName !== null && this.state.txtImageName !== undefined) {
                    if (this.state.txtImageName.trim().length !== 0) {
                        Object.assign(titleObject, {imageName: this.state.txtImageName.trim()});
                    };
                };

                // If the user doesn't enter a publication date, then it isn't added/updated
                if (this.state.txtPublicationDate !== null && this.state.txtPublicationDate !== undefined) {
                    if (this.state.txtPublicationDate.trim().length !== 0) {
                        Object.assign(titleObject, {publicationDate: this.state.txtPublicationDate.trim()});
                    };
                };


                // If the user doesn't enter a short description, then it isn't added/updated
                if (this.state.txtShortDescription !== null && this.state.txtShortDescription !== undefined) {
                    if (this.state.txtShortDescription.trim().length !== 0) {
                        Object.assign(titleObject, {shortDescription: this.state.txtShortDescription.trim()});
                    };
                };

                // If the user doesn't enter a url for PKDweb, then it isn't added/updated
                if (this.state.txtUrlPKDweb !== null && this.state.txtUrlPKDweb !== undefined) {
                    if (this.state.txtUrlPKDweb.trim().length !== 0) {
                        Object.assign(titleObject, {urlPKDweb: this.state.txtUrlPKDweb.trim()});
                    };
                };

                // console.log("AddTitle.tsx addTitle titleObject", titleObject);

                let url: string = baseURL + "title/";
                // console.log("AddTitle.tsx addTitle url", url);

                fetch(url, {
                    method: "POST",
                    headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": this.props.sessionToken
                    }),
                    body: JSON.stringify({title: titleObject})
                })
                .then(response => {
                    // console.log("AddTitle.tsx addTitle response", response);
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
                    // console.log("AddTitle.tsx addTitle data", data);

                    this.setState({titleRecordAdded: data.recordAdded});
                    this.setState({message: data.message});

                    if (data.recordAdded === true) {

                        // this.setState({txtTitleName: data.titleName});

                        this.setState({titleID: data.titleID});
                        this.setState({titleName: data.titleName});
                        this.setState({titleSort: data.titleSort});
                        this.setState({authorFirstName: data.authorFirstName});
                        this.setState({authorLastName: data.authorLastName});
                        this.setState({publicationDate: data.publicationDate});
                        this.setState({imageName: data.imageName});
                        this.setState({categoryID: data.categoryID});
                        this.setState({shortDescription: data.shortDescription});
                        this.setState({urlPKDweb: data.urlPKDweb});
                        this.setState({active: data.active});

                        // if (this.props.setTitleUpdated !== undefined) {
                            // this.props.titleUpdated();
                            this.props.setTitleUpdated(!this.props.titleUpdated);
                        // };
                        // Need to call this here because there are two buttons on the form besides the Cancel button
                        this.toggle();

                    } else {
                        // this.setState({errMessage: data.error});
                        this.setState({errMessage: data.errorMessages});
                    };

                })
                .catch(error => {
                    console.log("AddTitle.tsx addTitle error", error);
                    // console.log("AddTitle.tsx addTitle error.name", error.name);
                    // console.log("AddTitle.tsx addTitle error.message", error.message);
                    this.setState({errMessage: error.name + ": " + error.message});
                });

            };

        };

    };

    componentDidMount() {
        this.getCategories();
    };

    // handleOpen = () => {
    //     this.setState({dialogOpen: true});
    // };
    
    // handleClose = () => {
    //     this.setState({dialogOpen: false});
    // };

    toggle = () => {
        this.setState({modal: !this.state.modal});
    };

    createImageName = (titleName: string | undefined) => {

        let newImageName: string = "";

        if (titleName !== undefined) {
            newImageName = titleName.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
            // I'm sure there's a more elegant way to do this
            // newImageName = newImageName.replaceAll(".", "");
            // newImageName = newImageName.replaceAll("?", "");
            // newImageName = newImageName.replaceAll(",", "");
            // newImageName = newImageName.replaceAll(":", "");
            // newImageName = newImageName.replaceAll("-", "");
            newImageName = newImageName.replace(/[.,\/#\'\?!$%\^&\*;:{}=\-_`~()]/g,"");
            newImageName = newImageName.replaceAll(" ", "");
            // Remove all spaces - Doesn't work
            // newImageName = newImageName.replace(/\s{2,}/g," ");

            newImageName = "https://philipdick.com/images/covers/" + newImageName + ".jpg";
        };

        this.setState({txtImageName: newImageName});

        return newImageName;
    };

    render() {

        // console.log("AddTitle.tsx this.props.isAdmin", this.props.isAdmin);

        if (this.props.isAdmin !== true) {
            return <Redirect to="/" />;
        };

        return(
            <React.Fragment>
                            
            {this.props.displayButton === true ?  <Button outline size="sm" color="info" onClick={this.toggle}>Add Title</Button> : null}

            {this.props.displayIcon === true ? <Plus className="addEditIcon" onClick={this.toggle} /> : null}

            <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                <ModalHeader toggle={this.toggle}>Add Title</ModalHeader>
                <ModalBody>
                <Form>
                <FormGroup>
                {this.state.message !== "" ? <Alert severity="info">{this.state.message}</Alert> : null}
                {this.state.errMessage !== "" ? <Alert severity="error">{this.state.errMessage}</Alert> : null}
                {this.state.categoryMessage !== "" ? <Alert severity="info">{this.state.categoryMessage}</Alert> : null}
                {this.state.errCategoryMessage !== "" ? <Alert severity="error">{this.state.errCategoryMessage}</Alert> : null}
                </FormGroup>

                <FormGroup>

                <Label for="txtTitleName">Title</Label>
                <Input type="text" id="txtTitleName" value={this.state.txtTitleName} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtTitleName: event.target.value});}} />
                {this.state.errTitleName !== "" ? <Alert severity="error">{this.state.errTitleName}</Alert> : null}

                </FormGroup>
                <FormGroup>

                <Label for="txtAuthorFirstName">Author First Name</Label>
                <Input type="text" id="txtAuthorFirstName" value={this.state.txtAuthorFirstName} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtAuthorFirstName: event.target.value});}} />

                </FormGroup>
                <FormGroup>
                    
                <Label for="txtAuthorLastName">Author Last Name</Label>
                <Input type="text" id="txtAuthorLastName" value={this.state.txtAuthorLastName} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtAuthorLastName: event.target.value});}} />

                </FormGroup>

                <FormGroup row>
                <Col>

                <Label id="lblCategoryID" for="lblCategoryID">Category</Label>
                <Input type="select" id="ddCategoryID" labelId="lblCategoryID" /*value={this.state.ddCategoryID}*/ onChange={(event) => {/*console.log(event.target.value);*/ this.setState({ddCategoryID: event.target.value});}}>
                <option selected value="">Select a Category</option>
                {this.state.categoryList.map((category: ICategory) => {
                return (
                    <option value={category.categoryID}>{category.category}</option>
                    )
                })}
                </Input>
                {this.state.errCategoryID !== "" ? <Alert severity="error">{this.state.errCategoryID}</Alert> : null}

                </Col>
                <Col>
                        
                <Label for="txtPublicationDate">Publication Date</Label>
                <Input type="date" id="txtPublicationDate" value={this.state.txtPublicationDate} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtPublicationDate: event.target.value});}} />

                </Col>

                </FormGroup>

                <FormGroup>
                    
                <Label for="txtImageName">Image Name</Label>
                <Button outline size="small" color="secondary" onClick={() => {/*console.log(event.target.value);*/ this.createImageName(this.state.txtTitleName);}}>Create Image Name</Button>
                {/* <Button outline size="small" color="secondary" onClick={() => {this.setState({txtImageName: "https://philipdick.com/images/covers/" + this.state.txtImageName});}}>Add Path</Button> */}
                <Input type="text" id="txtImageName" value={this.state.txtImageName} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtImageName: event.target.value});}} />
                {this.state.txtImageName !== null && this.state.txtImageName !== undefined && this.state.txtImageName !== "" ? <img src={this.state.txtImageName} alt={this.state.txtTitleName} className="coverThumbnail" /> : <Image size="150" className="noImageIcon"/>}

                </FormGroup>
                <FormGroup>
                    
                <Label for="txtShortDescription">Short Description</Label>
                <Input type="textarea" id="txtShortDescription" rows={10} value={this.state.txtShortDescription} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtShortDescription: event.target.value});}} />
    
                </FormGroup>
                <FormGroup>
                    
                <Label for="txtUrlPKDweb">url PKDweb</Label>
                <Input type="text" id="txtUrlPKDweb" value={this.state.txtUrlPKDweb} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtUrlPKDweb: event.target.value});}} />

                </FormGroup>

                <ModalFooter>
    
                 <Button outline size="lg" color="primary" onClick={this.addTitle}>Add Title</Button>
                 <Button outline size="lg" color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
                </Form>
            </ModalBody>
          </Modal>
            </React.Fragment>
        );
    };
};

export default AddTitle;