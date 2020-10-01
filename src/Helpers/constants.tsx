import API_URL from "./environment"

export const baseURL: string = API_URL + "/";
// console.log("baseURL", baseURL);

export const emailRegExp = new RegExp("^([0-9a-zA-Z]([-]*[0-9a-zA-Z])*@([0-9a-zA-Z][-]*[0-9a-zA-Z])+[a-zA-Z]{2,9})$");
// console.log("emailRegExp", emailRegExp);
