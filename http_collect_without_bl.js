'use strict'

var http = require('http')

let url = process.argv[2] 

http.get(url, function(res) {
    var _buffer = new Buffer('')
    res.on('data', function(chunk){
        var buffLength = _buffer.length + chunk.length
        // Since buffers can't be resized and we don't know upfront the
        // dimension of the whole data streamed, every time we need to create a new one with
        // dimension = "previous existing buffer (_buffer.length) + dimension of the new chunk of data being streamed (chunk.length)"
        var newBuff = new Buffer(buffLength)
        _buffer.copy(newBuff)
        chunk.copy(newBuff, _buffer.length)
        _buffer = newBuff
    })
    res.on('end', function(){
        
        console.log(_buffer.length)
        console.log(_buffer.toString())
    })
    
})
