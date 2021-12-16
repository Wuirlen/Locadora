var jwt = require('jsonwebtoken');
var db = require('../Database/db');

exports.VerifyToken = function(req,res, next){
    var token = req.headers['authorization'];
    if(!token){
        res.status(401).send({auth: false, message: 'Nenhum token informado'});
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded){
        if(err){
            res.status(500).send({auth: false, message: 'Falha ao autenticar token'});
            return;
        } 

        db.query("SELECT * FROM tokens_blacklist WHERE Token = ?", token, function(erro, resultado){
            if(erro) {
                res.status(500).send({auth: false, message: 'Erro ao buscar token na lista de tokens invalidos'});
                return;
            }

            if(resultado.length > 0) {
                res.status(401).send({
                    auth: false,
                    message: 'Token ja invalidado. Favor realizar o login novamente',
                    links: [
                        {
                            rel: "login",
                            href: "http://localhost:3000/authentication/login"
                        }
                    ]
                });
                return;
            }
            else {
                next();
            }
        });
    });
}

exports.GenerateToken = function(payload) {
    return jwt.sign({payload}, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
}
