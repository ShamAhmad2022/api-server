'use strict';

const university = (sequelize, DataTypes) => sequelize.define('university', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

module.exports = university;