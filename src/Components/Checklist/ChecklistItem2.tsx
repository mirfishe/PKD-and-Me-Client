import React, {FunctionComponent} from "react";

import {List, ListItem, Link, Checkbox, Typography, GridList, GridListTile, GridListTileBar, ListSubheader} from "@material-ui/core";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";

import {ITitle} from "../../Helpers/interfaces";

interface IProps {
    checklistList: ITitle[],
    setTitleID: (titleID: number | null) => void,
    updateChecklist: (titleID: number, read: boolean | undefined, reviewID?: number) => void,
    categoryName: string,
    titleSort: string | null
    setTitleSort: (titleSort: string | null) => void
};

const ChecklistItem2: FunctionComponent <(IProps)> = props => {

    // console.log("ChecklistItem.tsx props.checklistList", props.checklistList);

    return(
        <GridList cols={1}>
            {props.categoryName !== null && props.categoryName !== "" ? 

            <GridListTile key="subheader" cols={1} style={{height: "auto"}}>
            <ListSubheader><Typography variant="h6" align="center" gutterBottom>{props.categoryName}
            {/* Fetch runs very slow 
            <Typography variant="caption" gutterBottom> Sort By
            {props.titleSort !== "publicationDate" ? 
            <Typography variant="caption" gutterBottom> <Link href="#" onClick={() => props.setTitleSort("publicationDate")}>Publication Date</Link></Typography>
            : null}
            {props.titleSort !== null ? 
            <Typography variant="caption" gutterBottom> <Link href="#" onClick={() => props.setTitleSort(null)}>Title</Link></Typography>
            : null}
            </Typography> */}
            </Typography></ListSubheader>
            </GridListTile>
            : null}
        {props.checklistList.map((title: ITitle) => {
        return (
            // <ListItem key={title.titleID}><Checkbox id={"cbxRead" + title.titleID} checked={title.read} value={title.read} color="primary" onChange={(event) => {/*console.log(event.target.value);*/ props.updateChecklist(title.titleID, !title.read, title.reviewID)}} /> <Link href="#" onClick={() => props.setTitleID(title.titleID)}><Typography variant="subtitle2" gutterBottom>{title.titleName}</Typography></Link>
            // {title.publicationDate !== null ? <Typography variant="caption" gutterBottom style={{marginLeft: "5px"}}> ({title.publicationDate.toString().substring(0, 4)})</Typography> : null}
            // </ListItem>

            <GridListTile key={title.titleID} cols={1} style={{height: "auto"}}>

            <Link href="#" onClick={() => props.setTitleID(title.titleID)}>
            {title.imageName !== null && title.imageName !== "" ? <img src={title.imageName} alt={title.titleName} /> : <ImageOutlinedIcon style={{fontSize: 150, color: "black"}} />}

            <GridListTileBar title={title.titleName} subtitle={title.publicationDate !== null ? title.publicationDate.toString().substring(0, 10) : null} actionIcon={<Checkbox id={"cbxRead" + title.titleID} checked={title.read} value={title.read} color="primary" onChange={(event) => {/*console.log(event.target.value);*/ props.updateChecklist(title.titleID, !title.read, title.reviewID)}} />} />
            </Link>
            </GridListTile>
            )
        })}
        </GridList>
    );

};

export default ChecklistItem2;
