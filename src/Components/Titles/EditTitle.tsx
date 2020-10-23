import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, Alert, Button} from "reactstrap";
import {Image, PencilSquare} from 'react-bootstrap-icons';
import {baseURL} from "../../Helpers/constants";
import {ITitle, ICategory} from "../../Helpers/interfaces";

interface IProps {
    userID: number | null,
    isAdmin: boolean,
    sessionToken: string | null,
    titleID: number | null,
    setTitleID: (titleID: number | null) => void,
    // titleUpdated: () => void,
    titleUpdated?: boolean,
    setTitleUpdated?: (titleUpdated: boolean) => void,
    displayIcon?: boolean,
    displayButton?: boolean
};

interface IState {
    message: string,
    errMessage: string,
    modal: boolean,
    titleResultsFound: boolean | null,
    titleRecordUpdated: boolean | null,
    titleRecordDeleted: boolean | null,
    titleMessage: string,
    errTitleMessage: string,
    titleList: ITitle[],
    categoryMessage: string,
    errCategoryMessage: string,
    categoryResultsFound: boolean | null,
    categoryList: ICategory[],
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

class EditTitle extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            message: "",
            errMessage: "",
            modal: false,
            titleResultsFound: null,
            titleRecordUpdated: null,
            titleRecordDeleted: null,
            titleMessage: "",
            errTitleMessage: "",
            titleList: [],
            categoryMessage: "",
            errCategoryMessage: "",
            categoryResultsFound: null,
            categoryList: [],
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
        // console.log("EditTitle.tsx getCategories");
        // console.log("EditTitle.tsx getCategories baseURL", baseURL);

        this.setState({categoryMessage: ""});
        this.setState({errCategoryMessage: ""});
        this.setState({categoryResultsFound: null});
        this.setState({categoryList: []});

        let url: string = baseURL + "category/";

