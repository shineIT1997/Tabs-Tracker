const userControllers = require('../controllers/userController')



module.exports = (app) => {
    app.get('/' , 
        function(req,res) {
            res.send('hello')
        }
    )
    app.post('/register' , 
        userControllers.register
    )
    app.post('/login' , 
        userControllers.login
    )
    
}