let express = require('express'),
   path = require('path'),
   mongoose = require('mongoose'),
   cors = require('cors'),
   bodyParser = require('body-parser'),
   dbConfig = require('./database/db'),
   createError = require('createerror');
let seed = require('./models/counts');
// Connecting with mongo db
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
   useNewUrlParser: true
}).then(() => {
      console.log('Database sucessfully connected')
   },
   error => {
      console.log('Database could not connected: ' + error)
   }
)

// Setting up port with express js
const profileRoute = require('../backend/routes/profile.routes');
const counts = require('./models/counts');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(cors()); 
app.use(express.static(path.join(__dirname, 'dist/aboutme')));
app.use('/', express.static(path.join(__dirname, 'dist/aboutme')));
app.use('', profileRoute)

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

//seeding logic
async function mySeedr(pageurl,pagename){
   const data = await counts.find({url:pageurl}).exec();
   if(data.length!==0){
      return;
   }
   else{
      const seed = new counts({url:pageurl,name:pagename,counter:0,avgpermin:0});
      await seed.save()
   }
}
mySeedr('http://localhost:4000/intro',"Introduction");
mySeedr('http://localhost:4000/education',"Education");
mySeedr('http://localhost:4000/work-experience',"Work-Experience");
mySeedr('http://localhost:4000/projects',"Projects");
mySeedr('http://localhost:4000/achievements',"Achievements");
mySeedr('http://localhost:4000/technical-skills',"Technical-Skills");

// Find 404 and hand over to error handler
app.use((req, res, next) => {
   next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});