'use strict'

var http = require('http')
var bl = require('bl')

var count = 0
var content = []

function getUrl(i){
    
    var url = process.argv[i]
    http.get(url, function(res){
        
        res.pipe(bl(function(err,data) {
            if (err) 
                console.log(err)

            // This bit of logic to keep track of the order of the 
            // async calls can be achieved using libraries like 'async'
            // See the 'juggling_async_with_async.js' example.
            content[i-2] = data.toString()
            count++
            if (count == 3) {
                for (var a = 0; a < 3; a++) {
                    console.log(content[a])
                }
            }
        }))
    })
    
}

for (var i = 2; i < 5; i++) {
    getUrl(i)
}
