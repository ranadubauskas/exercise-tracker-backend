const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const corsOptions ={
    origin:'*', 
    credentials:true,
    optionSuccessStatus:200,
 }

require('dotenv').config();


const app=express();
const port = process.env.PORT || 3000;


//Middleware:
app.use(cors(corsOptions));
app.use(express.json());



mongoose.connect(process.env.MONGO_URI, () => {
    console.log("connected to DB")
});


const exercisesRouter= require('./routes/exercises');
const usersRouter= require('./routes/users');
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.get('/', (req, res) => {
    res.json("Hello from express")
});


app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`);
})