import React, {FunctionComponent} from 'react';
import {List, ListItem, Link, ListItemText, Divider} from '@material-ui/core';
import {IMedia} from "../../Helpers/interfaces"

interface IProps {
    mediaList: IMedia[],
    getEditions: (mediaID?: number) => void
};

const MediaItem: FunctionComponent <(IProps)> = props => {

    // console.log('MediaItemOLD.tsx props.mediaList', props.mediaList);

    return(
        <List>
        {props.mediaList.map((media: IMedia) => {
          return (
            <ListItem key={media.mediaID}><Link href="#" onClick={() => props.getEditions(media.mediaID)}><ListItemText>{media.media}</ListItemText></Link></ListItem>
            )
        })}
        </List>
    );

};

export default MediaItem;
