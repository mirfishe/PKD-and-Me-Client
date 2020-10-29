import React, {FunctionComponent} from "react";
import {Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter} from "reactstrap";
import {Image} from 'react-bootstrap-icons';
import {IEdition} from "../../Helpers/interfaces";
import {displayDate, displayYear} from "../../Helpers/constants";
import EditEdition from "./EditEdition";
import AddEdition from "./AddEdition";

interface IProps {
    userID: number | null,
    isAdmin: boolean,
    sessionToken: string | null,
    titleID: number | null,
    titlePublicationDate: Date | null,
    editionList: IEdition[],
    editionUpdated: () => void
};

const Edition: FunctionComponent <(IProps)> = props => {

    // console.log("Edition.tsx props.editionList", props.editionList);

    // if (props.editionList !== undefined ) {

    //     let mediaData: IMedia = props.editionList.medium;
    //     let mediaData: {} = props.editionList.medium;

    //     if (mediaData !== undefined) {
    //         console.log("Edition.tsx mediaData", mediaData);
    //     };

    // };

    // console.log("Edition.tsx props.titlePublicationDate", props.titlePublicationDate);

    return(
        <Container>
            <Row>
            <Col xs="12">
            <h5 className="text-center">Purchase
            {props.isAdmin === true ? <AddEdition userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} titleID={props.titleID} titlePublicationDate={props.titlePublicationDate} editionUpdated={props.editionUpdated} displayIcon={true} /> : null}
            </h5>
            </Col>
            </Row>
            {/* <Row>
            <GridList cols={5}> */}
            {/* <GridListTile key="subheader" cols={6} style={{height: "auto"}}>
                <ListSubheader>Purchase Editions</ListSubheader>
            </GridListTile> */}
            {/* {props.editionList.map((edition: IEdition) => {
            return (
                <React.Fragment> */}

                    {/* {edition.textLinkShort !== null && edition.textLinkShort !== "" ? 
                    <GridListTile key={edition.editionID} style={{margin: "20px"}}>

                    <Link href={edition.textLinkShort} target="_blank" rel="noreferrer">
                    {edition.imageName !== null && edition.imageName !== "" ? <img src={edition.imageName} alt={edition.mediaName} /> : <ImageOutlinedIcon style={{fontSize: 150, color: "black"}} />}
                    </Link>

                    <GridListTileBar title={edition.mediaName} subtitle={edition.publicationDate !== null ? displayDate(edition.publicationDate) : null} actionIcon={props.isAdmin === true ? <EditEdition userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} titleID={props.titleID} titlePublicationDate={props.titlePublicationDate} editionID={edition.editionID} editionUpdated={props.editionUpdated} displayIcon={true} /> : null} /> */}
                    {/* </Link> */}
                    {/* </GridListTile>
                    : null} */}

                    {/* {edition.imageLinkLarge !== null && edition.imageLinkLarge !== "" ? 
                    <GridListTile key={edition.editionID} style={{margin: "20px"}}>

                    <div dangerouslySetInnerHTML={{"__html": edition.imageLinkLarge}} />

                    <GridListTileBar title={edition.mediaName} subtitle={edition.publicationDate !== null ? displayDate(edition.publicationDate) : null} actionIcon={props.isAdmin === true ? <EditEdition userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} titleID={props.titleID} titlePublicationDate={props.titlePublicationDate} editionID={edition.editionID} editionUpdated={props.editionUpdated} displayIcon={true} /> : null} />
                    </GridListTile>
                    : null}

                </React.Fragment>
                )
            })}
            </GridList>
            </Row> */}

            <Row>
            {props.editionList.map((edition: IEdition) => {
            return (
                <Col>

                    <Card key={edition.editionID}>
                    <CardHeader>
                    {edition.mediaName}
                    {props.isAdmin === true ? <EditEdition userID={props.userID} isAdmin={props.isAdmin} sessionToken={props.sessionToken} titleID={props.titleID} titlePublicationDate={props.titlePublicationDate} editionID={edition.editionID} editionUpdated={props.editionUpdated} displayIcon={true} /> : null}
                    </CardHeader>

                    <CardBody className="editionImage">
                    {edition.imageLinkLarge !== null && edition.imageLinkLarge !== "" ? 
                    <div dangerouslySetInnerHTML={{"__html": edition.imageLinkLarge}} />
                    :
                    <a href={edition.textLinkFull} target="_blank" rel="noreferrer">
                    {edition.imageName !== null && edition.imageName !== undefined && edition.imageName !== "" ? <img src={edition.imageName} alt="" /> : <Image size="150" className="noImageIcon"/>}
                    </a>
                    }
                    </CardBody>
                    <CardFooter>
                    {edition.publicationDate !== null ? <CardText>Released: {displayDate(edition.publicationDate)}</CardText> : null}
                    </CardFooter>
                    </Card>

                </Col>
                )
            })}
            </Row>

        </Container>
    );

};

export default Edition;
