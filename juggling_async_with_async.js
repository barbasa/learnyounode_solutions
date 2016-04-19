'use strict'

var http = require('http')
var bl = require('bl')
var async = require('async')


var functionArr = [];
process.argv.slice(2,5).forEach(function(url) {
    functionArr.push(function(cb) {
        http.get(url, function(res) {

            res.pipe(bl(function(err,data) {
                cb(null,data)
            }))    
            
    
        })
    })
})

async.series(functionArr,
    function(err, results){
        results.forEach(function(data){
            console.log(data.toString())
        })
    });
