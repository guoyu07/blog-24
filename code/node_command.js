#!/usr/bin/env node

/*
 console.log('hello world \n'+ process.argv[0]+"\n"+process.argv[1]+"\n"+process.argv[2]);
 */

/*
//child_process
var argv2 = process.argv[2];
var exec = require("child_process").exec;
var child = exec('echo hello ' + argv2, function (err, stdout, stderr) {
    if (err) throw err;
    console.log(stdout)
});*/

var shell=require('shelljs');
var argv2=process.argv[2];
shell.exec("echo shelljs hello "+argv2);