const {Sequelize,DataTypes} = require('sequelize');
// const env = process.env();
// console.log("env loaded",env);

const sequelize = new Sequelize(
    'blogdb',
    'root',
    'password123@',
    {
        port: 3306,
        host: 'localhost',
        dialect: "mysql",
        //logging: console.log,
      }
);

try{
    sequelize.authenticate();
    console.log("database has been connected");
}catch(error){
    console.log("error connecting database",error);
}

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

//datamodel files
db.blogs_master = require('./blog.model')(sequelize,DataTypes);
db.User = require('./user.model')(sequelize,DataTypes);


db.sequelize.sync({ force: false}); //whenever you change in table make it to true 

module.exports = db;