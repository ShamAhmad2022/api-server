'use strict';

const express = require("express");
const router = express.Router();

const { Music } = require('../models/index');
const { v4: uuidv4 } = require("uuid");

router.get('/music', getMusic);
router.get('/music/:id', getMusicById);
router.put('/music/:id', updateMusic);
router.delete('/music/:id', deleteMusic);
router.post('/music', addMusic);

async function getMusic(req, res){
    const music = await Music.findAll();
    res.status(200).json(music);
}

async function getMusicById(req, res){
    const id = req.params.id;
    const music = await Music.findOne({ where:{id:id}});
    res.status(200).json(music);
}

async function updateMusic(req, res){
    const id = req.params.id;
    const obj = req.body;
    const music = await Music.update(obj, {where: {id}});
    res.status(202).json(music);
}

async function deleteMusic(req,res){
    const id = req.params.id;
    const music = await Music.destroy({where : {id}});
    res.status(204).json(music);
}

async function addMusic(req, res){
    const obj= req.body;
    const generatedId = uuidv4();
    obj.generatedId = generatedId;
    const music= await Music.create(obj);
    res.status(201).json(music);
}

module.exports = router;