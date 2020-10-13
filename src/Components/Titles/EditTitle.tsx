import React, {Component} from "react";
import {Redirect} from "react-router-dom";

import {Alert} from '@material-ui/lab/';
import {Grid, Button, TextField, Typography, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';

import {baseURL} from "../../Helpers/constants"
import {ITitle, ICategory} from "../../Helpers/interfaces"

interface IProps {
    userID: number | null,
    // isLoggedIn: boolean | null,
    isAdmin: boolean,
    sessionToken: string,
    titleID: number | null,
    setTitleID: (titleID: number | null) => void,
    // titleUpdated: () => void,
    titleUpdated: boolean,
    setTitleUpdated: (titleUpdated: boolean) => void
};

interface IState {
    message: string,
    errMessage: string,
    dialogOpen: boolean,
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
    txtTitleName: string | null,
    txtAuthorFirstName: string | null,
    txtAuthorLastName: string | null,
    txtPublicationDate: string | null,
    txtImageName: string | null,
    ddCategoryID: number | null | unknown,
    txtShortDescription: string | null,
    txtUrlPKDweb: string | null,
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
            dialogOpen: false,
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
            txtTitleName: null,
            txtAuthorFirstName: null,
            txtAuthorLastName: null,
            txtPublicationDate: null,
            txtImageName: null,
            ddCategoryID: null,
            txtShortDescription: null,
            txtUrlPKDweb: null,
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

    getTitle= () => {
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
                        this.setState({txtPublicationDate: null});
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

        if (formValidated === true) {

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
                if (this.state.txtAuthorFirstName !== null) {
                    if (this.state.txtAuthorFirstName.trim().length !== 0) {
                        Object.assign(titleObject, {authorFirstName: this.state.txtAuthorFirstName.trim()});
                    };
                };

                // If the user doesn't enter an author last name, then it isn't added/updated
                if (this.state.txtAuthorLastName !== null) {
                    if (this.state.txtAuthorLastName.trim().length !== 0) {
                        Object.assign(titleObject, {authorLastName: this.state.txtAuthorLastName.trim()});
                    };
                };

                // If the user doesn't enter an image name then it isn't added/updated
                if (this.state.txtImageName !== null) {
                    if (this.state.txtImageName.trim().length !== 0) {
                        Object.assign(titleObject, {imageName: this.state.txtImageName.trim()});
                    };
                };

                // If the user doesn't enter a publication date, then it isn't added/updated
                if (this.state.txtPublicationDate !== null) {
                    if (this.state.txtPublicationDate.trim().length !== 0) {
                        Object.assign(titleObject, {publicationDate: this.state.txtPublicationDate.trim()});
                    };
                };


                // If the user doesn't enter a short description, then it isn't added/updated
                if (this.state.txtShortDescription !== null) {
                    if (this.state.txtShortDescription.trim().length !== 0) {
                        Object.assign(titleObject, {shortDescription: this.state.txtShortDescription.trim()});
                    };
                };

                // If the user doesn't enter a url for PKDweb, then it isn't added/updated
                if (this.state.txtUrlPKDweb !== null) {
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

                            // this.props.titleUpdated();
                            this.props.setTitleUpdated(!this.props.titleUpdated);
                            // Need to call this here because there are two buttons on the form besides the Cancel button
                            this.handleClose();

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
                    // this.props.titleUpdated();
                    this.props.setTitleUpdated(!this.props.titleUpdated);
                    // Need to call this here because there are two buttons on the form besides the Cancel button
                    this.handleClose();

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

    componentDidMount() {
        this.getCategories();
        this.getTitle();
    };

    handleOpen = () => {
        this.setState({dialogOpen: true});
    };
    
    handleClose = () => {
        this.setState({dialogOpen: false});
    };

    render() {

        // console.log("AddTitle.tsx this.props.isAdmin", this.props.isAdmin);

        if (this.props.isAdmin !== true) {
            return <Redirect to="/" />;
        };

        return(
            <React.Fragment>
            <Button variant="contained" size="small" color="primary" onClick={this.handleOpen}>Edit Title</Button>
            <Dialog open={this.state.dialogOpen} onClose={this.handleClose} fullWidth={true} maxWidth="md">
                <DialogTitle id="form-dialog-title">Edit Title</DialogTitle>
                <DialogContent>
                <Grid item xs={12}>
                {this.state.message !== "" ? <Alert severity="info">{this.state.message}</Alert> : null}
                {this.state.errMessage !== "" ? <Alert severity="error">{this.state.errMessage}</Alert> : null}
                {this.state.titleMessage !== "" ? <Alert severity="info">{this.state.titleMessage}</Alert> : null}
                {this.state.errTitleMessage !== "" ? <Alert severity="error">{this.state.errTitleMessage}</Alert> : null}
                {this.state.categoryMessage !== "" ? <Alert severity="info">{this.state.categoryMessage}</Alert> : null}
                {this.state.errCategoryMessage !== "" ? <Alert severity="error">{this.state.errCategoryMessage}</Alert> : null}
                </Grid>
                <Grid item xs={12}>

                <TextField type="text" id="txtTitleName" label="Title" variant="outlined" fullWidth
                margin="normal" value={this.state.txtTitleName} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtTitleName: event.target.value});}} />
                {this.state.errTitleName !== "" ? <Alert severity="error">{this.state.errTitleName}</Alert> : null}

                </Grid>
                <Grid item xs={12}>

                <TextField type="text" id="txtAuthorFirstName" label="Author First Name" variant="outlined" fullWidth
                margin="normal" value={this.state.txtAuthorFirstName} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtAuthorFirstName: event.target.value});}} />

                </Grid>
                <Grid item xs={12}>

                <TextField type="text" id="txtAuthorLastName" label="Author Last Name" variant="outlined" fullWidth
                margin="normal" value={this.state.txtAuthorLastName} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtAuthorLastName: event.target.value});}} />

                </Grid>
                <Grid item xs={12}>

                <InputLabel id="lblCategoryID">Category</InputLabel>
                <Select id="ddCategoryID" labelId="lblCategoryID" value={this.state.ddCategoryID} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({ddCategoryID: event.target.value});}}>
                <MenuItem value="">Select a Category</MenuItem>
                {this.state.categoryList.map((category: ICategory) => {
                return (
                    <MenuItem value={category.categoryID}>{category.category}</MenuItem>
                    )
                })}
                </Select>
                {this.state.errCategoryID !== "" ? <Alert severity="error">{this.state.errCategoryID}</Alert> : null}

                </Grid>

                <Grid item xs={12}>
                        
                    <Typography component="legend">Publication Date</Typography>
                    <TextField type="date" id="txtPublicationDate" variant="outlined" fullWidth margin="normal" defaultValue={this.state.txtPublicationDate} value={this.state.txtPublicationDate} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtPublicationDate: event.target.value});}} />

                </Grid>
                <Grid item xs={12}>
    
                    <TextField type="text" id="txtImageName" label="Image Name" variant="outlined" fullWidth
              margin="normal" value={this.state.txtImageName} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtImageName: event.target.value});}} />
    
                </Grid>
                <Grid item xs={12}>

                <TextField type="text" id="txtShortDescription" label=" Short Description" variant="outlined" fullWidth
              margin="normal" multiline={true} rows={10} value={this.state.txtShortDescription} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtShortDescription: event.target.value});}} />
    
                    </Grid>

                    <Grid item xs={12}>
    
                    <TextField type="text" id="txtUrlPKDweb" label="url PKDweb" variant="outlined" fullWidth
                margin="normal" value={this.state.txtUrlPKDweb} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtUrlPKDweb: event.target.value});}} />

                </Grid>

                <DialogActions>
                <Button variant="outlined" size="large" color="primary" onClick={(event) => {/*console.log(event.target.value);*/ this.updateTitle(false);}}>Update Title</Button>
                <Button variant="outlined" size="large" color="secondary" onClick={(event) => {/*console.log(event.target.value);*/ this.updateTitle(true);}}>Delete Title</Button> {this.props.isAdmin === true ? <Button variant="outlined" size="large" color="secondary" onClick={(event) => {/*console.log(event.target.value);*/ this.deleteTitle();}}>Hard Delete Title</Button> : null}
                <Button variant="outlined" size="large" color="primary" onClick={this.handleClose}>Cancel</Button>
                </DialogActions>
            </DialogContent>
          </Dialog>
        </React.Fragment>
        );
    };
};

export default EditTitle;