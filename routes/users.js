// Create a new router
const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10



module.exports = function(db, app) {

    router.get('/register', function (req, res, next) {
    res.render('register.ejs')                                                               
    })    
    router.post('/registered', function (req, res, next) {
    // saving data in database
        const plainPassword = req.body.password
        bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
        // Store hashed password in your database.
        let sqlquery = "INSERT INTO users (first_name,last_name, username,  email, hashedPassword) VALUES (?,?,?,?,?)"
    // execute sql query
        console.log("username:", req.body)
        let newrecord = [req.body.first, req.body.last, req.body.username, req.body.email, hashedPassword]
        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
            next(err)
            }
            else
            result = 'Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!  We will send an email to you at ' + req.body.email
            result += 'Your password is: '+ req.body.password +' and your hashed password is: '+ hashedPassword
            res.send(result)
        
        })
        })                                                                         
    })
    router.get('/list', function(req, res, next) {
        let sqlquery = "SELECT first_name, last_name, username, email FROM users";
        
        db.query(sqlquery, (err, results) => {
            if (err) {
                return next(err);
            }
            res.render('userlist.ejs', { users: results})
        });
    })
    

  return router;
}

// Export the router object so index.js can access it
