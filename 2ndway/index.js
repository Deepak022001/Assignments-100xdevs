const express=require('express');
const app=express();
const fs=require('fs');
app.use(bodyParser.json());

function findIndex(arr,index){
    for(let i =0;i<arr.length;i++){
        if(arr[i].index===index){
            return i;
        }
    }
    return -1;
}

function removeIndex(arr,index){
    let newArray=[];
    for(let i=0;i<arr.length;i++){
        if(arr[i].index!==index){
            newArray.push(arr[i]);
        }
    }
    return newArray;
}

app.get('/todos',(req,res)=>{
    fs.readFile("todos.json","utf-8",(err,data)=>{
        if(err) throw(err);
        res.json(JSON.parse(data));
    })
})
app.post("/todos",(req,res)=>{
    const newTodo={
        id:Math.floor(Math.random()*100000),
        title:req.body.title,
        description:req.body.description
    };
    fs.writeFile("todos.json","utf-8",(err,data)=>{
        if(err) throw err;
        const todos=JSON.parse(data);
        todos.push(newTodo);
        fs.writeFile("todos.json",JSON.stringify(todos),(err)=>{
            if(err)throw(err);
            res.status(201).json(newTodo);
        })
        
    })
})


app.listen(5000);