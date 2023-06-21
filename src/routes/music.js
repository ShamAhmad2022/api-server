'use strict';

const express = require("express");
const router = express.Router();

const { Music } = require('../models/index');
const { v4: uuidv4 } = require("uuid");

//create routes
router.get('/music', getMusic);
router.get('/music/:id', getMusicById);
router.put('/music/:id', updateMusic);
router.delete('/music/:id', deleteMusic);
router.post('/music', addMusic);


async function getMusic(req, res){//to get all musics
    const music = await Music.findAll();//using findAll() from sequelize
    res.status(200).json(music);
}

async function getMusicById(req, res){//to get music by id 
    const id = req.params.id;
    const music = await Music.findOne({ where:{id:id}});//using findOne() from sequelize
    res.status(200).json(music);
}

async function updateMusic(req, res){// to update spacific music
    const id = req.params.id;
    const obj = req.body;
    const music = await Music.update(obj, {where: {id}});
    const updatedMusic = await Music.findOne({ where:{id:id}});//using findOne() from sequelize
    res.status(202).json(updatedMusic);
}

async function deleteMusic(req,res){//delete to music
    const id = req.params.id;
    const music = await Music.destroy({where : {id}});
    res.status(204).json(music);
}

async function addMusic(req, res){//add new music
    const obj= req.body;
    const generatedId = uuidv4();
    obj.generatedId = generatedId;
    const music= await Music.create(obj);
    res.status(201).json(music);
}
//export the route
module.exports = router;