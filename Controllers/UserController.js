var userRepositorie = require('../Repositories/UserRepositorie');
var HashHelper = require('../Helpers/Criptografy');

exports.CreateUser = function(req,res){
    var userRequest = req.body;
    userRequest.Password = HashHelper.HashPassword(userRequest.Password);

    if(userRequest.Password == null) {
        res.status(500).send({message:"Erro ao criptografar senha do usuario"});
        return;
    }
    else {
        userRepositorie.CreateUser(userRequest).then(function(resultado, erro) {
            if(erro) {
                res.status(500).send({message: "Erro ao criar usuario"});
                return;
            }
            var idInserido = resultado.insertId;
            res.status(201).send({
                userId: idInserido,
                links: [
                    {
                        rel: "self",
                        href: "http://localhost:3000/users/user/" + idInserido
                    }
                ]
            });
        });
    }
}