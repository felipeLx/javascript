/*
const fs = require('fs');
create a copy of some file; if the file exist, just will replace
fs.copyFileSync("file1.txt", "file2.txt");
*/

let superheroes = require("superheroes");
let mySuperName = superheroes.random();

console.log(mySuperName);

let supervillains = require("supervillains");
let supervillainsName = supervillains.random();

console.log(supervillainsName);