import React from "react";

export interface IGetResponse {
    resultsFound: string,
    message: string,
    // amazonLinks?: IAmazonLink[],
    categories?: ICategory[],
    editions?: IEdition[],
    media?: IMedia[],
    title?: ITitle[],
    user?: IUser[],
    userReview?: IUserReview[],
    error?: {}
};

// export interface IAmazonLink {
//     amazonLinkID: number,
//     ASIN: string,
//     textLinkShort: string,
//     textLinkFull: string,
//     imageLinkSmall: string,
//     imageLinkMedium: string,
//     imageLinkLarge: string,
//     textImageLink: string,
//     active: boolean
// };

export interface ICategory {
    categoryID: number,
    category: string,
    sortID: number,
    active: boolean
};

export interface IEdition {
    editionID: number,
    titleID: number,
    mediaID: number,
    amazonLinkID: number,
    publicationDate: Date,
    imageName: string,
    ASIN: string,
    textLinkShort: string,
    textLinkFull: string,
    imageLinkSmall: string,
    imageLinkMedium: string,
    imageLinkLarge: string,
    textImageLink: string,
    active: boolean
};

export interface IMedia {
    mediaID: number,
    media: string,
    sortID: number,
    active: boolean
};

export interface ITitle {
    titleID: number,
    titleName: string,
    titleSort: string,
    authorFirstName: string,
    authorLastName: string,
    publicationDate: Date,
    imageName: string,
    categoryID: number,
    shortDescription: string,
    urlPKDweb: string,
    active: boolean
};

export interface IUser {
    userID: number,
    firstName: string,
    lastName: string,
    email: string,
    updatedBy: number,
    admin: boolean,
    active: boolean
};

export interface IUserReview {
    reviewID: number,
    userID: number,
    updatedBy: number,
    titleID: number,
    read: boolean,
    dateRead: Date,
    rating: number,
    shortReview: string,
    longReview: string,
    active: boolean
};
