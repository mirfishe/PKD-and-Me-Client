export const displayDate = (dateToDisplay: Date) => {

    // console.log("sharedFunctions displayDate dateToDisplay", dateToDisplay);

    let newDisplayDate = "";

    if (dateToDisplay !== undefined) {

        // Year
        let yyyy = dateToDisplay.toString().substring(0, 4);
        // Month
        let mm = dateToDisplay.toString().substring(5, 7);
        // Day
        let dd = dateToDisplay.toString().substring(8, 10);

        newDisplayDate = mm + "/" + dd + "/" + yyyy;

    };

    // console.log("sharedFunctions displayDate dateToDisplay", dateToDisplay);

    return newDisplayDate;
};

export const displayYear = (dateToDisplay: Date) => {

    // console.log("sharedFunctions displayYear dateToDisplay", dateToDisplay);

    let newDisplayDate = "";

    if (dateToDisplay !== undefined) {

        // Year
        let yyyy = dateToDisplay.toString().substring(0, 4);
        // Month
        // let mm = dateToDisplay.toString().substring(5, 7);
        // Day
        // let dd = dateToDisplay.toString().substring(8, 10);

        // newDisplayDate = mm + "/" + dd + "/" + yyyy;

        newDisplayDate = yyyy;

    };

    // console.log("sharedFunctions displayYear dateToDisplay", dateToDisplay);

    return newDisplayDate;
};

export const createImageName = (titleName: string | undefined) => {

    // console.log("sharedFunctions createImageName titleName", titleName);

    let newImageName: string = "";

    if (titleName !== undefined) {
        // Capitalize the first letter of every word
        newImageName = titleName.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
        // I'm sure there's a more elegant way to do this
        // newImageName = newImageName.replaceAll(".", "");
        // newImageName = newImageName.replaceAll("?", "");
        // newImageName = newImageName.replaceAll(",", "");
        // newImageName = newImageName.replaceAll(":", "");
        // newImageName = newImageName.replaceAll("-", "");
        //newImageName = newImageName.replace(/[.,\/#\'\?!$%\^&\*;:{}=\-_`~()]/g,"");
        //newImageName = newImageName.replaceAll(" ", "");
        // Remove all spaces - Doesn't work
        // newImageName = newImageName.replace(/\s{2,}/g," ");

        // https://www.codefari.com/2019/11/removereplace-special-characters-from.html
        // SELECT regexp_replace('Remove!@#$ Special &*&characters', '[^\w]+','','g');
        // regexp_replace("titleName", '[^\w]+')
        // newImageName = titleName.replace(regExpr, "");

        // select "titleName"
        // --, replace("titleName", '-', '|')
        // , regexp_replace("titleName", '[^\w]+','','g')
        // , regexp_replace("titleName", '[^\w]+',' ','g')
        // , replace(regexp_replace("titleName", '[^\w]+',' ','g'), ' ', '-')
        // from titles

        // https://stackoverflow.com/questions/9705194/replace-special-characters-in-a-string-with-underscore/9705227
        newImageName = newImageName.replace(/[^a-zA-Z0-9]/g, "");
        

        newImageName = "https://philipdick.com/images/covers/" + newImageName + ".jpg";
    };

    // console.log("sharedFunctions createImageName newImageName", newImageName);

    return newImageName;
};

export const createTitleURL = (titleName: string | undefined) => {

    // console.log("sharedFunctions createImageName titleName", titleName);

    let newTitleURL: string = "";

    if (titleName !== undefined) {
        // Capitalize the first letter of every word
        newTitleURL = titleName.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
        // I'm sure there's a more elegant way to do this
        // newTitleURL = newTitleURL.replaceAll(".", "");
        // newTitleURL = newTitleURL.replaceAll("?", "");
        // newTitleURL = newTitleURL.replaceAll(",", "");
        // newTitleURL = newTitleURL.replaceAll(":", "");
        // newTitleURL = newTitleURL.replaceAll("-", "");
        //newTitleURL = newTitleURL.replace(/[.,\/#\'\?!$%\^&\*;:{}=\-_`~()]/g,"");
        //newTitleURL = newTitleURL.replaceAll(" ", "");
        // Remove all spaces - Doesn't work
        // newTitleURL = newTitleURL.replace(/\s{2,}/g," ");

        // https://www.codefari.com/2019/11/removereplace-special-characters-from.html
        // SELECT regexp_replace('Remove!@#$ Special &*&characters', '[^\w]+','','g');
        // regexp_replace("titleName", '[^\w]+')
        // newTitleURL = titleName.replace(regExpr, "");

        // select "titleName"
        // --, replace("titleName", '-', '|')
        // , regexp_replace("titleName", '[^\w]+','','g')
        // , regexp_replace("titleName", '[^\w]+',' ','g')
        // Use this regular expression to create the titleURL
        // Execpt that letters after ' are captitalized also
        // , replace(regexp_replace(initcap("titleName"), '[^\w]+',' ','g'), ' ', '-')
        // from titles

        // https://stackoverflow.com/questions/9705194/replace-special-characters-in-a-string-with-underscore/9705227
        newTitleURL = newTitleURL.replace(/[^a-zA-Z0-9]/g, "");
        

        // newTitleURL = "https://philipdick.com/images/covers/" + newTitleURL + ".jpg";
    };

    // console.log("sharedFunctions createImageName newTitleURL", newTitleURL);

    return newTitleURL;
};

export const getASIN = (txtTextLinkFull: string | undefined) => {

    // console.log("sharedFunctions.tsx getASIN txtTextLinkFull", txtTextLinkFull);

    let txtASIN = "";

    // select substring("textLinkFull" from position('/dp/' in "textLinkFull") + 4 for 10) from editions

    if (txtTextLinkFull !== undefined && txtTextLinkFull !== "") {

        console.log("sharedFunctions.tsx getASIN txtTextLinkFull.indexOf(\"/dp/\")" , txtTextLinkFull.indexOf("/dp/"));
        console.log("sharedFunctions.tsx getASIN txtTextLinkFull.indexOf(\"/product/\")" , txtTextLinkFull.indexOf("/product/"));

        if (txtTextLinkFull.indexOf("/dp/") !== -1) {

            // console.log("sharedFunctions.tsx getASIN txtTextLinkFull.substring(txtTextLinkFull.indexOf(\"/dp/\") + 4, txtTextLinkFull.indexOf(\"/ref=\"))", txtTextLinkFull.substring(txtTextLinkFull.indexOf("/dp/") + 4, txtTextLinkFull.indexOf("/ref=")));
            txtASIN = txtTextLinkFull.substring(txtTextLinkFull.indexOf("/dp/") + 4, txtTextLinkFull.indexOf("/ref="));

        } else if (txtTextLinkFull.indexOf("/product/") !== -1) {

            // console.log("sharedFunctions.tsx getASIN txtTextLinkFull.substring(txtTextLinkFull.indexOf(\"/dp/\") + 4, txtTextLinkFull.indexOf(\"/ref=\"))", txtTextLinkFull.substring(txtTextLinkFull.indexOf("/dp/") + 4, txtTextLinkFull.indexOf("/ref=")));
            txtASIN = txtTextLinkFull.substring(txtTextLinkFull.indexOf("/product/") + 9, txtTextLinkFull.indexOf("/ref="));

        };

    } else {
        // return false;
        // return null;
        return "";
    };

    return txtASIN;

};