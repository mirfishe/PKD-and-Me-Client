import React, {FunctionComponent} from 'react';

import {List, ListItem, Link, ListItemText, Checkbox} from '@material-ui/core';

import {ITitle} from "../../Helpers/interfaces"

interface IProps {
    checklistList: ITitle[],
    setTitleID: (titleID: number | null) => void,
    updateChecklist: (titleID: number, read: boolean | undefined, reviewID?: number) => void
};

const ChecklistItem: FunctionComponent <(IProps)> = props => {

    // console.log('ChecklistItem.tsx props.checklistList', props.checklistList);

    return(
        <List>
        {props.checklistList.map((title: ITitle) => {
        return (
            <ListItem key={title.titleID}><Checkbox id={"cbxRead" + title.titleID} checked={title.read} value={title.read} color="primary" onChange={(event) => {/*console.log(event.target.value);*/ props.updateChecklist(title.titleID, !title.read, title.reviewID)}} /> <Link href="#" onClick={() => props.setTitleID(title.titleID)}><ListItemText>{title.titleName}</ListItemText></Link></ListItem>
            )
        })}
        </List>
    );

};

export default ChecklistItem;
