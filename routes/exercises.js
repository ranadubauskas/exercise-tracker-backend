const express = require('express');
const { route } = require('express/lib/application');
const res = require('express/lib/response');
const Exercise = require('../models/exercise.model');
const router = express.Router();

router.get('/', async (req, res)=> {
    try{
        const exercises= await Exercise.find();
        res.json(exercises);
    }
    catch(err){
        res.json({message: err});
    }
});

router.get('/:id', async (req,res)=> {
    try{
   const exercise= await Exercise.findById(req.params.id);
   res.json(exercise);
    }
    catch(err){
        res.json({message: err});
    }
});

router.get('/:username', async (req, res)=> {
    try{
        const exercise = await Exercise.findOne({username: req.params.username});
        res.json(exercise);
    }
    catch(err){
        res.json({message: err});
    }
});

router.post('/create', async (req, res)=> {
    const exercise=new Exercise({
        username: req.body.username,
        description: req.body.description,
        duration: Number(req.body.duration), //plug in number 
        date: Date.parse(req.body.date) //plug in string 
    })
    try{
        const savedExercise = await exercise.save();
        res.json(savedExercise);
    }
    catch(err){
        res.json({message: err});
    } 
});

router.delete('/:id', async(req,res)=> {
    try{
       const removedExercise= await Exercise.remove({_id: req.params.id})
       res.json(removedExercise);
    }
    catch(err){
        res.json({message: err});
    }
});
router.patch('/edit/:id', async(req,res)=> {
    try{
        const updatedExercise = await Exercise.updateOne(
            {_id: req.params.id},
            { $set: {
                username: req.body.username,
                description: req.body.description,
                duration: Number(req.body.duration),
                date: Date.parse(req.body.date)
             }}
            );
        res.json(updatedexercise);
    }
    catch(err){
        res.json({message: err});
    }
});

router.delete('/:id', async(req,res)=> {
    try{
       const removedExercise= await Exercise.remove({_id: req.params.id})
       res.json(removedExercise);
    }
    catch(err){
        res.json({message: err});
    }
});

module.exports = router;

/*
const router = require("express").Router();
let Exercise = require("../models/exercise.model");



 router.route("/").get((req, res) => {
    Exercise.find()
      .then((exercises) => res.json(exercises))
      .catch((err) => res.status(400).json("Error: " + err));
  });
  

  
  
  router.route("/add").post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
  
    const newExercise = new Exercise({
      username,
      description,
      duration,
      date,
    });
  
    newExercise
      .save()
      .then(() => res.json("Exercise added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  });
  

  
  
  router.route("/:id").get((req, res) => {
    Exercise.findById(req.params.id)
      .then((exercise) => res.json(exercise))
      .catch((err) => res.status(400).json("Error: " + err));
  });
  

  router.route("/:id").delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
      .then(() => res.json("Exercise Deleted !"))
      .catch((err) => res.status(400).json("Error: " + err));
  });
  

  router.route("/update/:id").post((req, res) => {
    Exercise.findById(req.params.id)
      .then((exersise) => {
        exersise.username = req.body.username;
        exersise.description = req.body.description;
        exersise.duration = req.body.duration;
        exersise.date = Date.parse(req.body.date);
  
        exersise
          .save()
          .then(() => res.json("Exercise updated !"))
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  });
  
  module.exports = router;
  */