        fetch(url)
        .then(response => {
            // console.log("EditTitle.tsx getCategories response", response);
            if (!response.ok) {
                throw Error(response.status + " " + response.statusText + " " + response.url);
            } else {
                return response.json();
            };
        })
        .then(data => {
            // console.log("EditTitle.tsx getCategories data", data);

            this.setState({categoryResultsFound: data.resultsFound});
            // this.setState({categoryMessage: data.message});

            if (data.resultsFound === true) {

                this.setState({categoryList: data.categories});

            } else {
                this.setState({errCategoryMessage: data.message});
            };

        })
        .catch(error => {
            console.log("EditTitle.tsx getCategories error", error);
            // console.log("EditTitle.tsx getCategories error.name", error.name);
            // console.log("EditTitle.tsx getCategories error.message", error.message);
            this.setState({errCategoryMessage: error.name + ": " + error.message});
        });

    };

    getTitle= (/*titleID?: number | null*/) => {
        // console.log("EditTitle.tsx getTitle);
        // console.log("EditTitle.tsx getTitle baseURL", baseURL);

        this.setState({titleMessage: ""});
        this.setState({errTitleMessage: ""});
        this.setState({titleResultsFound: null});
        this.setState({titleList: []});
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

        let url: string = baseURL + "title/";

        // if (titleID !== undefined && titleID !== null) {
        //     if (!isNaN(titleID)) {
        //         console.log("EditTitle.tsx getTitle titleID", titleID);
        //     };
        // };

        if (this.props.titleID !== null) {
            url = url + this.props.titleID;

            // console.log("EditTitle.tsx getTitle url", url);

            fetch(url)
            .then(response => {
                // console.log("EditTitle.tsx getTitle response", response);
                if (!response.ok) {
                    throw Error(response.status + " " + response.statusText + " " + response.url);
                } else {
                    return response.json();
                };
            })
            .then(data => {
                // console.log("EditTitle.tsx getTitle data", data);

                this.setState({titleResultsFound: data.resultsFound});
                // this.setState({titleMessage: data.message});

                if (data.resultsFound === true) {
                    this.setState({titleList: data.titles});

                    this.setState({ddCategoryID: data.titles[0].categoryID});

                    if (data.titles[0].publicationDate !== undefined && data.titles[0].publicationDate !== null) {
                        this.setState({txtPublicationDate: data.titles[0].publicationDate.toString().substring(0, 10)});
                    } else {
                        this.setState({txtPublicationDate: undefined});
                    };

                    this.setState({txtTitleName: data.titles[0].titleName});
                    this.setState({txtAuthorFirstName: data.titles[0].authorFirstName});
                    this.setState({txtAuthorLastName: data.titles[0].authorLastName});
                    this.setState({txtImageName: data.titles[0].imageName});
                    this.setState({txtShortDescription: data.titles[0].shortDescription});
                    this.setState({txtUrlPKDweb: data.titles[0].urlPKDweb});

                    
                    this.setState({titleName: data.titles[0].titleName});
                    this.setState({authorFirstName: data.titles[0].authorFirstName});
                    this.setState({authorLastName: data.titles[0].authorLastName});
                    this.setState({publicationDate: data.titles[0].publicationDate});
                    this.setState({imageName: data.titles[0].imageName});
                    this.setState({categoryID: data.titles[0].categoryID});
                    this.setState({shortDescription: data.titles[0].shortDescription});
                    this.setState({urlPKDweb: data.titles[0].urlPKDweb});
                    this.setState({active: data.titles[0].active});


                } else {
                    this.setState({errTitleMessage: data.message});
                };

            })
            .catch(error => {
                console.log("EditTitle.tsx getTitle error", error);
                // console.log("EditTitle.tsx getTitle error.name", error.name);
                // console.log("EditTitle.tsx getTitle error.message", error.message);
                this.setState({errTitleMessage: error.name + ": " + error.message});
            });

        };

    };

    updateTitle = (deleteTitle: boolean) => {
        // console.log("EditTitle.tsx updateTitle");
        // console.log("EditTitle.tsx updateTitle baseURL", baseURL);

        this.setState({message: ""});
        this.setState({errMessage: ""});
        this.setState({titleRecordUpdated: null});
        this.setState({errTitleName: ""});
        this.setState({errCategoryID: ""});
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
                // console.log("EditTitle.tsx updateTitle Valid TitleName");
                // console.log("EditTitle.tsx updateTitle titleNameValidated true", titleNameValidated);
            } else {
                titleNameValidated = false;
                this.setState({errTitleName: "Please enter a title."});
                // console.log("EditTitle.tsx updateTitle Invalid TitleName");
                // console.log("EditTitle.tsx updateTitle titleNameValidated false", titleNameValidated);
            };
        };

        if (this.state.ddCategoryID !== undefined) {
            if (this.state.ddCategoryID !== null) {
                categoryIDValidated = true;
                this.setState({errCategoryID: ""});
                // console.log("EditTitle.tsx updateTitle Valid CategoryID");
                // console.log("EditTitle.tsx updateTitle categoryIDValidated true", categoryIDValidated);
            } else {
                categoryIDValidated = false;
                this.setState({errCategoryID: "Please select a category."});
                // console.log("EditTitle.tsx updateTitle Invalid CategoryID");
                // console.log("EditTitle.tsx updateTitle categoryIDValidated false", categoryIDValidated);
            };
        };

        if (titleNameValidated === true && categoryIDValidated === true) {
            formValidated = true;
            // console.log("EditTitle.tsx updateTitle Valid Form");
            // console.log("EditTitle.tsx updateTitle formValidated true", formValidated);
        } else {
            formValidated = false;
            // console.log("EditTitle.tsx updateTitle Invalid Form");
            // console.log("EditTitle.tsx updateTitle formValidated false", formValidated);
        };

        // console.log("EditTitle.tsx updateTitle titleNameValidated", titleNameValidated);
        // console.log("EditTitle.tsx updateTitle categoryIDValidated", categoryIDValidated);
        // console.log("EditTitle.tsx updateTitle formValidated", formValidated);

        if (formValidated === true && this.props.sessionToken !== null) {

            if (this.state.txtTitleName !== undefined && this.state.txtTitleName !== null) {

                let titleObject = {
                    titleName: this.state.txtTitleName.trim(),
                    // authorFirstName: this.state.txtAuthorFirstName.trim(),
                    // authorLastName: this.state.txtAuthorLastName.trim(),
                    // imageName: this.state.txtImageName.trim(),
                    categoryID: this.state.ddCategoryID,
                    // shortDescription: this.state.txtShortDescription.trim(),
                    // urlPKDweb: this.state.txtUrlPKDweb.trim()
                    active: !deleteTitle
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

                // console.log("EditTitle.tsx updateTitle titleObject", titleObject);

                let url: string = baseURL + "title/";

                if (this.props.titleID !== null) {
                    url = url + this.props.titleID;
    
                    // console.log("EditTitle.tsx updateTitle url", url);

                    fetch(url, {
                        method: "PUT",
                        headers: new Headers({
                        "Content-Type": "application/json",
                        "Authorization": this.props.sessionToken
                        }),
                        body: JSON.stringify({title: titleObject})
                    })
                    .then(response => {
                        // console.log("EditTitle.tsx updateTitle response", response);
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
                        // console.log("EditTitle.tsx updateTitle data", data);

                        this.setState({titleRecordUpdated: data.recordUpdated});
                        this.setState({message: data.message});

                        if (data.recordUpdated === true) {

                            // this.setState({txtTitleName: data.titleName});

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

                            if (data.active === false) {
                                this.props.setTitleID(null);
                            };

                            if (this.props.setTitleUpdated !== undefined) {
                                // this.props.titleUpdated();
                                this.props.setTitleUpdated(!this.props.titleUpdated);
                            };

                            // Need to call this here because there are two buttons on the form besides the Cancel button
                            this.toggle();

                        } else {
                            // this.setState({errMessage: data.error});
                            this.setState({errMessage: data.errorMessages});
                        };

                    })
                    .catch(error => {
                        console.log("EditTitle.tsx updateTitle error", error);
                        // console.log("EditTitle.tsx updateTitle error.name", error.name);
                        // console.log("EditTitle.tsx updateTitle error.message", error.message);
                        this.setState({errMessage: error.name + ": " + error.message});
                    });

                };

            };

        };

    };

    deleteTitle = () => {
        // console.log("EditTitle.tsx deleteTitle");
        // this.setState({message: "form submitted"});

        this.setState({message: ""});
        this.setState({errMessage: ""});
        this.setState({titleRecordDeleted: null});

        let url: string = baseURL + "title/";

        if (this.props.titleID !== null) {
            url = url + this.props.titleID;

            // console.log("EditTitle.tsx deleteTitle url", url);

            if (this.props.sessionToken !== null) {
            
                fetch(url, {
                    method: "DELETE",
                    headers:    new Headers ({
                        "Content-Type": "application/json",
                        "Authorization": this.props.sessionToken
                    })
                })
                .then(response => {
                    // console.log("EditTitle.tsx deleteTitle response", response);
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
                    // console.log("EditTitle.tsx deleteTitle data", data);

                    this.setState({titleRecordDeleted: data.recordDeleted});

                    this.setState({message: data.message}); // Never seen by the user if the delete was successful

                    if (data.recordDeleted === true) {

                        this.props.setTitleID(null);

                        if (this.props.setTitleUpdated !== undefined) {
                            // this.props.titleUpdated();
                            this.props.setTitleUpdated(!this.props.titleUpdated);
                        };

                        // Need to call this here because there are two buttons on the form besides the Cancel button
                        this.toggle();

                    } else {
                        this.setState({errMessage: data.message});
                    };

                })
                .catch(error => {
                    console.log("EditTitle.tsx deleteTitle error", error);
                    // console.log("EditTitle.tsx deleteTitle error.name", error.name);
                    // console.log("EditTitle.tsx deleteTitle error.message", error.message);
                    this.setState({errMessage: error.name + ": " + error.message});
                });
                
            };

        };

    };

    componentDidMount() {
        this.getCategories();
        this.getTitle();
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

    render() {

        // console.log("AddTitle.tsx this.props.isAdmin", this.props.isAdmin);

        if (this.props.isAdmin !== true) {
            return <Redirect to="/" />;
        };

        return(
            <React.Fragment>

            {this.props.displayButton === true ?  <Button outline size="sm" color="info" onClick={this.toggle}>Edit Title</Button> : null}

            {this.props.displayIcon === true ? <PencilSquare className="addEditIcon" onClick={this.toggle} /> : null}

            <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                <ModalHeader toggle={this.toggle}>Edit Title - {this.state.txtTitleName}</ModalHeader>
                <ModalBody>
                <Form>
                <FormGroup>
                {this.state.message !== "" ? <Alert severity="info">{this.state.message}</Alert> : null}
                {this.state.errMessage !== "" ? <Alert severity="error">{this.state.errMessage}</Alert> : null}
                {this.state.titleMessage !== "" ? <Alert severity="info">{this.state.titleMessage}</Alert> : null}
                {this.state.errTitleMessage !== "" ? <Alert severity="error">{this.state.errTitleMessage}</Alert> : null}
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
                <Button outline size="small" color="secondary" onClick={() => {this.setState({txtImageName: "https://philipdick.com/images/covers/" + this.state.txtImageName});}}>Add Path</Button> https://philipdick.com/images/covers/
                <Button outline size="small" color="secondary" onClick={() => {this.setState({txtImageName: this.state.txtImageName + ".jpg"});}}>Add File Extension</Button> .jpg
                <Input type="text" id="txtImageName" value={this.state.txtImageName} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtImageName: event.target.value});}} />
                {this.state.txtImageName !== null && this.state.txtImageName !== undefined && this.state.txtImageName !== "" ? <img src={this.state.txtImageName} alt="" /> : <Image size="150" className="noImageIcon"/>}

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

                 <Button outline size="lg" color="primary" onClick={(event) => {/*console.log(event.target.value);*/ this.updateTitle(false);}}>Update Title</Button>
                 <Button outline size="lg" color="danger" onClick={(event) => {/*console.log(event.target.value);*/ this.updateTitle(true);}}>Delete Title</Button> {this.props.isAdmin === true ?  <Button outline size="lg" color="warning" onClick={(event) => {/*console.log(event.target.value);*/ this.deleteTitle();}}>Hard Delete Title</Button> : null}
                 <Button outline size="lg" color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
                </Form>
            </ModalBody>
          </Modal>
        </React.Fragment>
        );
    };
};

export default EditTitle;