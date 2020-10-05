import React, {FunctionComponent} from 'react';
import {IUserReview} from "../../Helpers/interfaces"

interface IProps {
    userReviewList: IUserReview[]
};

const UserReview: FunctionComponent <(IProps)> = props => {

    console.log('UserReview.tsx props.userReviewList', props.userReviewList);

    return(
        <React.Fragment>
        {props.userReviewList.map((userReview: IUserReview) => {
          return (
            <div key={userReview.reviewID}>

            {userReview.read === undefined ? <p>Read undefined</p> : null}
            {userReview.read === true ? <p>Read</p> : null}
            {userReview.read === false ? <p>Not Read</p> : null}

            {userReview.dateRead !== null ? <p>{userReview.dateRead}</p> : null}
            {/* {!isNaN(userReview.rating) ? <p>{userReview.rating}</p> : null} */}
            {userReview.rating !== null ? <p>{userReview.rating}</p> : null}
            {userReview.shortReview !== "" ? <p>{userReview.shortReview}</p> : null}
            {userReview.longReview !== "" ? <p>{userReview.longReview}</p> : null}
            </div>
            )
        })}
        </React.Fragment>
    );

};

export default UserReview;
