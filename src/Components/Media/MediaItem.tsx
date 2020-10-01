import React, {FunctionComponent} from 'react';
import {IMedia} from "../../Helpers/interfaces"

interface IProps {
    mediaList: IMedia[],
    getEditions: (mediaID?: number) => void
};

const MediaItem: FunctionComponent <(IProps)> = props => {

    // console.log('MediaItem.tsx props.mediaList', props.mediaList);

    return(
        <React.Fragment>
        {props.mediaList.map((media: IMedia) => {
          return (
            <p key={media.mediaID}><a href="#" onClick={() => props.getEditions(media.mediaID)}>{media.media}</a></p>
            )
        })}
        </React.Fragment>
    );

};

export default MediaItem;
