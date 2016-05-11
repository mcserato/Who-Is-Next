var express = require('express'),
	session = require('express-session'),
	bodyParser = require('body-parser')
    app = express(),

    server = app.listen(8000, "localhost",
    	function(){
	        var host = server.address().address;
	        var port = server.address().port;
	        console.log('Example app is listening at http://%s:%s', host, port);
    	});

var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

var multer  =   require('multer');

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var uploader = multer({ storage : storage}).single('userPhoto');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(require('method-override')()); //to use put and delete HTTP requests
app.use(express.static(__dirname + '/public'));

app.post('/api/upload',function(req,res){
    console.log("Uploading");
    uploader(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        //res.end("File is uploaded");
        console.log(req.file.filename);
        localStorage.setItem("filename", req.file.filename);
    });
});

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

app.use(require(__dirname + '/lib/Parser')());
app.use(require(__dirname + '/lib/HeaderCheck')());
app.use(require(__dirname + '/config/Router')(express.Router()));
