const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'NodeSql Api',
    description: 'Auto generating swagger file testing'
  },
  host: 'localhost:6500',                 // by default: 'localhost:3000'
  basePath: '/',             // by default: '/'
  schemes: [],              // by default: ['http']
  consumes: [],             // by default: ['application/json']
  produces: [],             // by default: ['application/json']
  tags: [                   // by default: empty Array
    {
      name: 'Tutorial',             // Tag name
      description: 'Auto Generated API for Tutorials'       // Tag description
    },
    // { ... }
  ],
  securityDefinitions: {},  // by default: empty object
  definitions: {}    
};

const outputFile = './swagger_auto.json';
const routes = ['./server.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc)
.then(()=>{
    //require('./server.js');
});