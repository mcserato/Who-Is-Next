var express = require('express'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
    app = express(),
    
    server = app.listen(8000, "localhost", 
    	function(){
	        var host = server.address().address;
	        var port = server.address().port;
	        console.log('Example app is listening at http://%s:%s', host, port);
    	});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(require('method-override')()); //to use put and delete HTTP requests
app.use(express.static(__dirname + '/public'));

console.log('info:', 'Setting up sessions...');
app.use( 
	session({
	    secret: 'wh01sn3xt',
	    name: 't3l3tub13s',
	    resave: true,
	    rolling: true,
	    saveUninitialized: true,
	    cookie: {
			maxAge: 7200000 //2 hours
	    }
 	})
);

app.use(require(__dirname + '/config/Router')(express.Router()));
