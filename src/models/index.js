'use strict';

const { Sequelize, DataTypes } = require("sequelize");
const music = require("./music.model");
const games = require("./games.model");

const DATABASE_URL = process.env === 'test' ? 'sqlite:memory' : process.env.DATABASE_URI;

let sequelizeOption = process.env.NODE_ENV === 'production' ? {
    dialectOptions : {
        ssl : {
            require : true,
            rejectUnauthorized : false
        }
    }
} : {};

let sequelize = new Sequelize(DATABASE_URL, sequelizeOption);

module.exports = {
    db: sequelize,
    Music: music(sequelize, DataTypes),
    Games: games(sequelize, DataTypes)
}