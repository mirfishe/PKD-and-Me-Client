import React, {FunctionComponent} from "react";
import {Checkbox} from "@material-ui/core";
import {ListGroup, ListGroupItem} from "reactstrap";
import {ITitle} from "../../Helpers/interfaces";

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
        <ListGroup>
            {props.categoryName !== null && props.categoryName !== "" ? 
            <ListGroupItem> 
            <h6 className="text-center">{props.categoryName}
            {/* Fetch runs very slow 
            <Typography variant="caption" gutterBottom> Sort By
            {props.titleSort !== "publicationDate" ? 
            <Typography variant="caption" gutterBottom> <Link href="#" onClick={() => props.setTitleSort("publicationDate")}>Publication Date</Link></Typography>
            : null}
            {props.titleSort !== null ? 
            <Typography variant="caption" gutterBottom> <Link href="#" onClick={() => props.setTitleSort(null)}>Title</Link></Typography>
            : null}
            </Typography> */}
            </h6>
            </ListGroupItem>
            : null}
        {props.checklistList.map((title: ITitle) => {
        return (
            <ListGroupItem key={title.titleID}><Checkbox id={"cbxRead" + title.titleID} checked={title.read} value={title.read} color="primary" onChange={(event) => {/*console.log(event.target.value);*/ props.updateChecklist(title.titleID, !title.read, title.reviewID)}} /> <a href="#" onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ props.setTitleID(title.titleID)}}><p>{title.titleName}</p></a>
            {title.publicationDate !== null ? <small style={{marginLeft: "5px"}}> ({title.publicationDate.toString().substring(0, 4)})</small> : null}
            </ListGroupItem>
            )
        })}
        </ListGroup>
    );

};

export default ChecklistItem;
