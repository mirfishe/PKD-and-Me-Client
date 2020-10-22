import React, {FunctionComponent} from "react";
// import {Redirect} from "react-router-dom";
import {Container, Col, Row, Card, CardBody, CardText, CardHeader, CardImg} from "reactstrap";
import {Image} from 'react-bootstrap-icons';
import {ITitle} from "../../Helpers/interfaces";
import AddTitle from "./AddTitle";
import EditTitle from "./EditTitle";
import AddCategory from "../Categories/AddCategory";

interface IProps {
    userID: number | null,
    isAdmin: boolean,
    sessionToken: string | null,
    titleList: ITitle[],
    getEditions?: (titleID?: number) => void,
    categoryID: number | null,
    categoryName: string,
    // getTitles: (categoryID: number | null) => void,
    // titleID: number | null,
    setTitleID: (titleID: number | null) => void,
    titleSort: string | null
    setTitleSort: (titleSort: string | null) => void
};

const TitleItem: FunctionComponent <(IProps)> = props => {

    // console.log("TitleItem.tsx props.titleList", props.titleList);

    // This no longer works because the React Router changed on App.tsx
    // if (props.titleID) {
    //     return <Redirect to="/title" />;
    // } else {

        return(
            <Container>

                {props.categoryName !== null && props.categoryName !== "" ? 
                <Row>
                <Col xs="12">
                <h5 className="text-center">{props.categoryName}
                {props.isAdmin === true ? <AddCategory userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} displayIcon={true} /> : null}
                <p className="ml-2"> <small>Sort By
                {props.titleSort !== "publicationDate" ? 
                <a href="#" onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ props.setTitleSort("publicationDate")}}>Publication Date</a>
                : null}
                {props.titleSort !== null ? 
                <a href="#" onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ props.setTitleSort(null)}}>Title</a>
                : null}
                {props.isAdmin === true ? <AddTitle userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} displayIcon={true} /> : null}
                </small></p>
                </h5>
                </Col>
                </Row>
                : null}
                
                <Row>
            {props.titleList.map((title: ITitle, index) => {
            return (

                <Col xs="3" key={title.titleID}>

                <Card key={title.titleID}>
                <CardHeader>
                <p><a href="#" onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ props.setTitleID(title.titleID)}}>{title.titleName}</a>
                {props.isAdmin === true ? <EditTitle userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} titleID={title.titleID} setTitleID={props.setTitleID} /*titleUpdated={props.titleUpdated}*/ /*titleUpdated={props.titleUpdated} setTitleUpdated={props.setTitleUpdated}*/ displayIcon={true} /> : null}

                {title.publicationDate !== null ? <span> <small>({title.publicationDate.toString().substring(0, 4)})</small></span> : null}
                </p>
                </CardHeader>
                <CardBody>
                <a href="#" onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ props.setTitleID(title.titleID)}}>
                {title.imageName !== null && title.imageName !== "" ? <CardImg src={title.imageName} alt={title.titleName}
                className="coverImage" /> : <Image size="150" className="noImageIcon" />}
                </a>
                <p>{title.authorFirstName} {title.authorLastName}</p>
                </CardBody>

                {/* <p>{title.shortDescription}</p>
                <p>{title.urlPKDweb}</p> */}
                </Card>
                </Col>
                )
            })}
            </Row>
            </Container>
        );

    // };

};

export default TitleItem;
