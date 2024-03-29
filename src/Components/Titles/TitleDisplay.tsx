import React, {FunctionComponent} from "react";

import {Rating} from "@material-ui/lab/";
import {Grid, Typography, Link} from "@material-ui/core";
// import BrokenImageIcon from "@material-ui/icons/BrokenImage";
// import BrokenImageOutlinedIcon from "@material-ui/icons/BrokenImageOutlined";
// import ImageIcon from "@material-ui/icons/Image";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
// import ImageSearchOutlinedIcon from "@material-ui/icons/ImageSearchOutlined";
// import ImageSearchRoundedIcon from "@material-ui/icons/ImageSearchRounded";
// import ImageSearchSharpIcon from "@material-ui/icons/ImageSearchSharp";

import {ITitle} from "../../Helpers/interfaces";
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

        <Grid container>
                {props.titleData !== undefined && props.titleData !== null ? 
                <Grid item xs={12}>
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom>{props.titleData.titleName}
                            {props.isAdmin === true ? <EditTitle userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} titleID={props.titleID} setTitleID={props.setTitleID} /*titleUpdated={props.titleUpdated}*/ titleUpdated={props.titleUpdated} setTitleUpdated={props.setTitleUpdated} displayIcon={true} /> : null}

                            {props.titleData.publicationDate !== null ? <Typography variant="caption" gutterBottom style={{marginLeft: "5px", fontSize: 18}}> ({props.titleData.publicationDate.toString().substring(0, 4)})</Typography> : null}

                            {props.categoryName !== null && props.categoryName !== "" ? <Typography variant="overline" gutterBottom style={{marginLeft: "10px", fontSize: 12}}> {props.categoryName}
                            <AddCategory userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} displayIcon={true} />
                            </Typography> : null}
                        </Typography>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            {props.titleData.imageName !== null && props.titleData.imageName !== "" ? <img src={props.titleData.imageName} alt={props.titleData.titleName} /> : <ImageOutlinedIcon style={{fontSize: 150}} />}
                        </Grid>

                        <Grid item xs={8}>

                            <Typography variant="body1" gutterBottom>{props.titleData.authorFirstName} {props.titleData.authorLastName}</Typography>

                            {props.overallTitleRatingCount > 0 ? 
                            <React.Fragment>
                            <Rating name="rdoRating" precision={0.1} readOnly defaultValue={0} max={10} value={props.overallTitleRating} />
                            <Typography variant="subtitle2">out of {props.overallTitleRatingCount} review(s)</Typography>
                            </React.Fragment>
                            : null}

                            {props.userReviewedTitleRead === true && props.userReviewedTitleDateRead === null ? <Typography variant="subtitle2" gutterBottom>Read</Typography> : null}

                            {props.userReviewedTitleDateRead !== null ? <Typography variant="caption" gutterBottom>Read on {props.userReviewedTitleDateRead.toString().substring(0, 10)}</Typography> : null}

                            {props.sessionToken !== "" && props.userReviewedTitle === false ? <p><AddUserReview userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} titleID={props.titleID} userReviewUpdated={props.userReviewUpdated} displayButton={true} /></p> : null}

                            {props.userReviewedTitle === true ? <p><UpdateUserReview userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} titleID={props.titleID} userReviewUpdated={props.userReviewUpdated} reviewID={props.userReviewedTitleReviewID} displayButton={true} /></p> : null}

                            {props.isAdmin === true ? <p><AddCategory userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} displayButton={true} /></p> : null}

                            {props.isAdmin === true ? <p><AddMedia userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} displayButton={true} /></p> : null}

                            {props.isAdmin === true ? <p><AddTitle userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} displayButton={true} /></p> : null}

                            {props.isAdmin === true ? <p><AddEdition userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} titleID={props.titleID}  titlePublicationDate={props.titlePublicationDate} editionUpdated={props.editionUpdated} displayButton={true} /></p> : null}

                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        {props.titleData.shortDescription !== "" && props.titleData.shortDescription !== null ? <Typography variant="body2" gutterBottom>{props.titleData.shortDescription}</Typography> : null}
                        {props.titleData.urlPKDweb !== "" && props.titleData.urlPKDweb !== null ? <Typography variant="body2" gutterBottom><Link href={props.titleData.urlPKDweb}target="_blank">Encyclopedia Dickiana</Link></Typography> : null}
                    </Grid>
                </Grid>
                : null}
        </Grid>
    );

};

export default TitleDisplay;
