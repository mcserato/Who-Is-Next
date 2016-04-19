module.exports = function (req, res, next) {
    return function (req, res, next) {
        for (var attr in req.body) {
            req.body[attr] = req.body[attr].replace(/</g, '&lt;').replace(/>/g , '&gt;');
            //console.log(req.body[attr]);
        }
        
        for (var attr in req.params) {
            req.params[attr] = req.params[attr].replace(/</g, '&lt;').replace(/>/g , '&gt;');
            //console.log(req.params[attr]);
        }
        
        
        next();
    }
}
