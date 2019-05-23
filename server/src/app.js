const express = require('express')
const app = express() //create expressjs

const cors = require('cors') //Access-Control-Allow-Origin: *
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('./config/config')
const bodyParser = require('body-parser') //body of request

require('./router/routes')(app) //import router from ./router/routes


app.use(cors()); //make CORS
app.use(bodyParser.json()); //save form data in req.body

mongoose.connect(`${config.db.url}`, {useNewUrlParser: true})
.then(() => {
    console.log("connecting database successfully");
})
.catch((err) => {
    console.log(err); 
})


app.listen(config.port , () => {
    console.log(`listening on port `);
})