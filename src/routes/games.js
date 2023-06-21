'use strict';

const express = require("express");
const router = express.Router();

const { Games } = require('../models/index');//import Games
//create routes
router.get('/game', getGames);
router.get('/game/:id', getGameById);
router.put('/game/:id', updateGame);
router.delete('/game/:id', deleteGame);
router.post('/game', addGame);

async function getGames(req, res){//for get all games
    const game = await Games.findAll();//using findAll() from sequelize
    res.status(200).json(game);
}

async function getGameById(req, res){//for get game by id
    const id = req.params.id;
    const game = await Games.findOne({ where:{id:id}});//using findOne() from sequelize
    res.status(200).json(game);
}

async function updateGame(req, res){//to update spacific game 
    const id = req.params.id;
    const obj = req.body;
    const game = await Games.update(obj, {where: {id}});
    const updatedGame = await Games.findOne({ where:{id:id}});
    res.status(202).json(updatedGame);
}

async function deleteGame(req,res){////to delete spacific game 
    const id = req.params.id;
    const game = await Games.destroy({where : {id}});
    res.status(204).json(game);
}

async function addGame(req, res){// to add new game 
    const obj= req.body;
    const game= await Games.create(obj);
    res.status(201).json(game);
}

module.exports = router;