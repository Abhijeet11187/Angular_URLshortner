const express=require('express');
const morgan=require('morgan');
const app=express();
const mongoose=require("mongoose");

// const userRout=require('./Routes/User');
const userRoute=require("./Routes/user")

const bodyparser=require('body-parser');
// const userRoute=require("./Routes/user");

mongoose.connect('mongodb+srv://Abhi:'+process.env.MONGO_ATLAS_PW+'@node-rest-shop-yakve.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true 
})
app.use(morgan('dev'));

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });


app.use('/urlShorten',userRoute);

app.use((req,res,next)=>{
    const error=new Error('Not Found');
    error.status=404;
    next(error);
   
  });
  
  app.use((error,req,res,next) => {
  res.status(error.status || 500);
  res.json({error:{message:error.message+" Check Link" }});

  
  });


module.exports=app;