require('dotenv').config();
const express=require('express');
const app=express();
app.use(express.json());

const dbConfig= require('./config/dbConfig.js');
const usersRoute= require('./routes/userRoute.js');
const transactionsRoute= require('./routes/transactionsRoute.js');
const requestsRoute= require('./routes/requestsRoute.js');

app.use("/api/users",usersRoute);
app.use("/api/transactions",transactionsRoute);
app.use("/api/requests",requestsRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Process started at on ${PORT}`);
})