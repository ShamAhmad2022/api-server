'use strict';

const { Sequelize, DataTypes } = require("sequelize");

const music = require("./music.model");
const games = require("./games.model");
const university = require("../university/university.model");
const department = require("./department/department.model");
const Collection = require("./lib/collection");

const DATABASE_URL = process.env === 'test' ? 'sqlite::memory:' : process.env.DATABASE_URI;

let sequelizeOption = process.env.NODE_ENV === 'production' ? {
    dialectOptions : {
        ssl : {
            require : true,
            rejectUnauthorized : false
        }
    }
} : {};

let sequelize = new Sequelize(DATABASE_URL, sequelizeOption);

const musicModel = music(sequelize, DataTypes);
const gamesModel = games(sequelize, DataTypes);
const universityModel = university(sequelize, DataTypes);
const departmentModel = department(sequelize, DataTypes);

const universityCollection = new Collection(universityModel);
const departmentCollection = new Collection(departmentModel);

universityModel.hasMany(departmentModel, {foreignKey: 'universityID', sourceKey: 'id'});
departmentModel.belongsTo(universityModel, {foreignKey: 'universityID', targetKey: 'id'});

module.exports = {
    db: sequelize,
    Music: musicModel,
    Games: gamesModel,
    universityCollection,
    departmentCollection
}