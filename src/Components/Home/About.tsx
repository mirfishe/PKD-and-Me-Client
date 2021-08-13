import React, {FunctionComponent} from "react";
import {Grid, Typography} from "@material-ui/core";

interface IProps {

};

const About: FunctionComponent <(IProps)> = props => {

    return(
        <Grid container spacing={2}>
            <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>PKD and Me</Typography>

            <Typography variant="h6" align="center" gutterBottom>A personal journey into the works of Philip K. Dick.</Typography>
            </Grid>

            <Grid container spacing={2} justify="center">

            <Grid item xs={9}>
            <Typography variant="body1" gutterBottom>When someone discovers the work of Philip K. Dick and becomes fascinated by it, there is a phenomenon in which they must read all of his work as fast as possible. Sometimes the plots and incidents blur together into one mega-novel. And there are a lot of novels. It would be helpful for a person to have a checklist to mark the ones that they’ve read and the ability to enter what they thought of the novel.</Typography>

            <Typography variant="body2" gutterBottom>Plus the application would provide resources such as publication dates, covers and links to more information for an even deeper dive into the work.</Typography>
            </Grid>
            <Grid item xs={2}>
            <img src="https://philipdick.com/images/PKD/Philip_Dick2.jpg" alt="Philip K. Dick" />
            </Grid>
            </Grid>
        </Grid>
    );

};

export default About;
