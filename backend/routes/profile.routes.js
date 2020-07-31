const express = require('express');
const app = express();
const profileRoute = express.Router();
// Analytics model
let Analytic = require('../models/analytics');
let counts = require('../models/counts');

// object with max and min counters
var maxVMinValues = ()=>{
	return (new Promise((resolve, rejects)=>{
		var values = {}
		counts.find({}).sort({ counter: -1 })
			.then((data) => {
				values["max"]=data[0]
				values["min"] = data[data.length-1]
				resolve(values)
			})
			.catch((err)=>{
				rejects(err)
			})
	}))
}

// Dashboard
profileRoute.route('/dashboard').get((req, res) => {
	counts.find(async(error, data) => {
	  if (error) {
		  console.log('error found')
		  return next(error)
	  } else {
		  console.log('ohh yes')
		  total_count = await counts.aggregate([{$group:{_id:"total_count",counter:{$sum:"$counter"}}}]);
		  total_average = await counts.aggregate([{$group:{_id:"total_average",avgpermin:{$sum:"$avgpermin"}}}]);  
		  maxmindata = await maxVMinValues();
		  var response = {
			  'total_counter' : total_count[0]['counter'],
			  'total_average' : total_average[0]['avgpermin'],
			  'maxmindata' : maxmindata,
			  'all_data':data
		  }
		  res.json(response)
	  }
	})
});
//update counter and avgpermin
async function updateval(pageurl){
	const data = await Analytic.findOne({url:pageurl});
	console.log(data)
	if(data.length!==0){
		var cnt = data['counter'];
		var temp = (data['updatedAt'] - data['createdAt']);
		var avg = cnt/temp;
		avg = avg*6000;
		if(temp==0) avg = cnt;
		counts.findOneAndUpdate({url:pageurl},{counter:cnt,avgpermin:avg},{ new: true })
		.then((datatemp)=>{
			console.log(datatemp)
		})
		.catch((err)=>{
			console.log(err)
		})
	}else{
		return;
	}
}
// visit function
function visits(req, res,next){
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

	Analytic.findOneAndUpdate({ url: fullUrl }, {$inc:{counter:1}},{ new: true, upsert: true }).exec((error,data)=>{
		if(error){
			res.send(error)
		}else{
			if(!data){
				data = new Analytic({url: fullUrl,counter:1});
				data.save()
				.then((dat)=>{
					console.log(dat)
					res.send(dat)
				})
				.catch((err)=>{
					console.log(err)
				})
			}else{
				data.save()
				.then((dat)=>{
					console.log(dat.updatedAt - dat.createdAt)
					res.send(dat)
				})
				.catch((err)=>{
					console.log(err);
					res.send(err)
				})
			}
		}
	});
	//console.log("reachead here")
	updateval(fullUrl);
}
profileRoute.get("/intro",visits);
profileRoute.get("/education",visits);
profileRoute.get("/projects",visits);
profileRoute.get("/achievements",visits);
profileRoute.get("/technical-skills",visits);
module.exports = profileRoute;
