require("newrelic");
const express = require('express');
const request = require('request');
const path = require('path');


const portLB = process.env.PORT || 3001;

//const servers = ['http://127.0.0.1:3002','http://127.0.0.1:3003'];
const servers = ['http://127.0.0.1:3002','http://52.8.207.211:3002'];
//const servers = ['http://127.0.0.1:3002','http://52.8.207.211:3003', 'http://127.0.0.1:3003','http://52.8.207.211:3002'];
var serIndx = 0;
var count =0;
const rotateServer = () =>{
  serIndx ++;
  if(serIndx >= servers.length){
    serIndx =0;
  }
}


const switchBoard = (req, res)=>{
  request(`${servers[serIndx] + req.url}`, (err, responce, body)=>{
    if(err){
      if(count >= 3){
        count = 0;
        res.send(err);
      } else {
        count=count+1;
        switchBoard(req,res, count)
      }
    } else {
      count = 0;
      res.send(JSON.parse(body));
    }    
  })
  rotateServer();
}

const loadBalancer = express()
loadBalancer.get("/api/reviews/\*", switchBoard);
loadBalancer.post("/api/reviews/\*", switchBoard);
loadBalancer.patch("/api/reviews/\*", switchBoard);
loadBalancer.put("/api/reviews/\*", switchBoard);
loadBalancer.delete("/api/reviews/\*", switchBoard);


loadBalancer.use('/restaurants/:restaurant_id', express.static(path.join(__dirname, '/../client/dist')));
loadBalancer.use('/loaderio-dbdd92a06499bda97096291f7a5e4ed1.html', express.static(path.join(__dirname, "/../loaderio-dbdd92a06499bda97096291f7a5e4ed1.html")));

loadBalancer.listen(portLB, () => {
  console.log(`listening on port ${portLB}`);
});

module.exports = loadBalancer;

