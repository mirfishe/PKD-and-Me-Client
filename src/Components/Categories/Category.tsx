import React, {FunctionComponent} from "react";
import {ListGroup, ListGroupItem} from "reactstrap";
import {ICategory} from "../../Helpers/interfaces";
import AddCategory from "./AddCategory";

interface IProps {
    userID: number | null,
    isAdmin: boolean,
    sessionToken: string | null,
    categoryList: ICategory[],
    getTitles: (categoryID: number | null) => void
};

const Category: FunctionComponent <(IProps)> = props => {

    // console.log("Category.tsx props.categoryList", props.categoryList);

    return(
        <ListGroup flush>
        {props.categoryList.map((category: ICategory) => {
          return (
            <ListGroupItem key={category.categoryID}><a href="#" onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ props.getTitles(category.categoryID)}}>{category.category}</a></ListGroupItem>
            )
        })}

        <ListGroupItem key="addCategory"><AddCategory userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} displayButton={true} /></ListGroupItem>

        </ListGroup>
    );

};

export default Category;
