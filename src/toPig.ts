import { capitalize, separatePunctuation, toArr } from "./formatting"
import { startsUpperCase, startsVowel, startsDoubleConsonant, allCaps } from "./RegExs"

let wordToPig = (s: string, suffix: string): string => {
    if (!s) return ""

    let { newString, punct } = separatePunctuation(s);

    newString = newString.toLowerCase().trim();

    //if string is empty or only punctutation
    if (!newString) {
        return punct[0] + newString + punct[1];
    }

    //add way if word starts in vowel
    if (startsVowel.test(newString)) {
        newString = newString + "w" + suffix;
    }

    //if word starts in 2 consonant, move them both over
    else if (startsDoubleConsonant.test(newString)) {
        newString = addAy(newString, 2, suffix);
    }

    //base case with no special condition
    else {
        newString = addAy(newString, 1, suffix);
    }

    //capitalize word if necesary
    if (allCaps.test(s)) {
        newString = newString.toUpperCase();
    }
    else if (startsUpperCase.test(s)) {
        newString = capitalize(newString)
    }

    return punct[0] + newString + punct[1];
}

//moves  first character(s) to end and adds ay
let addAy = (s: string, charsToMove: number, suffix: string): string => {
    return s.substring(charsToMove) + s.substring(0, charsToMove) + suffix;
}

let stringToPig = (s: string, suffix: string = "ay"): string => {
    if (!s) {
        return "";
    }
    let piggedArr = toArr(s).map((s) => (wordToPig(s, suffix)));
    return piggedArr.join("");
}

export default stringToPig