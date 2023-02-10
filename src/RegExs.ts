let startsUpperCase: RegExp = /^[A-Z]/;
let startsVowel: RegExp = /^[aeiouAEIOU]/
let startsDoubleConsonant: RegExp = /^[^aeiouAEIOU][^aeiouAEIOU]/

let endsMultipleWay = (suffix: string): RegExp => {
    return new RegExp(`(w${suffix}){2,}$`)
}

let endsAyway = (suffix: string): RegExp => {
    return new RegExp(`[a-zA-Z]{1,} (${suffix}w${suffix})$`)
}

let endsAywa = (suffix: string): RegExp => {
    return new RegExp(`[a-zA-Z]{1,}(${suffix}w${suffix.substring(0, suffix.length - 1)})$`)
}

let endsDoubleConsonantAy = (suffix: string): RegExp => {
    return new RegExp(`([^aeiouAEIOU][^aeiouAEIOU]${suffix})$`)
}
let punctuated: RegExp = /[^A-Za-z]$/;

let endsAy = (suffix: string): RegExp => {
    return new RegExp(`(${suffix})$`);
}
let endsWay = (suffix: string): RegExp => {
    return new RegExp(`(w${suffix})$`);
}


export {
    startsUpperCase, endsAy, startsVowel,
    startsDoubleConsonant, punctuated, endsDoubleConsonantAy,
    endsWay, endsMultipleWay, endsAyway, endsAywa

}