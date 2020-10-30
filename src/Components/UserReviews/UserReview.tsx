import React, {FunctionComponent} from "react";
import {Rating} from "@material-ui/lab/";
import {Container, Col, Row} from "reactstrap";
import {IUserReview} from "../../Helpers/interfaces";
import {displayDate, displayYear} from "../../Helpers/sharedFunctions";
import UpdateUserReview from "../UserReviews/UpdateUserReview";

interface IProps {
    userID: number | null,
    isAdmin: boolean,
    sessionToken: string | null,
    titleID: number | null,
    userReviewUpdated: () => void,
    userReviewList: IUserReview[]
};

const UserReview: FunctionComponent <(IProps)> = props => {

    // console.log("UserReview.tsx props.userReviewList", props.userReviewList);

    return(
        <Container>
            <Row>
            <Col xs="12">
            <h5 className="text-center">User Reviews</h5>
            </Col>
            </Row>
            
            <Row>
        {props.userReviewList.map((userReview: IUserReview) => {
          return (
            <Col xs="12" key={userReview.reviewID}>

            {userReview.rating !== null || (userReview.shortReview !== null && userReview.shortReview !== "") || (userReview.longReview !== null && userReview.longReview !== "") ? 

            <React.Fragment>

            <Row>
            <Col xs="12">
            {userReview.shortReview !== null && userReview.shortReview !== "" ? <h6>{userReview.shortReview}
            {props.userID === userReview.userID || props.isAdmin === true ? <UpdateUserReview userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} titleID={props.titleID} userReviewUpdated={props.userReviewUpdated} reviewID={userReview.reviewID} displayIcon={true} /> : null}
            </h6> : null}
            </Col>
            </Row>

            <Row>
            <Col xs="12">
            {userReview.longReview !== null && userReview.longReview !== "" ? <p>{userReview.longReview}</p> : null}
            </Col>
            </Row>

            <Row>
            <Col xs="5">
                {userReview.rating !== null ? <Rating name="rdoRating" precision={0.1} readOnly defaultValue={0} max={10} value={userReview.rating} /> : null}
            </Col>
            <Col xs="7">
                <p>
                Reviewed by {userReview.userFirstName} on {userReview.updatedAt !== null ? <small>{displayDate(userReview.updatedAt)}</small> : null}
                </p>
            </Col>
            </Row>

            </React.Fragment>
            
            : null}

            </Col>
            )
        })}
            </Row>
        </Container>
    );

};

export default UserReview;
