const express = require('express')
const app = express() //create expressjs
const cors = require('cors') //Access-Control-Allow-Origin: *
const bodyParser = require('body-parser') //body of request
const mongoose = require('mongoose')
const config = require('./config/config')
const admin = require('./models/user/user')
app.use(cors()); //make CORS
app.use(bodyParser.json()); //save form data in req.body
// note: call router after call use(bodyParser)
require('./router/routes')(app) //import router from ./router/routes
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

// bcrypt.genSalt(10 ,  function (err , salt) {
//     bcrypt.hash('12345678' , salt , function(err , hash) {
        
//         user = new admin({
//             email: 'abc@gmail.com',
//             password: hash,
//             usersName: 'thanhdat',
//             jurisdiction: 'admin'
//         })
//         user.save()
//         .then(response => {
//             console.log(response);
//             })
//         .catch(error => {
//             console.log(`error ${error}`);
//         })
//     })
// })
