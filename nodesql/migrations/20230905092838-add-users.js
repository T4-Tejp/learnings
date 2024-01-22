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

const createNewTable = () =>{
  let query = "create table new_students("+
    "s_id int auto_increment,"+
    "name varchar(255) not null,"+
    "email varchar(255) not null,"+
    "created_at datetime default current_timestamp,"+
    "constraint studentsPK primary key(s_id));"

    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return;
      }
      console.log("create new table migration success");
    })
}

const dropNewTable = () =>{
  let query = "drop table new_students";

    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return;
      }
      console.log("drop new table migration success");
    })
}



exports.up = function(db) {
  createNewTable();
  return null;
};

exports.down = function(db) {
  dropNewTable();
  return null;
};

exports._meta = {
  "version": 1
};
