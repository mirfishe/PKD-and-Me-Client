import React, {Component} from "react";
import {Container, Col, Row, Alert} from "reactstrap";
import {ICategory, ITitle} from "../../Helpers/interfaces";
import {baseURL} from "../../Helpers/constants";
import About from "./About";
import Category from "../Categories/Category";
import Title from "../Titles/Title";
import TitleItem from "../Titles/TitleItem";

interface IProps {
    userID: number | null,
    isAdmin: boolean,
    sessionToken: string | null,
    titleID: number | null,
    setTitleID: (titleID: number | null) => void,
    categoryID: number | null,
    setCategoryID: (categoryID: number | null) => void,
    titleSort: string | null
    setTitleSort: (titleSort: string | null) => void,
    titleUpdated: boolean,
    setTitleUpdated: (titleUpdated: boolean) => void
};

interface IState {
    categoryMessage: string,
    errCategoryMessage: string,
    categoryResultsFound: boolean | null,
    categoryList: ICategory[],
    // categoryID: number | null | undefined,
    categoryName: string,
    titleMessage: string,
    errTitleMessage: string,
    titleResultsFound: boolean | null,
    titleList: ITitle[]
};

class Home extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            categoryMessage: "",
            errCategoryMessage: "",
            categoryResultsFound: null,
            categoryList: [],
            // categoryID: null,
            categoryName: "",
            titleMessage: "",
            errTitleMessage: "",
            titleResultsFound: null,
            titleList: []
        };

        // this.getCategories = this.getCategories.bind(this);
        // this.getTitles = this.getTitles.bind(this);

    };

    getCategories = () => {
        // console.log("Home.tsx getCategories");
        // console.log("Home.tsx getCategories baseURL", baseURL);

        this.setState({categoryMessage: ""});
        this.setState({errCategoryMessage: ""});
        this.setState({categoryResultsFound: null});
        this.setState({categoryList: []});

        // console.log("Home.tsx getCategories this.props.categoryID", this.props.categoryID);
        this.props.setCategoryID(null);
        // console.log("Home.tsx getCategories this.props.titleID", this.props.titleID);
        this.props.setTitleID(null);

        let url: string = baseURL + "category/";

        // This is not working here because the values aren't loaded into props before the component renders
        // console.log("Home.tsx getCategories this.props.isAdmin", this.props.isAdmin);
        // console.log("Home.tsx getCategories this.props.sessionToken", this.props.sessionToken);
        if (this.props.sessionToken !== "" && this.props.sessionToken !== null && this.props.isAdmin === true) {
            url = url + "admin";
        };

        const fetchHeaders: Headers = new Headers({});
        Object.assign(fetchHeaders, {"Content-Type": "application/json"});

        // If the user isn't logged in, there's no this.props.sessionToken to send in the request headers
        if (this.props.sessionToken !== null && this.props.sessionToken !== undefined) {
            Object.assign(fetchHeaders, {Authorization: this.props.sessionToken});
        } else {
            Object.assign(fetchHeaders, {Authorization: ""});
        };
        
        // console.log("Home.tsx getCategories url", url);

        fetch(url, {
            method: "GET",
            headers: fetchHeaders
        })
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

    getTitles = (categoryID: number | null) => {
        // console.log("Home.tsx getTitles");
        // console.log("Home.tsx getTitles baseURL", baseURL);

        this.setState({categoryName: ""});
        this.setState({titleMessage: ""});
        this.setState({errTitleMessage: ""});
        this.setState({titleResultsFound: null});
        this.setState({titleList: []});

        // console.log("Home.tsx getTitles this.props.categoryID", this.props.categoryID);
        // this.props.setCategoryID(null);
        // console.log("Home.tsx getTitles this.props.titleID", this.props.titleID);
        this.props.setTitleID(null);

        // console.log("Home.tsx getTitles categoryID", categoryID);
        // this.setState({categoryID: categoryID});
        // console.log("Home.tsx getTitles this.props.categoryID", this.props.categoryID);
        this.props.setCategoryID(categoryID);

        let url: string = baseURL + "title/";

        // console.log("Home.tsx getTitles this.props.isAdmin", this.props.isAdmin);
        // console.log("Home.tsx getTitles this.props.sessionToken", this.props.sessionToken);

        if (this.props.sessionToken !== "" && this.props.sessionToken !== null && this.props.isAdmin === true) {

            // This isn't validating the admin properly when going through the fetch but works fine in Postman
            // url = url + "admin/";
            // console.log("Home.tsx getTitles isAdmin url", url);

        };

        // if (this.state.categoryID !== null) {
        //     url = url + "/category/" + this.state.categoryID;
        // };

        // Not working correctly? Is this.props.setCategoryID(categoryID); too slow?
        // if (this.props.categoryID !== undefined && this.props.categoryID !== null) {
        //     url = url + "category/" + categoryID;
        // };
        if (categoryID !== undefined && categoryID !== null) {
            url = url + "category/" + categoryID;
        };

        if (this.props.titleSort !== undefined && this.props.titleSort !== null) {
            // url = url + "/" + "publicationDate";
            url = url + "/" + this.props.titleSort;
        };

        // console.log("Home.tsx getTitles url", url);

        const fetchHeaders: Headers = new Headers({});
        Object.assign(fetchHeaders, {"Content-Type": "application/json"});

        // If the user isn't logged in, there's no this.props.sessionToken to send in the request headers
        if (this.props.sessionToken !== null && this.props.sessionToken !== undefined) {
            Object.assign(fetchHeaders, {Authorization: this.props.sessionToken});
        } else {
            Object.assign(fetchHeaders, {Authorization: ""});
        };

        // console.log("Home.tsx getTitles fetchHeaders", fetchHeaders);
        
        fetch(url, {
            method: "GET",
            headers: fetchHeaders
        })
        .then(response => {
            // console.log("Home.tsx getTitles response", response);
            if (!response.ok) {
                throw Error(response.status + " " + response.statusText + " " + response.url);
            } else {
                return response.json();
            };
        })
        .then(data => {
            // console.log("Home.tsx getTitles data", data);

            // let titleResponse: IGetResponse = data;
            // console.log("Home.tsx getTitles titleResponse", titleResponse);

            this.setState({titleResultsFound: data.resultsFound});
            // this.setState({titleMessage: data.message});

            if (data.resultsFound === true) {
                this.setState({titleList: data.titles});

                // Added this because the display of the property of the objects in the titleList isn't working
                if (data.titles[0].category !== undefined && data.titles[0].category !== null) {
                    this.setState({categoryName: data.titles[0].category.category});
                };

                // for (let i = 0; i < this.state.titleList.length; i++) {

                //     // console.log("Home.tsx getTitles data.titles[i].category", data.titles[i].category);
                //     // console.log("Home.tsx getTitles data.titles[i].category.category", data.titles[i].category.category);

                //     if (data.titles[i].category !== undefined && data.titles[i].category !== null) {

                //         Object.assign(this.state.titleList[i], {categoryName: data.titles[i].category.category});

                //     };

                //     // console.log("Home.tsx getTitles this.state.titleList[i]", this.state.titleList[i]);
                // };

            } else {
                this.setState({errTitleMessage: data.message});
            };

        })
        .catch(error => {
            console.log("Home.tsx getTitles error", error);
            // console.log("Home.tsx getTitles error.name", error.name);
            // console.log("Home.tsx getTitles error.message", error.message);
            this.setState({errTitleMessage: error.name + ": " + error.message});
        });

    };
    
    componentDidMount() {
        this.getCategories();
      };

    componentDidUpdate(prevProps: IProps) {
        if (this.props.titleSort !== prevProps.titleSort) {
            // console.log("Home.tsx componentDidUpdate prevProps.categoryID", prevProps.categoryID);
            // console.log("Home.tsx componentDidUpdate this.props.categoryID", this.props.categoryID);
            // console.log("Home.tsx componentDidUpdate prevProps.titleSort", prevProps.titleSort);
            // console.log("Home.tsx componentDidUpdate this.props.titleSort", this.props.titleSort);
            this.getTitles(this.props.categoryID);
        };

        if (this.props.categoryID !== prevProps.categoryID) {
            // console.log("Home.tsx componentDidUpdate prevProps.categoryID", prevProps.categoryID);
            // console.log("Home.tsx componentDidUpdate this.props.categoryID", this.props.categoryID);
            this.setState({categoryName: ""});
            this.setState({titleMessage: ""});
            this.setState({errTitleMessage: ""});
            this.setState({titleResultsFound: null});
            this.setState({titleList: []});
        };

        if (this.props.titleID !== prevProps.titleID) {
            // console.log("Home.tsx componentDidUpdate prevProps.titleID", prevProps.titleID);
            // console.log("Home.tsx componentDidUpdate this.props.titleID", this.props.titleID);
            this.setState({categoryName: ""});
            this.setState({titleMessage: ""});
            this.setState({errTitleMessage: ""});
            this.setState({titleResultsFound: null});
            this.setState({titleList: []});
        };
    };

    render() {

        return(
            <Container>
             <Row>

                <Col xs="2">
                {this.state.categoryMessage !== "" ? <Alert color="info">{this.state.categoryMessage}</Alert> : null}
                {this.state.errCategoryMessage !== "" ? <Alert color="danger">{this.state.errCategoryMessage}</Alert> : null}
                {this.state.categoryResultsFound !== null ? <Category userID={this.props.userID} isAdmin={this.props.isAdmin} sessionToken={this.props.sessionToken} getTitles={this.getTitles} categoryList={this.state.categoryList} /> : null}
                </Col>

                {this.props.titleID !== null ?
                <Col xs="10">
                <Title userID={this.props.userID} isAdmin={this.props.isAdmin} sessionToken={this.props.sessionToken} titleID={this.props.titleID} setTitleID={this.props.setTitleID} getTitles={this.getTitles} titleUpdated={this.props.titleUpdated} setTitleUpdated={this.props.setTitleUpdated} />
                </Col>
                :
                <Col xs="10">
                {this.state.titleMessage !== "" ? <Alert color="info">{this.state.titleMessage}</Alert> : null}
                {this.state.errTitleMessage !== "" ? <Alert color="danger">{this.state.errTitleMessage}</Alert> : null}
                {this.state.titleResultsFound ? <TitleItem userID={this.props.userID} isAdmin={this.props.isAdmin} sessionToken={this.props.sessionToken} /*getEditions={this.getEditions}*/ /*titleID={this.props.titleID}*/ setTitleID={this.props.setTitleID} titleList={this.state.titleList} /*getTitles={this.getTitles}*/ categoryID={this.props.categoryID} categoryName={this.state.categoryName} titleUpdated={this.props.titleUpdated} setTitleUpdated={this.props.setTitleUpdated} titleSort={this.props.titleSort} setTitleSort={this.props.setTitleSort} /> : <About />}
                </Col>
                }

            </Row>
          </Container>
        );
    };
};

export default Home;