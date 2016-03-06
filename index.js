var express = require('express'),
    app = express(),
    
    server = app.listen(8000, function(){
        var host = server.address().address;
        var port = server.address().port;
        console.log('Example app is listening at http://%s:%s', host, port);
    });

app.use(require('body-parser')()); //get the data
app.use(require('method-override')()); //to use put and delete HTTP requests
app.use(require(__dirname + '/config/Router')(express.Router()));
app.use(express.static(__dirname + '/public'));

