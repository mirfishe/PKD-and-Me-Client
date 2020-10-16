import React, {FunctionComponent} from "react";

import {Grid, Typography, Link, Paper} from "@material-ui/core";
// import BrokenImageIcon from "@material-ui/icons/BrokenImage";
// import BrokenImageOutlinedIcon from "@material-ui/icons/BrokenImageOutlined";
// import ImageIcon from "@material-ui/icons/Image";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
// import ImageSearchOutlinedIcon from "@material-ui/icons/ImageSearchOutlined";
// import ImageSearchRoundedIcon from "@material-ui/icons/ImageSearchRounded";
// import ImageSearchSharpIcon from "@material-ui/icons/ImageSearchSharp";

import {ITitle} from "../../Helpers/interfaces";
import {Redirect} from "react-router-dom";

interface IProps {
    titleList: ITitle[],
    getEditions?: (titleID?: number) => void,
    categoryID: number | null,
    categoryName: string,
    // getTitles: (categoryID: number | null) => void,
    titleID: number | null,
    setTitleID: (titleID: number | null) => void,
    titleSort: string | null
    setTitleSort: (titleSort: string | null) => void
};

const TitleItem: FunctionComponent <(IProps)> = props => {

    // console.log("TitleItem.tsx props.titleList", props.titleList);

    if (props.titleID) {
        return <Redirect to="/title" />;
    } else {

        return(
            <Grid container spacing={2}>

                {props.categoryName !== null && props.categoryName !== "" ? 
                <Grid item xs={12}> 
                <Typography variant="h5" align="center" gutterBottom>{props.categoryName}
                <Typography variant="caption" gutterBottom style={{marginLeft: "10px"}}> Sort By
                {props.titleSort !== "publicationDate" ? 
                <Typography variant="caption" gutterBottom> <Link href="#" onClick={() => props.setTitleSort("publicationDate")}>Publication Date</Link></Typography>
                : null}
                {props.titleSort !== null ? 
                <Typography variant="caption" gutterBottom> <Link href="#" onClick={() => props.setTitleSort(null)}>Title</Link></Typography>
                : null}
                </Typography>
                </Typography>
                </Grid>
                : null}
                
            {props.titleList.map((title: ITitle, index) => {
            return (

                <Grid item xs={3} key={title.titleID}>
                {/* {index === 0 && title.categoryName !== null && title.categoryName !== "" ? 
                <Grid item xs={12}>
                {console.log("TitleItem.tsx props.titleList.map title", title)}
                {console.log("TitleItem.tsx props.titleList.map title.categoryName", title.categoryName)}
                <Typography variant="h5" align="center" gutterBottom>{title.categoryName}</Typography>
                </Grid>
                : null} */}

                <Paper key={title.titleID} style={{margin: "10px", padding: "10px", textAlign: "center"}}>
                <Link href="#" onClick={() => props.setTitleID(title.titleID)}>
                {title.imageName !== null && title.imageName !== "" ? <img src={"https://philipdick.com/images/covers/" + title.imageName} alt={title.titleName}
                style={{marginLeft: "auto", marginRight: "auto"}} /> : <ImageOutlinedIcon style={{fontSize: 150, color: "black"}} />}
                </Link>
                {/* <p>{title.titleName}</p> */}
                {/* <a href="#" onClick={() => props.getEditions(title.titleID)}>{title.titleName}</a> */}
                <Typography variant="body1" gutterBottom><Link href="#" onClick={() => props.setTitleID(title.titleID)}>{title.titleName}</Link>

                {/* {title.publicationDate !== null ? <span>{title.publicationDate}</span> : null} */}
                {title.publicationDate !== null ? <Typography variant="caption" gutterBottom> ({title.publicationDate.toString().substring(0, 4)})</Typography> : null}
                
                </Typography>

                {/* <button onClick={() => this.goToTitle(title.titleID)}>{title.titleName}</button> */}
                {/* <button onClick={() => props.setTitleID(title.titleID)}>{title.titleName}</button> */}
                <Typography variant="subtitle2" gutterBottom>{title.authorFirstName} {title.authorLastName}</Typography>

                {/* <p>{title.shortDescription}</p>
                <p>{title.urlPKDweb}</p> */}
                </Paper>
                </Grid>
                )
            })}
            </Grid>
        );

    };

};

export default TitleItem;
