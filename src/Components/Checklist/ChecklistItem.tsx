import React, {FunctionComponent} from "react";
import {ListGroup, ListGroupItem, Input} from "reactstrap";
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
        <ListGroup flush>
            {props.categoryName !== null && props.categoryName !== "" ? 
            <ListGroupItem> 
            <h6 className="text-center">{props.categoryName}
            {/* Fetch runs very slow 
            <p className="ml-2"> <small>Sort By
                {props.titleSort !== "publicationDate" ? 
                <a href="#" onClick={(event) => {event.preventDefault(); props.setTitleSort("publicationDate")}}>Publication Date</a>
                : null}
                {props.titleSort !== null ? 
                <a href="#" onClick={(event) => {event.preventDefault(); props.setTitleSort(null)}}>Title</a>
                : null}
            </small></p> */}
            </h6>
            </ListGroupItem>
            : null}
        {props.checklistList.map((title: ITitle) => {
        return (
            <ListGroupItem key={title.titleID}><Input type="checkbox" id={"cbxRead" + title.titleID} checked={title.read} /*value={title.read}*/ onChange={(event) => {/*console.log(event.target.value);*/ props.updateChecklist(title.titleID, !title.read, title.reviewID)}} /> <a href="#" onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ props.setTitleID(title.titleID)}}><p>{title.titleName}</p></a>
            {title.publicationDate !== null ? <small style={{marginLeft: "5px"}}> ({title.publicationDate.toString().substring(0, 4)})</small> : null}
            </ListGroupItem>
            )
        })}
        </ListGroup>
    );

};

export default ChecklistItem;
