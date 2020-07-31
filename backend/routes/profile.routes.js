const express = require('express');
const app = express();
const profileRoute = express.Router();
// Analytics model
let Analytic = require('../models/analytics');
// Dashboard
profileRoute.route('/dashboard').get((req, res) => {
  Analytic.find(async(error, data) => {
    if (error) {
        console.log('error found')
        return next(error)
    } else {
		console.log('ohh yes')
		total_count = await Analytic.aggregate([{$group:{_id:"total_count",counter:{$sum:"$counter"}}}]);
		var response = {
			'total_counter' : total_count[0]['counter'],
			'all_data':data
		}
        res.json(response)
    }
  })
});

// visit function
function visits(req, res,next){
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	console.log(fullUrl);
	Analytic.findOneAndUpdate({ url: fullUrl }, {$inc:{counter:1}},{ new: true, upsert: true }).exec((error,data)=>{
		if(error){
			res.send(error)
		}
		else{
			if(!data){
				data = new Analytic({url: fullUrl,counter:1});
				console.log(data.createdAt)
				data.save(function (err) {
				console.log(data.createdAt); // Should be approximately now
				console.log(data.createdAt === data.updatedAt); // true
				// Wait 1 second and then update the user
				setTimeout( function () {
				data.save( function (err) {
				console.log(data.updatedAt); // Should be approximately createdAt + 1 second
				console.log(data.createdAt < dataupdatedAt); // true
				});
				res.send(data)
			  }, 1000);
			});
			}
			else{
				data.save(function(err){
					if(!err){
						console.log('ohh yes')
						console.log(data.updatedAt - data.createdAt)
						res.send(data)
					}
					else{
						res.send(err)
					}
				});
			}
		}
	});
}
profileRoute.get("/intro",visits);
profileRoute.get("/education",visits);
profileRoute.get("/work-experience",visits);
profileRoute.get("/projects",visits);
profileRoute.get("/achievements",visits);
profileRoute.get("/technical-skills",visits);
module.exports = profileRoute;