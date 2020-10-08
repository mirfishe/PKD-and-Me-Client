import React, {FunctionComponent} from 'react';

import {Rating} from '@material-ui/lab/';
import {Grid, Typography} from '@material-ui/core';

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
        <Grid container spacing={2}>
            <Grid item xs={12}>
            <Typography variant="h5" align="center" gutterBottom>User Reviews</Typography>
            </Grid>
        {props.userReviewList.map((userReview: IUserReview) => {
          return (
            <Grid item xs={12} key={userReview.reviewID}>

            {/* {userReview.read === null ? <p>Read null</p> : null}
            {userReview.read === true ? <p>Read</p> : null}
            {userReview.read === false ? <p>Not Read</p> : null} */}

            {/* {userReview.dateRead !== undefined && userReview.dateRead !== null ? <p>{userReview.dateRead}</p> : null} */}
            {/* {userReview.dateRead !== undefined && userReview.dateRead !== null ? <p>{userReview.dateRead.toString().substring(0, 10)}</p> : null} */}

            <Grid item xs={12}>
            {userReview.shortReview !== "" ? <Typography variant="h6" gutterBottom>{userReview.shortReview}</Typography> : null}
            </Grid>
            <Grid item xs={12}>
            {userReview.longReview !== "" ? <Typography variant="body2" gutterBottom>{userReview.longReview}</Typography> : null}
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={5}>
                {/* {!isNaN(userReview.rating) ? <p>{userReview.rating}</p> : null} */}
                {/* {userReview.rating !== null ? <p>{userReview.rating}</p> : null} */}
                {/* <Typography component="legend">Rating</Typography> */}
                <Rating name="rdoRating" precision={0.1} readOnly defaultValue={0} max={10} value={userReview.rating} />
                </Grid>
                <Grid item xs={7}>
                <Typography variant="subtitle2" gutterBottom>
                Reviewed by {userReview.userFirstName} on {userReview.updatedAt !== null ? <Typography variant="caption" gutterBottom>{userReview.updatedAt.toString().substring(0, 10)}</Typography> : null}
                </Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                {props.userID === userReview.userID || props.isAdmin === true ? <UpdateUserReview userID={props.userID} isLoggedIn={props.isLoggedIn} isAdmin={props.isAdmin} sessionToken={props.sessionToken} titleID={props.titleID} userReviewUpdated={props.userReviewUpdated} reviewID={userReview.reviewID} /> : null}
            </Grid>
            </Grid>
            )
        })}
        </Grid>
    );

};

export default UserReview;
