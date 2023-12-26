const express = require('express');
const cors = require('cors');
const path = require('path');
const cron = require('node-cron');
const i18n = require('./i18n.config');
const { createClient } = require('redis');
const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require("./config/db.config.js");


const tutorialRoutes = require('./routes/tutorial.routes.js')
const sclassRoutes = require('./routes/sclass.routes.js');
const otherRoutes = require('./routes/other.routes.js');
const { successResponse, errorResponse } = require('./lib/responseHandler');

const app = express();
const app1 = express();
const app2 = express();

//load balancer testing
// const handler = serverName => (req, res) => {
//     console.log(`Request from server ${serverName}`, req.method, req.url);
//     res.send(`Hello From server ${serverName}`);
// }


// app1.get('*', (req,res) => {
//     console.log("app1 received the request")
//     handler(1)(req,res)
// })


// app2.get('*', (req,res) => {
//     console.log("app2 received the request")
//     handler(2)(req,res)
// })

//swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app1.use('/api-docs-1', swaggerUi.serve, swaggerUi.setup(swaggerDocument));





//important middlewares
app1.use(express.json({ limit: '50mb', extended: true }));
app1.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app1.use(express.text({ limit: '200mb' }));
app1.use(cors());

app2.use(express.json({ limit: '50mb', extended: true }));
app2.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app2.use(express.text({ limit: '200mb' }));
app2.use(cors());

//cron job
// cron.schedule("*/5 * * * * *", function () {
//     console.log("---------------------");
//     console.log("running a task every 5 seconds");
// });

//language setting using i18
i18n.setLocale('uk');
console.log(i18n.getLocales()); // ['en', 'uk']
console.log(i18n.getLocale()); // 'en'
console.log(i18n.__('Hello')); // 'Hello'
console.log(i18n.__n('You have %s message', 5));

//setting up data caching in redis
const redis = require("redis");

let redisClient;

(async () => {
    redisClient = redis.createClient();
    redisClient.on("error", (error) => console.error(`Error : ${error}`));
    await redisClient.connect();
    //   console.log("redisClient",redisClient);
    //checking if redis is working fine
    redisClient.set("customKey", "redisvalue");
    console.log("redis cache", await redisClient.get("customKey"));

})();

//passing redis object with every request
app1.use(function (req, res, next) {
    req.redisObj = redisClient;
    next();
});

app2.use(function (req, res, next) {
    req.redisObj = redisClient;
    next();
});


//serving static files
app1.use("/uploads", express.static(path.join(__dirname, '/uploads')));



//check route
app1.get('/', (req, res) => { successResponse(res, 200, "Server 1 is Up and Running", {}); })
app2.get('/', (req, res) => { successResponse(res, 200, "Server 2 is Up and Running", {}); })
app1.post('/', (req, res) => {
    console.log(req.body)
    successResponse(res, 200, "Server 1 Responded", req.body.keya[0].name);
});
app2.post('/', (req, res) => {
    console.log(req);
    //process.exit();
    console.log("server 2 request body",req.body)
    successResponse(res, 200, "Server 2 Responded", req.body);
});

//routing middlewares
app1.use('/tutorials', tutorialRoutes);
app1.use('/sclass', sclassRoutes);
app1.use('/others', otherRoutes);
app2.use('/others', otherRoutes);

//If Route Not Found
app1.use('*', (req, res) => { errorResponse(res, 404, "No Route Is Defined", { message: "Route Error" }); })
app2.use('*', (req, res) => { errorResponse(res, 404, "No Route Is Defined", { message: "Route Error" }); })

//connecting to database using sequelise
// const sequelize =
//     new Sequelize(
//         dbConfig.DB,
//         dbConfig.USER,
//         dbConfig.PASSWORD,
//         {
//             host: dbConfig.HOST,
//             dialect: 'mysql'
//         })

// // Validate and connect to the database
// sequelize
//     .authenticate()
//     .then(() => console.log('Successfully connected to the database!'))
//     .catch((error) => console.log('Failed to connect the database:', error))



const PORT1 = 6500
app1.listen(PORT1, (err) => {
    if (err) console.log("Error running server", err)
    console.log(`Server started on ${PORT1}`)
});

const PORT2 = 6501
app2.listen(PORT2, (err) => {
    if (err) console.log("Error running server", err)
    console.log(`Server started on ${PORT2}`)
});



module.exports = { redisClient };