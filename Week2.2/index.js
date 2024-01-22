const express=require('express');
// to import library express located in nodejs (use npm i express)
const port=3000;

const app=express();


// similar to fs.readFile
// whenever client hits our backend server cursor will first reach here
app.get('/',function (req,res){
    res.send('Hello world')
})

app.post('/backend-api/conversation',function(req,res){
    // run a machine learning model
    res.send('Hello world');
})

app.listen(port);




