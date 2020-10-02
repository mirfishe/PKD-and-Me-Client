import React, {FunctionComponent} from 'react';
import {ICategory} from "../../Helpers/interfaces"

interface IProps {
    categoryList: ICategory[],
    getTitles: (categoryID?: number) => void
};

const Category: FunctionComponent <(IProps)> = props => {

    // console.log('Category.tsx props.categoryList', props.categoryList);

    return(
        <React.Fragment>
        {props.categoryList.map((category: ICategory) => {
          return (
            <p key={category.categoryID}><a href="#" onClick={() => props.getTitles(category.categoryID)}>{category.category}</a></p>
            )
        })}
        </React.Fragment>
    );

};

export default Category;
