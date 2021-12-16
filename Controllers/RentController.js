var rentRepositorie = require('../Repositories/RentRepositorie');

exports.Rent = function(req,res) {
    var userId = req.body.UserId;
    var movieId = req.body.MovieId;

    rentRepositorie.Rent(userId, movieId).then(function(resultado, erro){
        if(erro) {
            console.log(erro);
            res.status(500).send(erro);
            return;
        }

        var idInserido = resultado.insertId;

        if(idInserido > 0) {
            res.status(200).send({
                RentId: idInserido,
                links: [
                    {
                        rel: "return",
                        href: "http://localhost:3000/rents/return"
                    }
                ]
            })
        }
        else {
            res.status(200).send(resultado);
        }
    });
}

exports.Return = function(req,res) {
    var userId = req.body.UserId;
    var movieId = req.body.MovieId;

    rentRepositorie.Return(userId, movieId).then(function(resultado, erro) {
        if(erro) {
            res.status(500).send(erro);
            return;
        }

        if(resultado.changedRows > 0) {
            res.status(200).send({message: "Filme devolvido com sucesso"});
            return;
        }
        else {
            res.status(200).send(resultado);
        }
    });
}