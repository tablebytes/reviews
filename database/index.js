const expressCassandra = require("express-cassandra");
const Promise = require('promise');
const flatSchema = require("./Models.js");
// Create database with cassandra

var model = expressCassandra.createClient({
  clientOptions : {
    contactPoints : ['127.0.0.1'],
    protocolOptions: {port : 9042},
    keyspace : 'foodbyteReviews',
    queryOptions: {consistency: expressCassandra.consistencies.one}
  },
  ormOptions : {
    defaultReplicationStrategy : {
      class : 'SimpleStrategy',
      replication_factor : 1
    },
    migration: 'safe'
  }
})

var reviewModel= model.loadSchema('foodByteReviews', flatSchema);

reviewModel.syncDB((err,schemaChange)=>{
  if(err){
    throw(err);
  } else {
    console.log("Schema was changed = ", schemaChange)
  }
})

module.exports= model;











// const connection = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: '',
// });

// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to the MySQL server.');
// });

// // Connect to the database by creating a Sequelize instance
// let sql = new Sequelize('', 'root', '', {
//   dialect: 'mysql',
// });

// sql.query('CREATE DATABASE IF NOT EXISTS`opentable_reviews`;').then(() => {});

// sql = new Sequelize('opentable_reviews', 'root', '', {
//   dialect: 'mysql',
// });

// const User = sql.define('User', {
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
// module.exports.sql = sql;
// module.exports.User = User;
