import React from "react";

// Not needed?
// export interface IGetResponse {
//     resultsFound: string,
//     message: string,
//     // amazonLinks?: IAmazonLink[],
//     categories?: ICategory[],
//     editions?: IEdition[],
//     media?: IMedia[],
//     title?: ITitle[],
//     user?: IUser[],
//     userReview?: IUserReview[],
//     error?: {}
// };

// Not needed?
// export interface ILogInResponse {
//     userID: number,
//     firstName: string,
//     lastName: string,
//     email: string,
//     updatedBy: number,
//     admin: boolean,
//     active: boolean
//     sessionToken: string,
//     isLoggedIn: boolean,
//     resultsFound: boolean,
//     message: string,
//     error?: {}
// };

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
    active: boolean,
    updatedAt: Date
};

export interface IEdition {
    editionID: number,
    titleID: number,
    mediaID: number,
    medium?: IMedia,
    media?: IMedia,
    mediaName?: string,
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
    active: boolean,
    updatedAt: Date
};

export interface IMedia {
    mediaID: number,
    media: string,
    sortID: number,
    active: boolean,
    updatedAt: Date
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
    category?: ICategory,
    categoryName?: string,
    shortDescription: string,
    urlPKDweb: string,
    reviewID?: number,
    read?: boolean,
    dateRead?: Date,
    active: boolean,
    updatedAt: Date
};

export interface IUser {
    userID: number,
    firstName: string,
    lastName: string,
    email: string,
    updatedBy: number,
    admin: boolean,
    active: boolean,
    updatedAt: Date
};

export interface IUserReview {
    reviewID: number,
    userID: number,
    user?: IUser,
    userFirstName?: string,
    userLastName?: string,
    updatedBy: number,
    titleID: number,
    read: boolean,
    dateRead: Date,
    rating: number,
    shortReview: string,
    longReview: string,
    active: boolean,
    updatedAt: Date
};
