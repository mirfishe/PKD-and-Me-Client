import React, {FunctionComponent} from "react";
import {List, ListItem, Link, ListItemText} from "@material-ui/core";
import {ICategory} from "../../Helpers/interfaces";

interface IProps {
    categoryList: ICategory[],
    getTitles: (categoryID: number | null) => void
};

const Category: FunctionComponent <(IProps)> = props => {

    // console.log("Category.tsx props.categoryList", props.categoryList);

    return(
        <List>
        {props.categoryList.map((category: ICategory) => {
          return (
            <ListItem key={category.categoryID}><Link href="#" onClick={() => props.getTitles(category.categoryID)}><ListItemText>{category.category}</ListItemText></Link></ListItem>
            )
        })}
        </List>
    );

};

export default Category;
