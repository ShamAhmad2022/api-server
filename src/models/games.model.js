'use strict';
//this for create schema from sequelize
const games = (sequelize, DataTypes) => sequelize.define('games',{
    //create  2 columns one for name and one for company
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        company: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

//export the games

module.exports = games;