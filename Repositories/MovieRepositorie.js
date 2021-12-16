var db = require('../Database/db');

module.exports = new class MovieRepositorie {
    GetAll() {   
        return new Promise(function(resolve, reject) {
            var sql = "SELECT m.*, s.StockQuantity " +
                      "FROM movies m INNER JOIN stock s " +
                      "ON m.MovieId = s.MovieId " +
                      "WHERE s.StockQuantity > 0";

            db.query(sql, function(erro,resultado) {
                if(erro) {
                    return reject(erro);
                }
                resolve(resultado);
            });
        });
    }
    
    GetByTitle(title) {
        return new Promise(function(resolve,reject){
            var sql = "SELECT m.*, s.StockQuantity " +
                      "FROM movies m INNER JOIN stock s " +
                      "ON m.MovieId = s.MovieId " +
                      "WHERE Title LIKE ?";

            db.query(sql, '%' + title + '%', function(erro,resultado){
                if(erro) {
                    return reject(erro);
                }
                resolve(resultado);
            });
        });
    }
}