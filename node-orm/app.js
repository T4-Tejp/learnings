const express = require("express");
const app = express();

app.use(express.json())

app.get('/',(req,res)=>{
	res.send("server running");
})

function setupRoute() {
    const routes = require("./app/router");
    routes.setup(app);
}
setupRoute();



app.listen(3300,()=>{
	console.log("server started port-3300");
});
