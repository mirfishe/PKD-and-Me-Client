import React, {FunctionComponent} from 'react';

import {Grid, Typography, Link} from '@material-ui/core';
// import BrokenImageIcon from '@material-ui/icons/BrokenImage';
// import BrokenImageOutlinedIcon from '@material-ui/icons/BrokenImageOutlined';
// import ImageIcon from '@material-ui/icons/Image';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
// import ImageSearchOutlinedIcon from '@material-ui/icons/ImageSearchOutlined';
// import ImageSearchRoundedIcon from '@material-ui/icons/ImageSearchRounded';
// import ImageSearchSharpIcon from '@material-ui/icons/ImageSearchSharp';
// import BookIcon from '@material-ui/icons/Book';
// import AudiotrackIcon from '@material-ui/icons/Audiotrack';
// import MovieIcon from '@material-ui/icons/Movie';
// import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
// import TvIcon from '@material-ui/icons/Tv';
// import MusicNoteIcon from '@material-ui/icons/MusicNote';
// import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';

import {IEdition} from "../../Helpers/interfaces";
import EditEdition from "./EditEdition";

interface IProps {
    userID: number | null,
    // isLoggedIn: boolean | null,
    isAdmin: boolean,
    sessionToken: string,
    titleID: number | null,
    editionList: IEdition[],
    editionUpdated: () => void
};

const Edition: FunctionComponent <(IProps)> = props => {

    // console.log('Edition.tsx props.editionList', props.editionList);

    // if (props.editionList !== undefined ) {

    //     let mediaData: IMedia = props.editionList.medium;
    //     let mediaData: {} = props.editionList.medium;

    //     if (mediaData !== undefined) {
    //         console.log('Edition.tsx mediaData', mediaData);
    //     };

    // };

    return(
        <Grid container spacing={2}>
            <Grid item xs={12}>
            <Typography variant="h5" align="center" gutterBottom>Purchase Editions</Typography>
            </Grid>
        {props.editionList.map((edition: IEdition) => {
          return (
            <Grid item xs={4} key={edition.editionID}>

            {/* {edition.textLinkShort !== null && edition.textLinkShort !== "" ? <p><Link href={edition.textLinkShort} target="_blank">
            {edition.mediaID !== null ? <p>{edition.mediaID}</p> : null}
            </Link></p> : null} */}

            {edition.textLinkShort !== null && edition.textLinkShort !== "" ? <Typography variant="body2" gutterBottom><Link href={edition.textLinkShort} target="_blank">
            {edition.mediaName !== null ? <React.Fragment>{edition.mediaName}</React.Fragment> : null}
            </Link></Typography> : null}

            {edition.textLinkShort !== null && edition.textLinkShort !== "" ? <Link href={edition.textLinkShort} target="_blank">
            {edition.imageName !== null && edition.imageName !== "" ? <img src={"https://philipdick.com/images/covers/" + edition.imageName} alt="" /> : <ImageOutlinedIcon style={{fontSize: 40}} />}
            </Link> : null}

            {/* {edition.imageName !== null && edition.imageName !== "" ? <img src={"https://philipdick.com/images/covers/" + edition.imageName} alt="" /> : <ImageOutlinedIcon style={{fontSize: 40}} />} */}

            {/* {edition.publicationDate !== null ? <p>{edition.publicationDate}</p> : null} */}
            {edition.publicationDate !== null ? <Typography variant="body2" gutterBottom>{edition.publicationDate.toString().substring(0, 10)}</Typography> : null}

            {/* {edition.ASIN !== null && edition.ASIN !== "" ? <p>{edition.ASIN}</p> : null} */}

             {/* These are links */}
            {/* {edition.textLinkShort !== null && edition.textLinkShort !== "" ? <p><Link href={edition.textLinkShort}>{edition.textLinkShort}</Link></p> : null}
            {edition.textLinkFull !== null && edition.textLinkFull !== "" ? <p><Link href={edition.textLinkFull}>{edition.textLinkFull}</Link></p> : null} */}

            {/* These are a href tags
            {edition.imageLinkSmall !== null && edition.imageLinkSmall !== "" ? <p><Link href={edition.imageLinkSmall}>{edition.imageLinkSmall}</Link></p> : null}
            {edition.imageLinkMedium !== null && edition.imageLinkMedium !== "" ? <p><Link href={edition.imageLinkMedium}>{edition.imageLinkMedium}</Link></p> : null}
            {edition.imageLinkLarge !== null && edition.imageLinkLarge !== "" ? <p><Link href={edition.imageLinkLarge}>{edition.imageLinkLarge}</Link></p> : null}
            */}

            {/* This is an iframe tag
            {edition.textImageLink !== null && edition.textImageLink !== "" ? <p><Link href={edition.textImageLink}>{edition.textImageLink}</Link></p> : null}
            */}

            <Grid item xs={12}>
                {props.isAdmin === true ? <EditEdition userID={props.userID} /*isLoggedIn={props.isLoggedIn}*/ isAdmin={props.isAdmin} sessionToken={props.sessionToken} titleID={props.titleID} editionID={edition.editionID} editionUpdated={props.editionUpdated} /> : null}
            </Grid>

            </Grid>

            )
        })}
        </Grid>
    );

};

export default Edition;
