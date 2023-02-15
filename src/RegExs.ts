const startsUpperCase: RegExp = /^[A-Z]/;
const startsVowel: RegExp = /^[aeiouAEIOU]/
const startsDoubleConsonant: RegExp = /^[^aeiouAEIOU][^aeiouAEIOU]/
const punctuated: RegExp = /[^A-Za-z]$/;
const startsPunctuated: RegExp = /^[^A-Za-z]/;

//source for allCaps: https://stackoverflow.com/questions/2323988/determine-if-string-is-all-caps-with-regular-expression
const allCaps: RegExp = /^[^a-z]*$/g;

//these are named in terms of the "ay" suffix for clarity but
// apply to any input suffix ---
const endsMultipleWay = (suffix: string): RegExp => {
    return new RegExp(`(w${suffix}){2,}$`)
}

const endsAyway = (suffix: string): RegExp => {
    return new RegExp(`[a-zA-Z]{1,} (${suffix}w${suffix})$`)
}

const endsAywa = (suffix: string): RegExp => {
    return new RegExp(`[a-zA-Z]{1,}(${suffix}w${suffix.substring(0, suffix.length - 1)})$`)
}

const endsDoubleConsonantAy = (suffix: string): RegExp => {
    return new RegExp(`([^aeiouAEIOU][^aeiouAEIOU]${suffix})$`)
}

const endsAy = (suffix: string): RegExp => {
    return new RegExp(`(${suffix})$`);
}
const endsWay = (suffix: string): RegExp => {
    return new RegExp(`(w${suffix})$`);
}


export {
    startsUpperCase, startsVowel, allCaps,
    startsDoubleConsonant, punctuated, startsPunctuated,
    endsAy, endsDoubleConsonantAy, endsWay,
    endsMultipleWay, endsAyway, endsAywa
}