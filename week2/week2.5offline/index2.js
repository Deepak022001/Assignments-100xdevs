var users = [
    {
        name: "deepak",
        kidneys: [{
            healthy: false
        }]
    }
];
const express = require('express');
const app = express();
app.use(express.json());
app.get('/', function (req, res) {
    const johnKidneys = users[0].kidneys;
    const noOfKidneys = johnKidneys.length; 
    console.log(johnKidneys);

    let noOfHealthyKidneys = 0;

    for (let i = 0; i < johnKidneys.length; i++) { 
        if (johnKidneys[i].healthy) {
            noOfHealthyKidneys += 1;
        }
    }

    const noOfUnhealthyKidneys = noOfKidneys - noOfHealthyKidneys; 
    return res.json({ noOfUnhealthyKidneys });
});

app.post("/",function(req,res){
    const isHealthy=req.body.isHealth;
    users[0].kidneys.push({
        healthy:isHealthy
    })
    res.json({
        msg:"Done!"
    })
})

app.put('/',function(req,res){
    for(let i=0;i<users[0].kidneys.length;i++){
        users[0].kidneys[i].healthy=true;
    }
    res.json({});
})

app.delete('/',function(req,res){
    const newKidneys=[];
    for(let i=0;i<users[0].kidneys.length;i++){
        if(users[0].kidneys[i].healthy){
            newKidneys.push({
                isHealthy:true
            })
        }
    }
    users[0].kidneys=newKidneys;
    res.json({msg:"done"});
})

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
