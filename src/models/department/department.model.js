'use strict';

const department = (sequelize, DataTypes) => sequelize.define('department', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        universityID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })


module.exports = department;