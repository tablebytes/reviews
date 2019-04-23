const expressCassandra = require("express-cassandra");
const Promise = require('promise');
const flatSchema = require("./Models.js");
// Create database with cassandra

var model = expressCassandra.createClient({
  clientOptions : {
    contactPoints : ['127.0.0.1'],
    protocolOptions: {port : 9042},
    keyspace : 'foodbytereviewskeyspace',
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

var reviewModel= model.loadSchema('review', flatSchema);

module.exports.reviewModel = reviewModel;
module.exports.model = model;




