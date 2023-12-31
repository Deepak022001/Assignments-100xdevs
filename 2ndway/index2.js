const express=require('express');
const fs=require('fs');
let todo=[];
app.get('/',(req,res)=>{
    fs.readFile('package.json','utf-8',(err,data)=>{
        if(err)
        throw(err)
        res.json(JSON.parse(data));
    })
})

app.post('/post',(req,res)=>{
    let newtodo={
        title:req.body.title,
        description:req.body.description,
        id : Math.floor(Math.random() * 10000),
    }
    fs.writeFile('package.json',(err,data)=>{
        if(err) throw (err)
        const todos=json.parse(data);
        todo.push(todos);
    })
    todo.push(newtodo);
    res.json(newtodo);


})