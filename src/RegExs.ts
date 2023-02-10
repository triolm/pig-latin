let startsUpperCase: RegExp =/^[A-Z]/;
let endsAy: RegExp = /(ay)$/;
let startsVowel: RegExp = /^[aeiouAEIOU]/
let startsDoubleConsonant: RegExp = /^[^aeiouAEIOU][^aeiouAEIOU]/
let endsDoubleConsonantAy: RegExp = /([^aeiouAEIOU][^aeiouAEIOU]ay)$/
let endsWay: RegExp = /(way)$/
let punctuated: RegExp = /[^A-Za-z]$/;

export {
    startsUpperCase, endsAy, startsVowel,
    startsDoubleConsonant, punctuated, endsDoubleConsonantAy,
    endsWay
}