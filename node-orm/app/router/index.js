
const blogRoute = require('./blog.router');
const userRoute = require('./user.router');
const categoryRoute = require('./category.router');

exports.setup = function(app){
    console.log("setting up routes");
    app.use('/blogs',blogRoute);
    app.use('/users',userRoute);
    app.use('/categories',categoryRoute);
}
