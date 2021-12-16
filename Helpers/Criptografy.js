var bcrypt = require('bcrypt');

exports.HashPassword = function(password) {
    var hashedPassword = bcrypt.hashSync(password,10);
    return hashedPassword;
};

exports.ComparePassword = function(password, hashedPassword) {
    if(bcrypt.compareSync(password, hashedPassword))
        return true
    else
        return false
};