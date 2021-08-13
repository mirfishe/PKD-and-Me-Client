import React, {FunctionComponent} from "react";

import {Rating} from "@material-ui/lab/";
import {Grid, Typography} from "@material-ui/core";

import {IUserReview} from "../../Helpers/interfaces";
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
        <Grid container spacing={2}>
            <Grid item xs={12}>
            <Typography variant="h5" align="center" gutterBottom>User Reviews</Typography>
            </Grid>
        {props.userReviewList.map((userReview: IUserReview) => {
          return (
            <Grid item xs={12} key={userReview.reviewID}>

            {userReview.rating !== null || (userReview.shortReview !== null && userReview.shortReview !== "") || (userReview.longReview !== null && userReview.longReview !== "") ? 

            <React.Fragment>

            <Grid item xs={12}>
            {userReview.shortReview !== null && userReview.shortReview !== "" ? <Typography variant="h6" gutterBottom>{userReview.shortReview}
            {props.userID === userReview.userID || props.isAdmin === true ? <UpdateUserReview userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} titleID={props.titleID} userReviewUpdated={props.userReviewUpdated} reviewID={userReview.reviewID} displayIcon={true} /> : null}
            </Typography> : null}
            </Grid>
            <Grid item xs={12}>
            {userReview.longReview !== null && userReview.longReview !== "" ? <Typography variant="body2" gutterBottom>{userReview.longReview}</Typography> : null}
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={5}>

                {userReview.rating !== null ? <Rating name="rdoRating" precision={0.1} readOnly defaultValue={0} max={10} value={userReview.rating} /> : null}
                </Grid>
                <Grid item xs={7}>
                <Typography variant="subtitle2" gutterBottom>
                Reviewed by {userReview.userFirstName} on {userReview.updatedAt !== null ? <Typography variant="caption" gutterBottom>{userReview.updatedAt.toString().substring(0, 10)}</Typography> : null}
                </Typography>
                </Grid>
            </Grid>
            </React.Fragment>
            
            : null}

            </Grid>
            )
        })}
        </Grid>
    );

};

export default UserReview;
