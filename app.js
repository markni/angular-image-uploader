
/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  env = process.env.NODE_ENV || 'dev';

var app = module.exports = express();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/partial/:name', routes.partial);

app.post('/upload',routes.upload);

// JSON API

app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

if (env === 'dev'){
	app.listen(3000, function(){
		console.log("Server started, port 3000");
	});
}
else
{
	app.listen(80,"192.81.131.191", function(){
		console.log("Server started, port 80");
	});
}
