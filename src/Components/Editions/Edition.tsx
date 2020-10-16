import React, {FunctionComponent} from "react";

import {Grid, Typography, Link, GridList, GridListTile, GridListTileBar, ListSubheader} from "@material-ui/core";
// import BrokenImageIcon from "@material-ui/icons/BrokenImage";
// import BrokenImageOutlinedIcon from "@material-ui/icons/BrokenImageOutlined";
// import ImageIcon from "@material-ui/icons/Image";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
// import ImageSearchOutlinedIcon from "@material-ui/icons/ImageSearchOutlined";
// import ImageSearchRoundedIcon from "@material-ui/icons/ImageSearchRounded";
// import ImageSearchSharpIcon from "@material-ui/icons/ImageSearchSharp";
// import BookIcon from "@material-ui/icons/Book";
// import AudiotrackIcon from "@material-ui/icons/Audiotrack";
// import MovieIcon from "@material-ui/icons/Movie";
// import LocalMoviesIcon from "@material-ui/icons/LocalMovies";
// import TvIcon from "@material-ui/icons/Tv";
// import MusicNoteIcon from "@material-ui/icons/MusicNote";
// import VideogameAssetIcon from "@material-ui/icons/VideogameAsset";

import {IEdition} from "../../Helpers/interfaces";
import EditEdition from "./EditEdition";
import AddEdition from "./AddEdition";

interface IProps {
    userID: number | null,
    isAdmin: boolean,
    sessionToken: string | null,
    titleID: number | null,
    editionList: IEdition[],
    editionUpdated: () => void
};

const Edition: FunctionComponent <(IProps)> = props => {

    // console.log("Edition.tsx props.editionList", props.editionList);

    // if (props.editionList !== undefined ) {

    //     let mediaData: IMedia = props.editionList.medium;
    //     let mediaData: {} = props.editionList.medium;

    //     if (mediaData !== undefined) {
    //         console.log("Edition.tsx mediaData", mediaData);
    //     };

    // };

    return(
        <Grid container spacing={2}>
            <Grid item xs={12}>
            <Typography variant="h5" align="center" gutterBottom>Purchase Editions
            {props.isAdmin === true ? <AddEdition userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} titleID={props.titleID} editionUpdated={props.editionUpdated} displayIcon={true} /> : null}
            </Typography>
            </Grid>
            <Grid item xs={12}>
            <GridList cols={5}>
            {/* <GridListTile key="subheader" cols={6} style={{height: "auto"}}>
                <ListSubheader>Purchase Editions</ListSubheader>
            </GridListTile> */}
            {props.editionList.map((edition: IEdition) => {
            return (
                <React.Fragment>
                    {edition.textLinkShort !== null && edition.textLinkShort !== "" ? 
                    <GridListTile key={edition.editionID} style={{margin: "20px"}}>

                    <Link href={edition.textLinkShort} target="_blank">
                    {edition.imageName !== null && edition.imageName !== "" ? <img src={"https://philipdick.com/images/covers/" + edition.imageName} alt={edition.mediaName} /> : <ImageOutlinedIcon style={{fontSize: 150, color: "black"}} />}

                    <GridListTileBar title={edition.mediaName} subtitle={edition.publicationDate !== null ? edition.publicationDate.toString().substring(0, 10) : null} actionIcon={props.isAdmin === true ? <EditEdition userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} titleID={props.titleID} editionID={edition.editionID} editionUpdated={props.editionUpdated} /> : null} />
                    </Link>
                    </GridListTile>
                    : null}
                </React.Fragment>
                )
            })}
            </GridList>
            </Grid>

        </Grid>
    );

};

export default Edition;
