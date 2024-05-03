import express from 'express';
import cors from 'cors';


const app=express();




app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));

//router declaration
import userrouter from '../Routers/userroutes.js'
import adminrouter from '../Routers/adminroutes.js'
import basicRouter from '../Routers/router.js'

app.use("/api/v1/user",userrouter);
app.use("/api/v1/admin",adminrouter);
app.use("/api/v1",basicRouter);




export {app};