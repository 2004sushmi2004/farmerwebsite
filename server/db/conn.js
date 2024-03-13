const mongoose=require("mongoose");
//const dotenv =require('dotenv');
//dotenv.config('./.env');

const DB =process.env.DATABASE;

mongoose.connect(DB).then(()=>console.log("data base connected")).catch((error)=>console.log("errno"+error.message))