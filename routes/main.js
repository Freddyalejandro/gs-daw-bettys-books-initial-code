// Create a new router
const express = require("express")
const router = express.Router()
const request = require('request')

// Handle our routes
module.exports = function(db, app) {
    router.get('/',function(req, res, next){
    res.render('index.ejs')
    })

    
    router.get('/about',function(req, res, next){
    res.render('about.ejs')
    })
    
    router.get('/londonnow', function(req, res, next) {
        let apiKey = '1b953fb84b0b6b372ccd1bec19ea0065'
        let city = 'london'
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
                     
        request(url, function(err, response, body) {
            if (err) {
                next(err)
            } else {
                var weather = JSON.parse(body)
                if (weather!==undefined && weather.main!==undefined) {
                var wmsg = 'It is '+ weather.main.temp + 
                    ' degrees in '+ weather.name +
                    ' <br> el wind is ' + weather.wind.speed +
                    '! <br> The humidity now is: ' + 
                    
                 weather.main.humidity;
                res.send (wmsg);
                }
                else {
                res.send ("No data found");
                }

                
                // var weather = JSON.parse(body)
                // var wmsg = 'It is '+ weather.main.temp +
                //     ' degrees in '+ weather.name +
                //     'el wind is ' + weather.wind.speed +
                //     '! <br> The humidity now is: ' + 

                // weather.main.humidity;
                // res.send (wmsg);

                //res.send(body)
                
            } 
        })
    })

    return router;

    
}
// Export the router object so index.js can access it
