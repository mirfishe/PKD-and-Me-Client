import React, {FunctionComponent} from 'react';
import {Grid, Typography} from '@material-ui/core';

interface IProps {

};

const About: FunctionComponent <(IProps)> = props => {

    return(
        <Grid>
            <Typography variant="h4" gutterBottom>Philip K. Dick and Me</Typography>
            <Typography variant="body1" gutterBottom>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ornare felis eleifend purus tempus, at tempor metus euismod. In sit amet orci augue. Suspendisse aliquam velit ac neque scelerisque rhoncus. Vestibulum quis vulputate odio. Nunc blandit varius mollis. Nulla diam elit, facilisis id nulla vel, lacinia suscipit turpis. Morbi auctor quam non diam scelerisque gravida. Mauris dictum libero efficitur, convallis ipsum id, pretium diam. Maecenas lacus turpis, elementum vel leo hendrerit, malesuada pretium ipsum. Donec eros metus, faucibus in sapien ut, mollis fermentum tellus. Nullam ac ultricies ipsum, et semper mauris.</Typography>

            <Typography variant="body1" gutterBottom>Morbi ornare vestibulum massa, facilisis fringilla metus. Pellentesque hendrerit rhoncus vestibulum. Nunc in sem nec tellus cursus tincidunt id vel turpis. Mauris dignissim pretium ex, vel aliquet justo. Praesent lacus ante, cursus vel massa sed, efficitur facilisis ipsum. Nullam tincidunt lobortis arcu, quis sollicitudin ex. Fusce ex odio, pulvinar nec nulla ut, viverra bibendum augue. Aliquam erat volutpat. Fusce porttitor convallis augue, id sagittis nisi ultricies in. Nunc accumsan arcu ac sodales aliquam. Fusce lectus sem, malesuada ac arcu sed, pharetra fringilla ipsum. Ut ullamcorper rutrum ex vel tincidunt. Suspendisse maximus non leo bibendum mattis.</Typography>
        </Grid>
    );

};

export default About;
