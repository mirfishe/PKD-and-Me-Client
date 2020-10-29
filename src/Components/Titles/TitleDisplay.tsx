import React, {FunctionComponent} from "react";
import {Rating} from "@material-ui/lab/";
import {Container, Col, Row} from "reactstrap";
import {Image} from 'react-bootstrap-icons';
import {ITitle} from "../../Helpers/interfaces";
import {displayDate, displayYear} from "../../Helpers/constants";
import AddUserReview from "../UserReviews/AddUserReview";
import UpdateUserReview from "../UserReviews/UpdateUserReview";
import AddTitle from "./AddTitle";
import EditTitle from "./EditTitle";
import AddEdition from "../Editions/AddEdition";
import AddCategory from "../Categories/AddCategory";
import AddMedia from "../Media/AddMedia";

interface IProps {
    titleData: ITitle | null,
    overallTitleRating: number | null,
    overallTitleRatingCount: number,
    categoryName: string | null,
    userID: number | null,
    isAdmin: boolean,
    sessionToken: string | null,
    titleID: number | null,
    setTitleID: (titleID: number | null) => void,
    titlePublicationDate: Date | null,
    userReviewUpdated: () => void,
    userReviewedTitle: boolean,
    userReviewedTitleReviewID: number | null,
    userReviewedTitleRead: boolean | null,
    userReviewedTitleDateRead: Date | null,
    // titleUpdated: () => void,
    titleUpdated: boolean,
    setTitleUpdated: (titleUpdated: boolean) => void
    editionUpdated: () => void
};

const TitleDisplay: FunctionComponent <(IProps)> = props => {

    // console.log("TitleDisplay.tsx props.titleData", props.titleData);

    // if (props.titleData !== undefined ) {

    //     let categoryData: ICategory = props.titleData.category;

    //     if (categoryData !== undefined) {
    //         // console.log("TitleDisplay.tsx categoryData", categoryData);

    //         // console.log("TitleDisplay.tsx categoryData.category", categoryData.category);  

    //         // categoryData is an object not an array if there is only one value in the array?
    //         // if (categoryData.length > 0) {
    //         //     console.log("TitleDisplay.tsx categoryData[0].category", categoryData[0].category);  
    //         // };

    //         if (categoryData.hasOwnProperty("category")) {
    //             // console.log("TitleDisplay.tsx categoryData.category", categoryData.category);  
    //         };

    //         // if (categoryData[0].category !== undefined) {
    //         //     console.log("TitleDisplay.tsx categoryData[0].category", categoryData[0].category);
    //         // };
    //     };

    // };

    // console.log("TitleDisplay.tsx props.titlePublicationDate", props.titlePublicationDate);

    return(

        <Container>
                {props.titleData !== undefined && props.titleData !== null ? 
                <React.Fragment>
            <Row>
            <Col xs="12">
                <h5>{props.titleData.titleName}
                    {props.isAdmin === true ? <EditTitle userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} titleID={props.titleID} setTitleID={props.setTitleID} /*titleUpdated={props.titleUpdated}*/ titleUpdated={props.titleUpdated} setTitleUpdated={props.setTitleUpdated} displayIcon={true} /> : null}

                    {props.titleData.publicationDate !== null ? <span style={{marginLeft: "5px", fontSize: 18}}> ({displayYear(props.titleData.publicationDate)})</span> : null}

                    {props.categoryName !== null && props.categoryName !== "" ? <span style={{marginLeft: "10px", fontSize: 12}}> {props.categoryName}
                    {props.isAdmin === true ? <AddCategory userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} displayIcon={true} /> : null}
                    </span> : null}
                </h5>
            </Col>
            </Row>

            <Row>
            <Col xs="4">
                    {props.titleData.imageName !== null && props.titleData.imageName !== "" ? <img src={props.titleData.imageName} alt={props.titleData.titleName} className="coverDisplay" /> : <Image size="150" className="noImageIcon"/>}
            </Col>

            <Col xs="8">
                <p>{props.titleData.authorFirstName} {props.titleData.authorLastName}</p>

                {props.overallTitleRatingCount > 0 ? 
                <React.Fragment>
                <Rating name="rdoRating" precision={0.1} readOnly defaultValue={0} max={10} value={props.overallTitleRating} />
                <p><small>out of {props.overallTitleRatingCount} review(s)</small></p>
                </React.Fragment>
                : null}

                {props.userReviewedTitleRead === true && props.userReviewedTitleDateRead === null ? <p>Read</p> : null}

                {props.userReviewedTitleDateRead !== null ? <p>Read on {displayDate(props.userReviewedTitleDateRead)}</p> : null}

                {props.sessionToken !== "" && props.userReviewedTitle === false ? <p><AddUserReview userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} titleID={props.titleID} userReviewUpdated={props.userReviewUpdated} displayButton={true} /></p> : null}

                {props.userReviewedTitle === true ? <p><UpdateUserReview userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} titleID={props.titleID} userReviewUpdated={props.userReviewUpdated} reviewID={props.userReviewedTitleReviewID} displayButton={true} /></p> : null}

                {props.isAdmin === true ? <p><AddCategory userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} displayButton={true} /></p> : null}

                {props.isAdmin === true ? <p><AddMedia userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} displayButton={true} /></p> : null}

                {props.isAdmin === true ? <p><AddTitle userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} /*titleUpdated={props.titleUpdated}*/ titleUpdated={props.titleUpdated} setTitleUpdated={props.setTitleUpdated} displayButton={true} /></p> : null}

                {props.isAdmin === true ? <p><AddEdition userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} titleID={props.titleID}  titlePublicationDate={props.titlePublicationDate} editionUpdated={props.editionUpdated} displayButton={true} /></p> : null}

            </Col>
            </Row>
            <Row>
            <Col xs="12">
                {props.titleData.shortDescription !== "" && props.titleData.shortDescription !== null ? <p>{props.titleData.shortDescription}</p> : null}
                {props.titleData.urlPKDweb !== "" && props.titleData.urlPKDweb !== null ? <p><a href={props.titleData.urlPKDweb} target="_blank" rel="noreferrer">Encyclopedia Dickiana</a></p> : null}
                </Col>
            </Row>

        </React.Fragment>
        : null}
        </Container>
    );

};

export default TitleDisplay;
