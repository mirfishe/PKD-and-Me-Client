import React, {FunctionComponent} from 'react';
import {ICategory} from "../../Helpers/interfaces"

interface IProps {
    categoryList: ICategory[]
};

const Category: FunctionComponent <(IProps)> = props => {

    // console.log('Category.tsx props.categoryList', props.categoryList);

    return(
        <React.Fragment>
        {props.categoryList.map((category: ICategory) => {
          return (
            <p key={category.categoryID}>{category.category}</p>
            )
        })}
        </React.Fragment>
    );

};

export default Category;
