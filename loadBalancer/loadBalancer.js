require("newrelic");
const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
const request = require('request');
const path = require('path');


const portLB = process.env.PORT || 3001;

const servers = ['http://127.0.0.1:3002', 'http://127.0.0.1:3003'];
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
        console.log(count);
        switchBoard(req,res, count)
      }
    } else {
      res.send(JSON.parse(body));
    }    
  })
  rotateServer();
}

const loadBalancer = express().get('*',switchBoard).post('*', switchBoard).patch('*',switchBoard).put('*',switchBoard).delete('*',switchBoard);

loadBalancer.use('/restaurants/:restaurant_id', express.static(path.join(__dirname, '/../client/dist/index.html')));



loadBalancer.listen(portLB, () => {
  console.log(`listening on port ${portLB}`);
});

module.exports = loadBalancer;

