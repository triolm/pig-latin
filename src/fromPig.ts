import { capitalize, separatePunctuation, toArr } from "./formatting";
import { startsUpperCase, endsAy, startsVowel, endsDoubleConsonantAy, endsWay } from "./RegExs"
import words from "../data/words.json";
import frequencies from "../data/letterfrequencies.json";
import commonWords from "../data/commonwords.json"


// let wordArr: wordsType = words;

let wordFromPig = (s: string): string => {

    //separate word from punctuation
    let { newString, punct } = separatePunctuation(s);

    //remove any weird whitespace
    newString = newString.toLowerCase().trim();

    //word might be empty string or just punctuation
    if (newString === "") { return "" + punct }

    //word might not be pig latin
    if (!endsAy.test(newString)) { return s }

    //the only way a pig latin word could start with a consonant is if the 
    //english word started with three consonants and two were moved to the end
    if (!startsVowel.test(newString)) {
        newString = removeAy(newString, 2);
    }

    //there are ambigious cases if the pig latin word ends in two consonants then "ay"
    //or ends in "way"
    else if (endsDoubleConsonantAy.test(newString) || endsWay.test(newString)) {
        newString = findBestWord(newString);
    }

    //base case with no ambiguity
    else {
        newString = removeAy(newString, 1);
    }

    //capitalize word if necesary
    if (startsUpperCase.test(s)) {
        newString = capitalize(newString)
    }

    return newString + punct;
}

let removeAy = (s: string, charsToMove: number): string => {
    //gets the stem
    let english = s.substring(0, s.length - (2 + charsToMove));
    //ads the first letter(s) back to the front of the word
    return s.substring(s.length - (2 + charsToMove), s.length - 2) + english;
}

let stringFromPig = (s: string): string => {
    let piggedArr = toArr(s).map(wordFromPig);
    return piggedArr.join("");
}

let findBestWord = (s: string): string => {
    //its possible that the first OR first two characters were moved to the end
    let options = [removeAy(s, 1), removeAy(s, 2)]

    //account for the english words starting in vowels 
    if (endsWay.test(s)) {
        options.unshift(s.substring(0, s.length - 3));
    }
    //round down options to only real english words
    for (let i = 0; i < options.length; i++) {
        let firstLetter: string = options[i].substring(0, 1);
        //the words list is sorted by letter, if the first character is weird, skip this option
        let letterArr: string[] = words[firstLetter as keyof typeof words]
        if (!letterArr) continue;

        //the contractions in the words list don't have curly quotes
        if (!letterArr.includes(options[i].replaceAll(/(‘|’)/g, "'"))) {
            //if the option isn't a word, discard it
            options.splice(i, 1);
            //accounting for the array having a different length
            i--
            if (!options.length) { return removeAy(s, 1) };
        }
    }

    if (options.length == 1) { return options[0] };

    //choose best option
    let highest: { word: string, confidence: number } = { word: options[0], confidence: 0 };
    for (let i of options) {

        //set confidence to the frequency of the first two letters of the option
        //in the list of english words
        let confidence = frequencies[i.substring(0, 2) as keyof typeof frequencies];

        //if option is in the top 1000 words, set confidenceto 20000 - ranking
        //gives being in the top 1000 words a might greater weighting to letter frequency
        if (commonWords[i as keyof typeof commonWords]) {
            confidence = 20000 - commonWords[i as keyof typeof commonWords];
        }
        //if this option is the best so far, put it in highest
        if (confidence && confidence > highest.confidence) {
            highest = {
                word: i,
                confidence: confidence
            }
        }
    }
    return highest.word;
}

export default stringFromPig