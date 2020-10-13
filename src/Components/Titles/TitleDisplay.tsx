import React, {FunctionComponent} from 'react';

import {Rating} from '@material-ui/lab/';
import {Grid, Typography, Link} from '@material-ui/core';
// import BrokenImageIcon from '@material-ui/icons/BrokenImage';
// import BrokenImageOutlinedIcon from '@material-ui/icons/BrokenImageOutlined';
// import ImageIcon from '@material-ui/icons/Image';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
// import ImageSearchOutlinedIcon from '@material-ui/icons/ImageSearchOutlined';
// import ImageSearchRoundedIcon from '@material-ui/icons/ImageSearchRounded';
// import ImageSearchSharpIcon from '@material-ui/icons/ImageSearchSharp';

import {ITitle} from "../../Helpers/interfaces";
import AddUserReview from "../UserReviews/AddUserReview";
import UpdateUserReview from "../UserReviews/UpdateUserReview";
import EditTitle from "./EditTitle";
import AddEdition from "../Editions/AddEdition";

interface IProps {
    titleData: ITitle | null,
    overallTitleRating: number | null,
    overallTitleRatingCount: number,
    categoryName: string,
    userID: number | null,
    // isLoggedIn: boolean | null,
    isAdmin: boolean,
    sessionToken: string,
    titleID: number | null,
    setTitleID: (titleID: number | null) => void,
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

    // console.log('TitleDisplay.tsx props.titleData', props.titleData);

    // if (props.titleData !== undefined ) {

    //     let categoryData: ICategory = props.titleData.category;

    //     if (categoryData !== undefined) {
    //         // console.log('TitleDisplay.tsx categoryData', categoryData);

    //         // console.log('TitleDisplay.tsx categoryData.category', categoryData.category);  

    //         // categoryData is an object not an array if there is only one value in the array?
    //         // if (categoryData.length > 0) {
    //         //     console.log('TitleDisplay.tsx categoryData[0].category', categoryData[0].category);  
    //         // };

    //         if (categoryData.hasOwnProperty('category')) {
    //             // console.log('TitleDisplay.tsx categoryData.category', categoryData.category);  
    //         };

    //         // if (categoryData[0].category !== undefined) {
    //         //     console.log('TitleDisplay.tsx categoryData[0].category', categoryData[0].category);
    //         // };
    //     };

    // };

    return(

        <Grid container>
                {props.titleData !== undefined && props.titleData !== null ? 
                <Grid item xs={12}>
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom>{props.titleData.titleName}
                            {/* {categoryData !== undefined ? <p>{categoryData.category}</p> : null} */}
                            {props.categoryName !== "" ? <Typography variant="overline" gutterBottom> {props.categoryName}</Typography> : null}
                            {/* {props.titleData.publicationDate !== null ? <p>{props.titleData.publicationDate}</p> : null} */}
                            {props.titleData.publicationDate !== null ? <Typography variant="caption" gutterBottom> ({props.titleData.publicationDate.toString().substring(0, 4)})</Typography> : null}
                        </Typography>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            {props.titleData.imageName !== null && props.titleData.imageName !== "" ? <img src={"https://philipdick.com/images/covers/" + props.titleData.imageName} alt={props.titleData.titleName} /> : <ImageOutlinedIcon style={{fontSize: 80}} />}
                        </Grid>

                        <Grid item xs={8}>
                            {/* {categoryData !== undefined ? <p>{categoryData.category}</p> : null} */}
                            {/* {props.categoryName !== "" ? <Typography variant="body1" gutterBottom>{props.categoryName}</Typography> : null} */}

                            {/* {props.titleData.publicationDate !== null ? <p>{props.titleData.publicationDate}</p> : null} */}
                            {/* {props.titleData.publicationDate !== null ? <Typography variant="body1" gutterBottom>{props.titleData.publicationDate.toString().substring(0, 4)}</Typography> : null} */}

                            <Typography variant="body2" gutterBottom>{props.titleData.authorFirstName} {props.titleData.authorLastName}</Typography>

                            {/* {props.overallTitleRatingCount > 0 ? <Typography variant="body1" gutterBottom>{props.overallTitleRating}</Typography> : null} */}
                            {props.overallTitleRatingCount > 0 ? <React.Fragment>
                            {/* <Typography component="legend">Rating</Typography> */}
                            <Rating name="rdoRating" precision={0.1} readOnly defaultValue={0} max={10} value={props.overallTitleRating} />
                            <Typography variant="subtitle2">out of {props.overallTitleRatingCount} review(s)</Typography>
                            </React.Fragment>
                            : null}

                            <Typography variant="subtitle2" gutterBottom>
                            {/* {props.userReviewedTitleRead === null ? <React.Fragment>Read null</React.Fragment> : null} */}
                            {props.userReviewedTitleRead === true ? <React.Fragment>Read</React.Fragment> : null}
                            {/* {props.userReviewedTitleRead === false ? <React.Fragment>Not Read</React.Fragment> : null} */}

                            {/* {props.userReviewedTitleDateRead!== null ? <p>{props.userReviewedTitleDateRead}</p> : null} */}
                            {props.userReviewedTitleDateRead !== null ? <Typography variant="caption" gutterBottom> on {props.userReviewedTitleDateRead.toString().substring(0, 10)}</Typography> : null}
                            </Typography>

                            {props.sessionToken !== "" && props.userReviewedTitle === false? <AddUserReview userID={props.userID} /*isLoggedIn={props.isLoggedIn}*/ isAdmin={props.isAdmin} sessionToken={props.sessionToken} titleID={props.titleID} userReviewUpdated={props.userReviewUpdated} /> : null}

                            {props.userReviewedTitle ? <UpdateUserReview userID={props.userID} /*isLoggedIn={props.isLoggedIn}*/ isAdmin={props.isAdmin} sessionToken={props.sessionToken} titleID={props.titleID} userReviewUpdated={props.userReviewUpdated} reviewID={props.userReviewedTitleReviewID} /> : null}

                            {props.isAdmin === true ? <EditTitle userID={props.userID} /*isLoggedIn={props.isLoggedIn}*/ isAdmin={props.isAdmin} sessionToken={props.sessionToken} titleID={props.titleID} setTitleID={props.setTitleID} /*titleUpdated={props.titleUpdated}*/ titleUpdated={props.titleUpdated} setTitleUpdated={props.setTitleUpdated} /> : null}

                            {props.isAdmin === true ? <AddEdition userID={props.userID} /*isLoggedIn={props.isLoggedIn}*/ isAdmin={props.isAdmin} sessionToken={props.sessionToken} titleID={props.titleID} editionUpdated={props.editionUpdated} /> : null}

                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        {props.titleData.shortDescription !== "" ? <Typography variant="body2" gutterBottom>{props.titleData.shortDescription}</Typography> : null}
                        {props.titleData.urlPKDweb !== "" ? <Typography variant="body2" gutterBottom><Link href={props.titleData.urlPKDweb}target="_blank">Encyclopedia Dickiana</Link></Typography> : null}
                    </Grid>
                </Grid>
                : null}
        </Grid>
    );

};

export default TitleDisplay;
