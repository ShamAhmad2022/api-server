'use strict';
//this for create schema from sequelize

const music = (sequelize, DataTypes) => sequelize.define('music', {
        //create  2 columns one for name and one for author

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })


module.exports = music;
