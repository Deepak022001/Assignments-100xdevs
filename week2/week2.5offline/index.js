// Https server exposes our code to world where people can find you and use your logic
// how do you create http 
// ans express 

const express=require('express')

function calculateSum(n){
    let ans=0;
    for(let i=0;i<=n;i++){
        ans=ans+i;
    }
    return ans;
}

const app=express();

// logic to expose calculate sum 
app.get('/',function(req,res){
    const n=req.query.n;
    const ans=calculateSum(n)
    res.send(ans.toString());
})

// address where user can find our address
app.listen(3001);


// type localhost:3000/?n=30