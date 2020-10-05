import React, {FunctionComponent} from 'react';
import {IEdition} from "../../Helpers/interfaces"

interface IProps {
    editionList: IEdition[]
};

const Edition: FunctionComponent <(IProps)> = props => {

    // console.log('Edition.tsx props.editionList', props.editionList);

    return(
        <React.Fragment>
        {props.editionList.map((edition: IEdition) => {
          return (
            <div key={edition.editionID}>
            <p>{edition.publicationDate}</p>
            {edition.imageName !== null && edition.imageName !== "" ? <img src={"https://philipdick.com/images/covers/" + edition.imageName} alt="" /> : null}
            <p>{edition.ASIN}</p>
            <p>{edition.textLinkShort}</p>
            <p>{edition.textLinkFull}</p>
            <p>{edition.imageLinkSmall}</p>
            <p>{edition.imageLinkMedium}</p>
            <p>{edition.imageLinkLarge}</p>
            <p>{edition.textImageLink}</p>
            </div>
            )
        })}
        </React.Fragment>
    );

};

export default Edition;
