import React, {FunctionComponent} from 'react';

import {Grid, Link} from '@material-ui/core';

import {IEdition} from "../../Helpers/interfaces"

interface IProps {
    editionList: IEdition[]
};

const Edition: FunctionComponent <(IProps)> = props => {

    // console.log('Edition.tsx props.editionList', props.editionList);

    return(
        <Grid container>
        {props.editionList.map((edition: IEdition) => {
          return (
            <Grid item xs={4} key={edition.editionID}>
            {edition.imageName !== null && edition.imageName !== "" ? <img src={"https://philipdick.com/images/covers/" + edition.imageName} alt="" /> : null}

            {edition.publicationDate !== null ? <p>{edition.publicationDate}</p> : null}
            {edition.ASIN !== null && edition.ASIN !== "" ? <p>{edition.ASIN}</p> : null}

            {edition.textLinkShort !== null && edition.textLinkShort !== "" ? <p><Link href={edition.textLinkShort}>{edition.textLinkShort}</Link></p> : null}
            {edition.textLinkFull !== null && edition.textLinkFull !== "" ? <p><Link href={edition.textLinkFull}>{edition.textLinkFull}</Link></p> : null}

            {/* These are a href tags
            {edition.imageLinkSmall !== null && edition.imageLinkSmall !== "" ? <p><Link href={edition.imageLinkSmall}>{edition.imageLinkSmall}</Link></p> : null}
            {edition.imageLinkMedium !== null && edition.imageLinkMedium !== "" ? <p><Link href={edition.imageLinkMedium}>{edition.imageLinkMedium}</Link></p> : null}
            {edition.imageLinkLarge !== null && edition.imageLinkLarge !== "" ? <p><Link href={edition.imageLinkLarge}>{edition.imageLinkLarge}</Link></p> : null}
            */}

            {/* This is an iframe tag
            {edition.textImageLink !== null && edition.textImageLink !== "" ? <p><Link href={edition.textImageLink}>{edition.textImageLink}</Link></p> : null}
            */}
            </Grid>
            )
        })}
        </Grid>
    );

};

export default Edition;
