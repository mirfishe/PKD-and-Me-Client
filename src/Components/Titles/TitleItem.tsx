import React, {FunctionComponent} from 'react';

import {Grid, Typography, Link} from '@material-ui/core';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import BrokenImageOutlinedIcon from '@material-ui/icons/BrokenImageOutlined';
import ImageIcon from '@material-ui/icons/Image';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ImageSearchOutlinedIcon from '@material-ui/icons/ImageSearchOutlined';
import ImageSearchRoundedIcon from '@material-ui/icons/ImageSearchRounded';
import ImageSearchSharpIcon from '@material-ui/icons/ImageSearchSharp';

import {ITitle} from "../../Helpers/interfaces"
import {Redirect} from "react-router-dom";

interface IProps {
    titleList: ITitle[],
    getEditions?: (titleID?: number) => void,
    titleID: number | null,
    setTitleID: (titleID: number | null) => void
};

const TitleItem: FunctionComponent <(IProps)> = props => {

    // console.log('TitleItem.tsx props.titleList', props.titleList);

    if (props.titleID) {
        return <Redirect to="/title" />;
    } else {

        return(
            <Grid container spacing={2}>
            {props.titleList.map((title: ITitle) => {
            return (
                <Grid item xs={4} key={title.titleID}>
                {title.imageName !== null && title.imageName !== "" ? <img src={"https://philipdick.com/images/covers/" + title.imageName} alt={title.titleName} /> : <ImageOutlinedIcon style={{fontSize: 80}} />}
                {/* <p>{title.titleName}</p> */}
                {/* <a href="#" onClick={() => props.getEditions(title.titleID)}>{title.titleName}</a> */}
                <Typography variant="body1" gutterBottom><Link href="#" onClick={() => props.setTitleID(title.titleID)}>{title.titleName}</Link>

                {/* {title.publicationDate !== null ? <span>{title.publicationDate}</span> : null} */}
                {title.publicationDate !== null ? <Typography variant="caption" gutterBottom> ({title.publicationDate.toString().substring(0, 4)})</Typography> : null}
                
                </Typography>

                {/* <button onClick={() => this.goToTitle(title.titleID)}>{title.titleName}</button> */}
                {/* <button onClick={() => props.setTitleID(title.titleID)}>{title.titleName}</button> */}
                <Typography variant="body1" gutterBottom>{title.authorFirstName} {title.authorLastName}</Typography>

                {/* <p>{title.shortDescription}</p>
                <p>{title.urlPKDweb}</p> */}
                </Grid>
                )
            })}
            </Grid>
        );

    };

};

export default TitleItem;
