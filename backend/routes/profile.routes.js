const express = require('express');
const app = express();
const profileRoute = express.Router();
// Analytics model
let Analytic = require('../models/analytics');
// Dashboard
profileRoute.route('/dashboard').get((req, res) => {
  Analytic.find((error, data) => {
    if (error) {
        console.log('error found')
        return next(error)
    } else {
        console.log('ohh yes')
        res.json(data)
    }
  })
});

// Education
profileRoute.route('/education').get((req, res) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(fullUrl);
    Analytic.findOneAndUpdate({ url: fullUrl }, {$inc:{counter:1}}, function(error,res){
    if(error){
        console.log('error found')
        return next(error)
    }
    else{
        if(!res){
            console.log('query does not exists')
            res =  Analytic.create({url:fullUrl})
        }
        res.save(function(error){
            if(!error){
                console.log('ohh yes')
                res.json(data)
            }
            else{
                return next(error)
            }
        });
    }
    });
});
  
module.exports = profileRoute;