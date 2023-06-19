'use strict';

const express = require("express");
const router = express.Router();

const { Games } = require('../models/index');

router.get('/game', getGames);
router.get('/game/:id', getGameById);
router.put('/game/:id', updateGame);
router.delete('/game/:id', deleteGame);
router.post('/game', addGame);

async function getGames(req, res){
    const game = await Games.findAll();
    res.status(200).json(game);
}

async function getGameById(req, res){
    const id = req.params.id;
    const game = await Games.findOne({ where:{id:id}});
    res.status(200).json(game);
}

async function updateGame(req, res){
    const id = req.params.id;
    const obj = req.body;
    const game = await Games.update(obj, {where: {id}});
    res.status(202).json(game);
}

async function deleteGame(req,res){
    const id = req.params.id;
    const game = await Games.destroy({where : {id}});
    res.status(204).json(game);
}

async function addGame(req, res){
    const obj= req.body;
    const game= await Games.create(obj);
    res.status(201).json(game);
}

module.exports = router;