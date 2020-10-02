import React, {FunctionComponent} from 'react';
import {ITitle} from "../../Helpers/interfaces"

interface IProps {
    titleList: ITitle[],
    getEditions: (titleID?: number) => void
};

const Title: FunctionComponent <(IProps)> = props => {

    // console.log('Title.tsx props.titleList', props.titleList);

    return(
        <React.Fragment>
        {props.titleList.map((title: ITitle) => {
          return (
            <div key={title.titleID}>
            <p>{title.titleName}</p>
            <a href="#" onClick={() => props.getEditions(title.titleID)}>{title.titleName}</a>
            <p>{title.authorFirstName} {title.authorLastName}</p>
            <p>{title.publicationDate}</p>
            {title.imageName !== null ? <img src={"https://philipdick.com/images/covers/" + title.imageName} alt={title.titleName} /> : null}
            <p>{title.shortDescription}</p>
            <p>{title.urlPKDweb}</p>
            </div>
            )
        })}
        </React.Fragment>
    );

};

export default Title;
