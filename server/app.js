var express = require('express'); //framework for handling http request
var mongoose = require('mongoose'); //defining our datamodel and connecting to database
var morgan = require('morgan'); //request logger for debugging our Express app
var path = require('path'); //configuration for the path of the server
var cors = require('cors'); //frontend
var history = require('connect-history-api-fallback'); //frontend

var usersController = require('./controllers/users');
var photosController = require('./controllers/photos');
var linksController = require('./controllers/links');
var postsController = require('./controllers/posts');


// Variables
var mongoURI = process.env.MONGODB_URI || 'mongodb+srv://dbGroup16:group16@cluster0.tgye2.mongodb.net/dbGoTravel?retryWrites=true&w=majority';
var port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});

// Create Express app
var app = express(); //initilize
// Parse requests of content-type 'application/json', communicate between frontend and backend
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// HTTP request logger
app.use(morgan('dev'));
// Enable cross-origin resource sharing for frontend must be registered before api
app.options('*', cors()); //frontend
app.use(cors()); //frontend

// Import routes
app.get('/api', function(req, res) {
    res.json({'message': 'Welcome to your DIT341 backend ExpressJS project!'});
});

app.use(usersController);
app.use(photosController);
app.use(linksController);
app.use(postsController);

// Error handling 
app.use(function(err, req, res, next) {
    console.error(err.stack);
    var err_res = {
        "message": err.message,
        "error": {}
    };
    if(app.get('env') === 'development'){
        err_res["error"] = err;
    }
    res.status(err.status || 500);
    res.json(err_res);
});

// Catch all non-error handler for api (i.e., 404 Not Found)
app.use('/api/*', function (req, res) {
    res.status(404).json({ 'message': 'Not Found' });
});

// Configuration for serving frontend in production mode
// Support Vuejs HTML 5 history mode
app.use(history());
// Serve static assets
var root = path.normalize(__dirname + '/..');
var client = path.join(root, 'client', 'dist');
app.use(express.static(client)); // this is related to the frontend, don't change anything here

// Error handler (i.e., when exception is thrown) must be registered last
var env = app.get('env');
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
    console.error(err.stack);
    var err_res = {
        'message': err.message,
        'error': {}
    };
    if (env === 'development') {
        // Return sensitive stack trace only in dev mode
        err_res['error'] = err.stack;
    }
    res.status(err.status || 500);
    res.json(err_res);
});

app.listen(port, function(err) {
    if (err) throw err;
    console.log(`Express server listening on port ${port}, in ${env} mode`);
    console.log(`Backend: http://localhost:${port}/api/`);
    console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;