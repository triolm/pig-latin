import { punctuated, startsPunctuated } from "./RegExs";

//check if last character is punctuation and if so delete it, 
//then recursively keep doing that until the last character is [A-Za-z]
let separatePunctuation = (newString: string, punct?: string[]): { newString: string, punct: string[] } => {
    let unpunctuated = newString;
    punct = punct ?? ["", ""];

    if (punctuated.test(newString)) {
        unpunctuated = unpunctuated.substring(0, unpunctuated.length - 1);
        punct[1] = newString.substring(newString.length - 1, newString.length) + punct[1]
    }

    if (startsPunctuated.test(newString) && unpunctuated) {
        unpunctuated = unpunctuated.substring(1, unpunctuated.length);
        punct[0] += newString.substring(0, 1)
    }
    if (newString !== unpunctuated) {
        return separatePunctuation(unpunctuated, punct)
    }
    return { newString, punct };
}

//concatinates each string on one string[] to each string in another
let concatEachItem = (arr1: string[], arr2: string[]): string[] => {
    if (arr2[0] === "") {
        arr2.shift();
    }
    let combined = [];
    for (let i = 0; i < arr1.length; i++) {
        //add arr2's elements to arr1 if they exist
        combined.push((arr1[i] ?? "") + (arr2[i] ?? ""));
    }
    return combined;
}

//takes a string of text and separates it into an array of individual words 
//with punctuation and whitespace at the end of each word
let toArr = (s: string): string[] => {
    //weird CRLF issue was writing \r\n as two lines instead of one?
    s = s.replaceAll("\r\n", "\n")
    let wordArr = s.split(/\s{1,}/);
    let whiteSpaceArr = s.split(/\S{1,}/);
    return concatEachItem(wordArr, whiteSpaceArr);
}

let capitalize = (s: string): string => {
    return s.substring(0, 1).toUpperCase() + s.substring(1);
}

export { toArr, separatePunctuation, concatEachItem, capitalize }