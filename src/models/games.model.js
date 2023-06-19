'use strict';

const games = (sequelize, DataTypes) => sequelize.define('games',{
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        company: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })


module.exports = games;