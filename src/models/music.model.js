'use strict';

const music = (sequelize, DataTypes) => sequelize.define('music', {
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
