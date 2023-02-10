let startsUpperCase: RegExp = /^[A-Z]/;
let startsVowel: RegExp = /^[aeiouAEIOU]/
let startsDoubleConsonant: RegExp = /^[^aeiouAEIOU][^aeiouAEIOU]/

let endsDoubleConsonantAy = (suffix: string): RegExp => {
    return new RegExp(`([^ aeiouAEIOU][^ aeiouAEIOU]${suffix})$`)
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
    endsWay
}