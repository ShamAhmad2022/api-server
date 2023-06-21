'use strict';

require('dotenv').config();
const { db } = require('./src/models');
const { start } = require('./src/server');// im destructuring the exported object 

const PORT = process.env.PORT || 5000;

//db--> db that we exported from the index model (for the sequlize)
db.sync().then(()=>{
    start(PORT);
}).catch(err => console.log(err))
