var db = require('../Database/db');

module.exports = new class AuthenticationRepositorie {
    GetUserByEmail(email) {
        return new Promise(function(resolve,reject) {
            db.query("SELECT * FROM users WHERE Email = ?", email, function(erro, resultado) {
                if(erro) {
                    return reject(erro);
                }
                resolve(resultado);
            }); 
        });
    }

    BlackListToken(token) {
        return new Promise(function(resolve, reject) {
            db.query("INSERT INTO tokens_blacklist SET ?", {Token: token, InvalidatedAt: new Date().toLocaleString()}, function(erro, resultado){
                if(erro) {
                    return reject(erro);
                }
                resolve(resultado);
            });
        });
    }
}