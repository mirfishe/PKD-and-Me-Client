import React, {FunctionComponent} from 'react';

import {Grid} from '@material-ui/core';

import {IUserReview} from "../../Helpers/interfaces"

interface IProps {
    userReviewList: IUserReview[]
};

const UserReview: FunctionComponent <(IProps)> = props => {

    console.log('UserReview.tsx props.userReviewList', props.userReviewList);

    return(
        <Grid container>
        {props.userReviewList.map((userReview: IUserReview) => {
          return (
            <Grid item xs={4} key={userReview.reviewID}>

            {userReview.read === undefined ? <p>Read undefined</p> : null}
            {userReview.read === true ? <p>Read</p> : null}
            {userReview.read === false ? <p>Not Read</p> : null}

            {userReview.dateRead !== null ? <p>{userReview.dateRead}</p> : null}
            {/* {!isNaN(userReview.rating) ? <p>{userReview.rating}</p> : null} */}
            {userReview.rating !== null ? <p>{userReview.rating}</p> : null}
            {userReview.shortReview !== "" ? <p>{userReview.shortReview}</p> : null}
            {userReview.longReview !== "" ? <p>{userReview.longReview}</p> : null}
            </Grid>
            )
        })}
        </Grid>
    );

};

export default UserReview;
