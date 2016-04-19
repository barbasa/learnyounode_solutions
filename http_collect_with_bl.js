'use strict'

var http = require('http')
var bl = require('bl')

let url = process.argv[2] 

http.get(url, function(res) {

        res.pipe(bl(function(err,data) {
                    console.log(data.length)
                    console.log(data.toString())
                }))
})
