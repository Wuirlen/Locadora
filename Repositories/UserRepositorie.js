var db = require('../Database/db');

module.exports = new class UserRepositorie {
    CreateUser(user) {
        return new Promise(function(resolve, reject) {
            db.query("INSERT INTO users SET ?", user, function(erro, resultado) {
                if (erro) {
                    res.status(500).send( {message: "Erro ao inserir usuario no banco de dados"} )
                    return reject(erro);
                } 
                resolve(resultado);
            });
        }); 
    }
}