const request = require('request');
const express = require('express');

//servers
const s1 = "http://127.0.0.1:6500";
const s2 = "http://127.0.0.1:6501";
const s3 = "here we can configure new ";

const servers = [s1, s2];

//tracking current application server
let current = 0;

const handler = (req, res) => {
    const server = servers[current];
    req.pipe(request({url:server+req.url})).pipe(res);
    //updating the current server
    current = (current+1)%servers.length;

}

const lbServer = express();
//passing the request to handler method
lbServer.use((req,res)=>handler(req,res));
lbServer.listen(8080,(err)=>{
    if(err) console.log("Error running server",err)
    console.log("Server (load balancer) Running on 8080");
})
