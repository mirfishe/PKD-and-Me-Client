import React, {FunctionComponent} from 'react';

import {Grid} from '@material-ui/core';

import {ITitle} from "../../Helpers/interfaces"

interface IProps {
    titleData?: ITitle
};

const TitleDisplay: FunctionComponent <(IProps)> = props => {

    // console.log('TitleDisplay.tsx props.titleData', props.titleData);

    return(

        <Grid container>
                {props.titleData !== undefined ? 
                <Grid item xs={12}>
                    <h1>{props.titleData.titleName}</h1>
                    {props.titleData.imageName !== null && props.titleData.imageName !== "" ? <img src={"https://philipdick.com/images/covers/" + props.titleData.imageName} alt={props.titleData.titleName} /> : null}
                    <p>{props.titleData.authorFirstName} {props.titleData.authorLastName}</p>
                    {props.titleData.publicationDate !== null ? <p>{props.titleData.publicationDate}</p> : null}
                    {props.titleData.shortDescription !== "" ? <p>{props.titleData.shortDescription}</p> : null}
                    {props.titleData.urlPKDweb !== "" ? <a href={props.titleData.urlPKDweb}>{props.titleData.urlPKDweb}</a> : null}
                </Grid>
                : null}
        </Grid>
    );

};

export default TitleDisplay;
