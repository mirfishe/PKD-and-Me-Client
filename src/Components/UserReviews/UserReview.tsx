import React, {FunctionComponent} from 'react';

import {Grid, Button} from '@material-ui/core';

import {IUserReview} from "../../Helpers/interfaces"
import UpdateUserReview from "../UserReviews/UpdateUserReview";

interface IProps {
    userID: number | null,
    isLoggedIn: boolean | null,
    isAdmin: boolean | null,
    sessionToken: string,
    titleID: number | null,
    userReviewUpdated: () => void
    userReviewList: IUserReview[]
};

const UserReview: FunctionComponent <(IProps)> = props => {

    // console.log('UserReview.tsx props.userReviewList', props.userReviewList);

    return(
        <Grid container>
        {props.userReviewList.map((userReview: IUserReview) => {
          return (
            <Grid item xs={4} key={userReview.reviewID}>

            {userReview.read === null ? <p>Read null</p> : null}
            {userReview.read === true ? <p>Read</p> : null}
            {userReview.read === false ? <p>Not Read</p> : null}

            {userReview.dateRead !== null ? <p>{userReview.dateRead}</p> : null}
            {userReview.dateRead !== null ? <p>{userReview.dateRead.toString().substring(0, 10)}</p> : null}

            {/* {!isNaN(userReview.rating) ? <p>{userReview.rating}</p> : null} */}
            {userReview.rating !== null ? <p>{userReview.rating}</p> : null}
            {userReview.shortReview !== "" ? <p>{userReview.shortReview}</p> : null}
            {userReview.longReview !== "" ? <p>{userReview.longReview}</p> : null}

            {props.userID === userReview.userID ? <UpdateUserReview userID={props.userID} isLoggedIn={props.isLoggedIn} isAdmin={props.isAdmin} sessionToken={props.sessionToken} titleID={props.titleID} userReviewUpdated={props.userReviewUpdated} reviewID={userReview.reviewID} /> : null}

            </Grid>
            )
        })}
        </Grid>
    );

};

export default UserReview;
