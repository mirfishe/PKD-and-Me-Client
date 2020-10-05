import React, {FunctionComponent} from 'react';

import {Grid} from '@material-ui/core';

import {ITitle} from "../../Helpers/interfaces"
import {Redirect} from "react-router-dom";

interface IProps {
    titleList: ITitle[],
    getEditions: (titleID?: number) => void,
    titleID: number | undefined,
    setTitleID: (titleID: number | undefined) => void
};

const TitleItem: FunctionComponent <(IProps)> = props => {

    // console.log('TitleItem.tsx props.titleList', props.titleList);

    if (props.titleID) {
        return <Redirect to="/title" />;
    } else {

        return(

            <Grid container>
            {props.titleList.map((title: ITitle) => {
            return (
                <Grid item xs={4} key={title.titleID}>
                {title.imageName !== null && title.imageName !== "" ? <img src={"https://philipdick.com/images/covers/" + title.imageName} alt={title.titleName} /> : null}
                {/* <p>{title.titleName}</p> */}
                {/* <a href="#" onClick={() => props.getEditions(title.titleID)}>{title.titleName}</a> */}
                <p><a href="#" onClick={() => props.setTitleID(title.titleID)}>{title.titleName}</a></p>
                {/* <button onClick={() => this.goToTitle(title.titleID)}>{title.titleName}</button> */}
                {/* <button onClick={() => props.setTitleID(title.titleID)}>{title.titleName}</button> */}
                <p>{title.authorFirstName} {title.authorLastName}</p>
                {/* <p>{title.publicationDate}</p> */}

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
