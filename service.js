const http = require('http')
const fs = require('fs')

http.createServer(function(req,res){
    fs.readFile('form.html',function(error,response){
        if(error){
            throw(error)
        }else{
           const aa = response.toString()
            res.write(aa)
            res.end()
        }
    })
    
}).listen(8100)