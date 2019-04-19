// const mysql = require('mysql');
const pg= require("pg")
const Sequelize = require('sequelize');
const Promise = require('promise');
const pginfo = require("../pguserData");
// Create database with mysql
// const connection = pg.createConnection({
//   host: '127.0.0.1',
//   user: pginfo.user,
//   password:pginfo.password,
// });

// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to the Postgres server.');
// });

// Connect to the database by creating a Sequelize instance
// let postgres = new Sequelize('', 'postgres', pginfo.password, {
//   host: 'localhost',
//   dialect: 'postgres'
// });

// postgres.query('CREATE DATABASE IF NOT EXISTS`opentable_reviews`;').then(() => {});

 let postgres = new Sequelize(pginfo.database, pginfo.user, pginfo.password, {
  dialect: 'postgres'
});


// postgres
//   .authenticate()
//   .then(()=>{
//     console.log("Connect with Postgres made")
//   })
//   .catch ((err)=>{
//     console.log("Unable to connect to Postgres", err)
//   })
// const User = postgres.define('User', {
//   username: {
//     type: Sequelize.STRING,
//   },
//   review_count: {
//     type: Sequelize.INTEGER,
//   },
//   location: {
//     type: Sequelize.STRING,
//   },
//   VIP: {
//     type: Sequelize.BOOLEAN,
//   },
// });

// module.exports.connection = connection;
module.exports.postgres = postgres;
// module.exports.User = User;
