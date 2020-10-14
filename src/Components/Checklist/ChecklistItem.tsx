import React, {FunctionComponent} from "react";

import {List, ListItem, Link, Checkbox, Typography} from "@material-ui/core";

import {ITitle} from "../../Helpers/interfaces"

interface IProps {
    checklistList: ITitle[],
    setTitleID: (titleID: number | null) => void,
    updateChecklist: (titleID: number, read: boolean | undefined, reviewID?: number) => void,
    categoryName: string,
    titleSort: string | null
    setTitleSort: (titleSort: string | null) => void
};

const ChecklistItem: FunctionComponent <(IProps)> = props => {

    // console.log("ChecklistItem.tsx props.checklistList", props.checklistList);

    return(
        <List>
            {props.categoryName !== null && props.categoryName !== "" ? 
            <ListItem> 
            <Typography variant="h6" align="center" gutterBottom>{props.categoryName}
            {/* Fetch runs very slow 
            <Typography variant="caption" gutterBottom> Sort By
            {props.titleSort !== "publicationDate" ? 
            <Typography variant="caption" gutterBottom> <Link href="#" onClick={() => props.setTitleSort("publicationDate")}>Publication Date</Link></Typography>
            : null}
            {props.titleSort !== null ? 
            <Typography variant="caption" gutterBottom> <Link href="#" onClick={() => props.setTitleSort(null)}>Title</Link></Typography>
            : null}
            </Typography> */}
            </Typography>
            </ListItem>
            : null}
        {props.checklistList.map((title: ITitle) => {
        return (
            <ListItem key={title.titleID}><Checkbox id={"cbxRead" + title.titleID} checked={title.read} value={title.read} color="primary" onChange={(event) => {/*console.log(event.target.value);*/ props.updateChecklist(title.titleID, !title.read, title.reviewID)}} /> <Link href="#" onClick={() => props.setTitleID(title.titleID)}><Typography variant="subtitle2" gutterBottom>{title.titleName}</Typography></Link>
            {title.publicationDate !== null ? <Typography variant="caption" gutterBottom style={{marginLeft: "5px"}}> ({title.publicationDate.toString().substring(0, 4)})</Typography> : null}
            </ListItem>
            )
        })}
        </List>
    );

};

export default ChecklistItem;
