import React, {Component} from "react";
import {Redirect} from "react-router-dom";

import {Alert} from "@material-ui/lab/";
import {Grid, Button, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import {baseURL} from "../../Helpers/constants";

interface IProps {
    userID: number | null,
    isAdmin: boolean,
    sessionToken: string | null,
    displayIcon?: boolean,
    displayButton?: boolean
};

interface IState {
    message: string,
    errMessage: string,
    dialogOpen: boolean,
    categoryRecordAdded: boolean | null,
    errCategory: string,
    txtCategory: string | null,
    categoryID: number | null,
    category: string | null,
    sortID: number | null,
    active: boolean | null
};

class AddCategory extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            message: "",
            errMessage: "",
            dialogOpen: false,
            categoryRecordAdded: null,
            errCategory: "",
            txtCategory: null,
            categoryID: null,
            category: null,
            sortID: null,
            active: null
        };

    };

    addCategory = () => {
        // console.log("AddCategory.tsx addCategory");
        // console.log("AddCategory.tsx addCategory baseURL", baseURL);

        this.setState({message: ""});
        this.setState({errMessage: ""});
        this.setState({categoryRecordAdded: null});
        this.setState({errCategory: ""});
        this.setState({categoryID: null});
        this.setState({category: null});
        this.setState({sortID: null});
        this.setState({active: null});

        let categoryValidated: boolean  = false;
        let formValidated: boolean  = false;

        if (this.state.txtCategory !== undefined && this.state.txtCategory !== null) {
            if (this.state.txtCategory.trim().length > 0) {
                categoryValidated = true;
                this.setState({errCategory: ""});
                // console.log("AddCategory.tsx addCategory Valid Category");
                // console.log("AddCategory.tsx addCategory categoryValidated true", categoryValidated);
            } else {
                categoryValidated = false;
                this.setState({errCategory: "Please enter a category."});
                // console.log("AddCategory.tsx addCategory Invalid Category");
                // console.log("AddCategory.tsx addCategory categoryValidated false", categoryValidated);
            };
        };

        if (categoryValidated === true) {
            formValidated = true;
            // console.log("AddCategory.tsx addCategory Valid Form");
            // console.log("AddCategory.tsx addCategory formValidated true", formValidated);
        } else {
            formValidated = false;
            // console.log("AddCategory.tsx addCategory Invalid Form");
            // console.log("AddCategory.tsx addCategory formValidated false", formValidated);
        };

        // console.log("AddCategory.tsx addCategory categoryValidated", categoryValidated);
        // console.log("AddCategory.tsx addCategory formValidated", formValidated);

        if (formValidated === true && this.props.sessionToken !== null) {

            if (this.state.txtCategory !== undefined && this.state.txtCategory !== null) {

                let categoryObject = {
                    category: this.state.txtCategory.trim()
                };

                // console.log("AddCategory.tsx addCategory categoryObject", categoryObject);

                let url: string = baseURL + "category/";
                // console.log("AddCategory.tsx addCategory url", url);

                fetch(url, {
                    method: "POST",
                    headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": this.props.sessionToken
                    }),
                    body: JSON.stringify({category: categoryObject})
                })
                .then(response => {
                    // console.log("AddCategory.tsx addCategory response", response);
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
                    // console.log("AddCategory.tsx addCategory data", data);

                    this.setState({categoryRecordAdded: data.recordAdded});
                    this.setState({message: data.message});

                    if (data.recordAdded === true) {

                        // this.setState({txtCategory: data.txtCategory});

                        this.setState({categoryID: data.categoryID});
                        this.setState({category: data.category});
                        this.setState({sortID: data.sortID});
                        this.setState({active: data.active});

                    } else {
                        // this.setState({errMessage: data.error});
                        this.setState({errMessage: data.errorMessages});
                    };

                })
                .catch(error => {
                    console.log("AddCategory.tsx addCategory error", error);
                    // console.log("AddCategory.tsx addCategory error.name", error.name);
                    // console.log("AddCategory.tsx addCategory error.message", error.message);
                    this.setState({errMessage: error.name + ": " + error.message});
                });

            };

        };

    };

    handleOpen = () => {
        this.setState({dialogOpen: true});
    };
    
    handleClose = () => {
        this.setState({dialogOpen: false});
    };

    render() {

        // console.log("AddCategory.tsx this.props.isAdmin", this.props.isAdmin);

        if (this.props.isAdmin !== true) {
            return <Redirect to="/" />;
        };

        return(
            <React.Fragment>
                            
            {this.props.displayButton === true ? <Button variant="contained" size="small" color="primary" onClick={this.handleOpen}>Add Category</Button> : null}

            {this.props.displayIcon === true ? <AddIcon className="addEditIcon" onClick={this.handleOpen} /> : null}

            <Dialog open={this.state.dialogOpen} onClose={this.handleClose} fullWidth={true} maxWidth="md">
                <DialogTitle id="form-dialog-title">Add Category</DialogTitle>
                <DialogContent>
                <Grid item xs={12}>
                {this.state.message !== "" ? <Alert severity="info">{this.state.message}</Alert> : null}
                {this.state.errMessage !== "" ? <Alert severity="error">{this.state.errMessage}</Alert> : null}
                </Grid>
                <Grid item xs={12}>

                <TextField type="text" id="txtCategory" label="Category" variant="outlined" fullWidth
                margin="normal" value={this.state.txtCategory} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtCategory: event.target.value});}} />
                {this.state.errCategory !== "" ? <Alert severity="error">{this.state.errCategory}</Alert> : null}

                </Grid>

                <DialogActions>
                    <Button variant="outlined" size="large" color="primary" onClick={this.addCategory}>Add Category</Button>
                    <Button variant="outlined" size="large" color="primary" onClick={this.handleClose}>Cancel</Button>
                </DialogActions>
            </DialogContent>
          </Dialog>
        </React.Fragment>
        );
    };
};

export default AddCategory;