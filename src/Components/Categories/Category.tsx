import React, {FunctionComponent} from "react";
import {Nav, NavItem} from "reactstrap";
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
        <Nav vertical>
        {props.categoryList.map((category: ICategory) => {
          return (
            <NavItem key={category.categoryID}><a href="#" onClick={(event) => {event.preventDefault(); /*console.log(event.target.value);*/ props.getTitles(category.categoryID)}}>{category.category}</a></NavItem>
            )
        })}

        <NavItem key="addCategory"><AddCategory userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} displayButton={true} /></NavItem>

        </Nav>
    );

};

export default Category;
