const expressCassandra = require("express-cassandra");
// const db = require('../database/index');

module.exports = {
  fields : {
    review_id : {
      type : 'uuid',
      default: {'$db_function' : "uuid()"},
      required : true
    },
    restaurant_id : {
      type : 'int',
      required : true
    },
    restaurant_name : {
      type : "varchar",
      required : true
    },
    overall_score : {
      type : 'int',
      required : true,
      validator : function(value) { value > 0 && value <=5;},
      
    },
    food_score : {
      type : 'int',
      required : true,
      validator : function(value) { value > 0 && value <=5;}
    },
    service_score : {
      type : 'int',
      required : true,
      validator : function(value) { value > 0 && value <=5;}
    },
    ambience_score : {
      type : 'int',
      required : true,
      validator : function(value) { value > 0 && value <=5;}
    },
    value_score : {
      type : 'int',
      required : true,
      validator : function(value) { value > 0 && value <=5;}
    },
    date_dined : {
      type : 'varchar',
      required : true
    },
    review : {
      type : 'text',
      required : true
    },
    user_recommended : {
      type : 'boolean',
      required : true
    },
    user_id : {
      type : 'int',
      required : true
    },
    user_name : {
      type : 'varchar',
      required : true
    },
    user_review_count : {
      type : 'int',
      required : true,
      validator : function(value) { value >= 10 && value <=40;}
    },
    user_location : {
      type : 'varchar',
      required : true
    },
    user_vip : {
      type : 'boolean',
      required : true
    }
  },
  key: [["restaurant_id"],"user_id"],
  clustering_order : {"user_id" : "desc"},
  //Insert Materialized view later
  indexes: ["user_id","review_id"],
  table_name : "foodbytesreviews"
}

/** *****************************
 * Cassandra Data
 *
 * Idea 1: Flat Schema: By Review
 * 
 * -Review_id
 *   -Partition key
 *  -uniq number
 * -Restaurant_ID
 *    -Custering key
 *    -uniq number
 * Restaurant_Name:
 *    -varchar
 *  -Overall_score
*       -1-5
*  -Food_Score
*       -1-5
*   -Service_Score
*       -1-5
*   -ambience_score
*       -1-5
*  -value_Score
*        -1-5
*  -date_dined
*        -Date
*  -review
*      -String
*   -User_recommended
*        -Bolean
 * -user_id 
 *      -uniq number
 *      -Possible custor id
 * -user_name :
 *    -varchar
 * -ReviewCount:
 *    -number
 * -Location
 *    -SF
 * -VIP
 *  -Bollean
 * 
 * 
 * 
 * 
 * 
 * Idea 2: List Schema
 * Restaurant_ID
 * -primary key
 * Restaurant_Name:
 *
 * set<Reviews>
 * -a set of all reviews associated with that restaurant
 *    -Review
 *        -Review_id
 *            -RestaurantID_ReviewCount
 *        -Overall_score
 *            -1-5
 *        -Food_Score
 *            -1-5
 *        -Service_Score
 *            -1-5
 *        -ambience_score
 *            -1-5
 *        -value_Score
 *            -1-5
 *        -date_dined
 *            -Date
 *         -review
 *            -String
 *         -User_recommended
 *            -Bolean
 *        -User
 *            -User_id
 *                -Number: Uniq
 *            -UserName
 *                -String
 *            -ReviewCount
 *                -Number
 *            -Location
 *                -SF
 *            -Vip
 *                -Bolean
 *
 *
 *
 *
 */
