var movieRepositorie = require('../Repositories/MovieRepositorie');

exports.GetAll = function(req,res) {
    movieRepositorie.GetAll().then(function(resultado, erro){
        if(erro) {
            res.status(500).send({message:"Erro ao buscar todos os filmes"});
            return;
        }

        if(resultado.length > 0) {
            res.status(200).send({movies: resultado});
            return;
        }
        else {
            res.status(200).send({message:"Nenhum filme cadastrado."});
            return;
        }
    });
}

exports.GetByTitle = function(req,res) {
    var title = req.params.title;

    movieRepositorie.GetByTitle(title).then(function(resultado, erro){
        if(erro) {
            res.status(500).send({message:"Erro ao buscar filme pelo titulo"});
            return;
        }

        if(resultado.length > 0) {
            res.status(200).send(resultado);
            return;
        }
        else {
            res.status(200).send({message: "Nenhum filme cadastrado com este titulo"});
        }
    });
}