const app1 = require('./app');
const app2 = require('./app');


const handler = serverName => (req, res) => {
    console.log(`Request from server ${serverName}`, req.method, req.url);
    res.send(`Hello From server ${serverName}`);
}




app1.get('*', () => {
    console.log("app1 received the request")
    handler(1)
})
    .post('*', handler(1))


app2.get('*', () => {
    console.log("app2 received the request")
    handler(2)
})
// .post('*', handler(2))


// const app1 = express();
// const app2 = express()



const PORT1 = 6500
app1.listen(PORT1, (err) => {
    if (err) console.log("Error running server", err)
    console.log(`Server started on ${PORT1}`)
})

const PORT2 = 6501
app2.listen(PORT2, (err) => {
    if (err) console.log("Error running server", err)
    console.log(`Server started on ${PORT2}`)
})