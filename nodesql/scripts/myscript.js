console.log("_____________Script Started_____________");


//another method to read a file
// const myFile = require('./myfile.json');
// console.log(myFile);

//using fs module to read and write a file
//const fs = require('fs');

// fs.readFile('myfile.json',(err,fileData)=>{
//     if(err) console.log("Reading File Error",err);
//     console.log(JSON.parse(fileData));
// })

// console.log("file read success")
// let users = require('./myfile.json');


// let id = users.length;
// users.push({id:1,name:"Tej",role:"SDE 1"})


// fs.writeFile('myfile.json',JSON.stringify(users),(err,fileData)=>{
//     if(err) console.log("Writing File Error",err);
//     console.log(users);
// })

//understanding paths
// const path = require('path');

// console.log(__dirname);

// let newPath = path.join(__dirname,'/uploads');
// console.log(newPath);

// newPathSelf = __dirname+'/uploads';
// console.log(newPathSelf);

// let customPath = path.join(__dirname,"../../","newfolder");
// console.log(customPath);


// myfun();

// function myfun() {
//     console.log("hello fun");
//     try {
//         //throw new Error("This is error")
//         secondFun();

//     } catch (err) {
//         console.log("===========", err?.name);
//         console.log("===========", err?.message);
//     }
// }

// function secondFun() {
//     console.log("second fun is running");
//     throw new Error("This is error from second fun")

// }
















console.log("______________Script Finished______________");