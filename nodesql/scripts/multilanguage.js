const prompt = require("prompt-sync")();
let langCode = "HI"

langCode = prompt("Enter Your Preferred Language (HI -> Hindi, EN -> English) : ");

let langFile;
if(langCode === "EN"){
    langFile = require('../lang/english.json');
}

if(langCode === "HI"){
    langFile = require('../lang/hindi.json');
}

const greet = () =>{
    console.log(langFile.HELLO)
}

greet();