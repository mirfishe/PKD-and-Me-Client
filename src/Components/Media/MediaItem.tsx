import React, {FunctionComponent} from 'react';
import {List, ListItem, Link, ListItemText, Divider} from '@material-ui/core';
import {IMedia} from "../../Helpers/interfaces"

interface IProps {
    mediaList: IMedia[]
};

const MediaItem: FunctionComponent <(IProps)> = props => {

    // console.log('MediaItem.tsx props.mediaList', props.mediaList);

    return(
        <List>
        {props.mediaList.map((media: IMedia) => {
          return (
            <ListItem key={media.mediaID}><ListItemText>{media.media}</ListItemText></ListItem>
            )
        })}
        </List>
    );

};

export default MediaItem;
