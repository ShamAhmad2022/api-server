'use strict';

const { Sequelize, DataTypes } = require("sequelize");//import these objects from sequelize

const music = require("./music.model");
const games = require("./games.model");
const university = require("../university/university.model");
const department = require("./department/department.model");
const Collection = require("./lib/collection");//import Collection 

// to determine the node enviroment
const DATABASE_URL = process.env === 'test' ? 'sqlite::memory:' : process.env.DATABASE_URI;

let sequelizeOption = process.env.NODE_ENV === 'production' ? {//for production
    dialectOptions : {
        ssl : {
            require : true,
            rejectUnauthorized : false
        }
    }
} : {};//else if process.env.NODE_ENV === 'test',  we will not have any options


let sequelize = new Sequelize(DATABASE_URL, sequelizeOption);//create instance frome sequelize

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
    Music: musicModel,//we will pass the musicModel  that we have, will be taken from the musicModel, and this musicModel its taken two things the sequelize 
    //and DataType, so we should pass to it these two things
    Games: gamesModel,
    universityCollection,
    departmentCollection
}