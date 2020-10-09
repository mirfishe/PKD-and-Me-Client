import React, {Component} from "react";
import {Redirect} from "react-router-dom";

import {Alert} from '@material-ui/lab/';
import {Grid, Button, TextField, Typography, InputLabel, Select, MenuItem} from '@material-ui/core';

import {baseURL} from "../../Helpers/constants"
import {ICategory} from "../../Helpers/interfaces"

interface IProps {
    userID: number | null,
    // isLoggedIn: boolean | null,
    isAdmin: boolean,
    sessionToken: string
};

interface IState {
    message: string,
    errMessage: string,
    categoryMessage: string,
    errCategoryMessage: string,
    categoryResultsFound: boolean | null,
    categoryList: ICategory[],
    titleRecordAdded: boolean | null,
    errTitleName: string,
    errCategoryID: string,
    txtTitleName: string,
    txtAuthorFirstName: string,
    txtAuthorLastName: string,
    txtPublicationDate: string,
    txtImageName: string,
    ddCategoryID: number | null | unknown,
    txtShortDescription: string,
    txtUrlPKDweb: string,
    titleID: number | null,
    titleName: string,
    titleSort: string,
    authorFirstName: string,
    authorLastName: string,
    publicationDate: Date | null,
    imageName: string,
    categoryID: number | null,
    shortDescription: string,
    urlPKDweb: string,
    active: boolean | null
};

class AddTitle extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            message: "",
            errMessage: "",
            categoryMessage: "",
            errCategoryMessage: "",
            categoryResultsFound: null,
            categoryList: [],
            titleRecordAdded: null,
            errTitleName: "",
            errCategoryID: "",
            txtTitleName: "",
            txtAuthorFirstName: "",
            txtAuthorLastName: "",
            txtPublicationDate: "",
            txtImageName: "",
            ddCategoryID: null,
            txtShortDescription: "",
            txtUrlPKDweb: "",
            titleID: null,
            titleName: "",
            titleSort: "",
            authorFirstName: "",
            authorLastName: "",
            publicationDate: null,
            imageName: "",
            categoryID: null,
            shortDescription: "",
            urlPKDweb: "",
            active: null
        };

    };

    getCategories = () => {
        // console.log("Home.tsx getCategories");
        // console.log("Home.tsx getCategories baseURL", baseURL);

        this.setState({categoryMessage: ""});
        this.setState({errCategoryMessage: ""});
        this.setState({categoryResultsFound: null});
        this.setState({categoryList: []});

        let url: string = baseURL + "category/";

        fetch(url)
        .then(response => {
            // console.log("Home.tsx getCategories response", response);
            if (!response.ok) {
                throw Error(response.status + " " + response.statusText + " " + response.url);
            } else {
                return response.json();
            };
        })
        .then(data => {
            // console.log("Home.tsx getCategories data", data);

            // let categoryResponse: IGetResponse = data;
            // console.log("Home.tsx getCategories categoryResponse", categoryResponse);

            this.setState({categoryResultsFound: data.resultsFound});
            // this.setState({categoryMessage: data.message});

            if (data.resultsFound === true) {
                // Would like to remove categories that don't have titles associated with them
                // if (data.categories.titles.length > 0) {
                    this.setState({categoryList: data.categories});
                // };
            } else {
                this.setState({errCategoryMessage: data.message});
            };

        })
        .catch(error => {
            console.log("Home.tsx getCategories error", error);
            // console.log("Home.tsx getCategories error.name", error.name);
            // console.log("Home.tsx getCategories error.message", error.message);
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
        this.setState({titleName: ""});
        this.setState({titleSort: ""});
        this.setState({authorFirstName: ""});
        this.setState({authorLastName: ""});
        this.setState({publicationDate: null});
        this.setState({imageName: ""});
        this.setState({categoryID: null});
        this.setState({shortDescription: ""});
        this.setState({urlPKDweb: ""});
        this.setState({active: null});

        let titleNameValidated: boolean  = false;
        let categoryIDValidated: boolean  = false;
        let formValidated: boolean  = false;

        if (this.state.txtTitleName !== undefined) {
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

        if (formValidated === true) {

            let titleObject = {
                titleName: this.state.txtTitleName,
                authorFirstName: this.state.txtAuthorFirstName,
                authorLastName: this.state.txtAuthorLastName,
                imageName: this.state.txtImageName,
                categoryID: this.state.ddCategoryID,
                shortDescription: this.state.txtShortDescription,
                urlPKDweb: this.state.txtUrlPKDweb
            };

            // If the user doesn't enter a publication date, then it isn't added/updated
            if (this.state.txtPublicationDate.trim().length !== 0) {
                Object.assign(titleObject, {publicationDate: this.state.txtPublicationDate.trim()});
            };

            console.log("AddTitle.tsx addTitle titleObject", titleObject);

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
                console.log("AddTitle.tsx addTitle response", response);
                if (!response.ok) {
                    throw Error(response.status + " " + response.statusText + " " + response.url);
                } else {
                    return response.json();
                };
            })
            .then(data => {
                console.log("AddTitle.tsx addTitle data", data);

                this.setState({titleRecordAdded: data.recordAdded});
                this.setState({message: data.message});

                if (data.recordAdded === true) {

                    // this.setState({txtTitleName: data.txtTitleName});

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

                } else {
                    this.setState({errMessage: data.message});
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

    componentDidMount() {
        this.getCategories();
    };

    render() {

        console.log("AddTitle.tsx this.props.isAdmin", this.props.isAdmin);

        if (this.props.isAdmin !== true) {
            return <Redirect to="/" />;
        };

        return(
            <Grid container spacing={2}>
                <Grid item xs={12}>
                {this.state.message !== "" ? <Alert severity="info">{this.state.message}</Alert> : null}
                {this.state.errMessage !== "" ? <Alert severity="error">{this.state.errMessage}</Alert> : null}
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

                    <Button variant="outlined" color="primary" onClick={this.addTitle}>Add Title</Button>
                    {/* <Button variant="outlined" color="primary" onClick={this.handleClose}>Cancel</Button> */}
        </Grid>
        );
    };
};

export default AddTitle;