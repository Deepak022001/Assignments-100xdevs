const express=require('express');
const app=express();

app.use(express.json());
let ADMINS=[];
let USERS=[];
let COURSES=[];

const secretKey="Your_Secret_Key";
const generateJwt=(user)=>{
    const payload={username:user.username}
    return jwt .sign(payload,secretkey,{expressIn:1h})
}

const authenticateJwt=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(authHeader){
    const token=authHeader.split(' ')[1];
    jwt.verify(token,secretKey,(err,user)=>{
        if(err){
            return res.sendStatus(403);
        }
        req.user=user;
        next();
    });
}
    else{
        res.sendStatus(401);

    }
};
app.post('/admins/signup',(req,res)=>{
    const admin=req.body;
    const existingAdmin=ADMINS.find(a=>a.username===admin.username);
    if(existingAdmin){
        res.status(403).json({
            message:'Admin already exists'
        })
    }
    else{
        ADMINS.push(admin);
        const tokens=generateJwt(admin);
        res.json({
            message:"Admin created successfully",token
        });
    }
});
app.post('/admin/login',(req,res)=>{
    const{username,password}=req.headers;
    const admin=ADMINS.find(a=>a.username===username && a.password===password);
    if(admin){
        const token=generateJwt(admin);
        res.json({
            message:'Logged in Successfully',token
        });
    }
    else{
        res.status(403).json({
            message:'Admin authentication failed'
        });
    }
});

app.post('/admin/course',authenticateJwt,(req,res)=>{

})

app.listen(3000,()=>{
    console.log("app running");
})
