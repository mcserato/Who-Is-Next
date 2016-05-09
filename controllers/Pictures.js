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

/*exports.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});*/

exports.upload = function(req,res) {
    console.log("uploading......");
    
    uploader(req,res,function(err) {
        if(err) {
            console.log("Error uploading file.");
        }
        console.log("File is uploaded");
    });
}
