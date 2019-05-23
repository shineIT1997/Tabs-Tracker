/**
 * file name: congfig.js
 * Create by Dat
 * Date: 22/05/2019 3:56PM
 */

const config = {
    db: {
        url: 'mongodb://localhost:27017/tabs-tracker' //url to connect database
    },
    authentication: {
        jwtSecret: process.env.JWR_SECRET || 'my secret' //key to use JWT 
    },
    port: process.env.PORT || '8081'
}

module.exports = config