var path = require('path');
var logs = require(__dirname + '/../controllers/Log').write;

module.exports = function (req, res, next) {
    return function (req, res, next) {
        if (req.get('Accept').match(/application\/json/) === null) {
            logs(req, "FAILED", "Navigated to non-existing page");
            return res.status(404).sendFile(path.resolve(__dirname + '/../public/404.html'));
        }


        next();
    }
}
