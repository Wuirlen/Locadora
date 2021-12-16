var db = require('../Database/db');

module.exports = new class RentRepositorie {
    Rent(userId, movieId) {
        return new Promise(function(resolve, reject) {
            var sql = "UPDATE stock SET StockQuantity = StockQuantity - 1 WHERE MovieId = ? AND StockQuantity > 0"

            db.query(sql, movieId, function(erro,resultado) {
                if(erro) {
                    return reject(erro);
                }
                
                if(resultado.changedRows > 0) {
                    var sql = "INSERT INTO rents SET ?;"
                    var aluguel = {
                        UserId: userId,
                        MovieId: movieId,
                        RentDate: new Date().toLocaleString()
                    }

                    db.query(sql, aluguel, function(err,result) {
                        if(err) {
                            return reject(err); 
                        }

                        resolve(result)
                    });
                }
                else {
                    resolve({message: "Todos as copias deste filme estao alugadas"});
                }
            });
        });
    }

    Return(userId, movieId) {
        return new Promise(function(resolve, reject) {
            var sql = "UPDATE rents SET ReturnDate = ? " +
                      "WHERE RentId = (SELECT Id FROM " +
                      "(SELECT MAX(RentId) 'Id' FROM rents " +
                      "WHERE MovieId = ? AND UserId = ? AND ReturnDate IS NULL) AS Temp)"

            db.query(sql, [new Date().toLocaleString(), movieId, userId], function(erro,resultado) {
                if(erro) {
                    return reject(erro);
                }
                
                if(resultado.changedRows > 0) {
                    var sql = "UPDATE stock SET StockQuantity = StockQuantity + 1 WHERE MovieId = ?"

                    db.query(sql, movieId, function(err,result) {
                        if(err) {
                            return reject(err); 
                        }

                        resolve(result)
                    });
                }
                else {
                    resolve({message: "Este usuario não possui um aluguel deste filme"});
                }
            });
        });
    }
}
