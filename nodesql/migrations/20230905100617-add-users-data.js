'use strict';

var dbm;
var type;
var seed;

const sql = require('../models/db');

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  let query = 'insert into new_students(name,email) values'+
  '("tej","tej@gmail.com"),'+
  '("ram","ram@gmail.com"),'+
  '("shyam","shyam@gmail.com"),'+
  '("radha","radha@gmail.com"),'+
  '("mohan","mohan@gmail.com"),'+
  '("banke","banke@gmail.com"),'+
  '("satyam","satyam@gmail.com"),'+
  '("neeraj","neeraj@gmail.com"),'+
  '("bhola","bhola@gmail.com"),'+
  '("raghu","raghu@gmail.com"),'+
  '("munna","munna@gmail.com"),'+
  '("sanjay","sanjay@gmail.com"),'+
  '("raj","raj@gmail.com");'

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      return;
    }
    console.log("data inserted migration success");
  })

  return null;
};

exports.down = function(db) {
  let query = "drop table new_students";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      return;
    }
    console.log("drop new table migration success");
  })
  return null;
};

exports._meta = {
  "version": 1
};
