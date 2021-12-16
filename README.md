# Locadora 
Sistema de uma locadora de filmes. O sistema permite a criação de usuários (clientes), logon e logoff de um usuário, listagem de filmes disponíveis, locação de um filme, devolução de um filme, e pesquisa de filme pelo título.

## Pré-Requisitos
Para utilizar o projeto você necessita ter instalado:
- NodeJS
- MySql 

## Como instalar
Navegue até a pasta em que deseja salvar o projeto e realize os seguintes comandos: 

```sh
$ git clone https://github.com/Wuirlen/Locadora.git
$ cd Locadora
$ npm install
$ node index.js
```

## Banco de Dados
Para a criação do banco de dados, basta acessar a pasta **Database** do projeto e utilizar o script do arquivo **Locadora.sql**.

Caso seja necessário alterar alguma configuração do banco, como username, password, host, etc, basta alterar os dados no arquivo **.env** que irá ser refletido quando o projeto for inicializado. 

## Especificação da API

### Token
Todas as requisições feitas que **não** sejam para os endpoints:
- /authentication/login
- /users/user

devem ser acompanhadas do Token de autenticação adquirido no endpoint de login, este token deve ser enviado no cabeçalho da requisição com a chave **Authorization**.

### Endpoints
* [GET /movies/movies](#get-moviesmovies)
* [GET /movies/movies/:titulo](#get-moviesmoviestitulo)
* [POST /users/user](#post-usersuser)
* [POST /authentication/login](#post-authenticationlogin)
* [POST /authentication/logout](#post-authenticationlogout)
* [POST /rents/rent](#post-rentsrent)
* [POST /rents/return](#post-rentsreturn)

### GET /movies/movies
Retorna os filmes disponiveis com quantidade em estoque maior que zero.

Resposta: 
```
{
    "movies": [
        {
            "MovieId": 3,
            "Title": "Star Wars: Episódio V - O Império Contra-Ataca",
            "Director": "Irvin Kershner",
            "StockQuantity": 1
        },
        {
            "MovieId": 4,
            "Title": "Star Wars: Episódio VI - O Retorno de Jedi",
            "Director": "Richard Marquand",
            "StockQuantity": 5
        },...
    ]
}
```

### GET /movies/movies/:titulo
Retorna os dados relativo ao filme especificado. A pesquisa retorna filmes que contenham o parâmetro informado no titulo para não ser necessário informar o titulo inteiro do filme, portanto, pode retornar mais de um filme.

Exemplo de requisição: **/movies/movies/contra-ataca**

Resposta: 
```
[
    {
        "MovieId": 3,
        "Title": "Star Wars: Episódio V - O Império Contra-Ataca",
        "Director": "Irvin Kershner",
        "StockQuantity": 1
    }
]
```

### POST /users/user
Cria um novo usuário

Exemplo de requisição: 
```
{
	"Email": "Teste5@teste.com",
	"Name": "Teste5",
	"Password": "Teste5"
}
```

Resposta:
```
{
    "userId": 5,
    "links": [
        {
            "rel": "self",
            "href": "http://localhost:3000/users/user/5"
        }
    ]
}
```

### POST /authentication/login
Realiza a autenticação do usuário, retornando o Token para ser utilizado nas próximas requisições.

Exemplo de requisição:
```
{
	"Email": "Teste5@teste.com",
	"Password": "Teste5"
}
```

Resposta:
```
{
    "auth": true,
    "user": {
        "id": 5,
        "email": "Teste5@teste.com",
        "nome": "Teste5"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7IlVzZXJJZCI6NSwiRW1haWwiOiJUZXN0ZTVAdGVzdGUuY29tIiwiTmFtZSI6IlRlc3RlNSIsIlBhc3N3b3JkIjoiJDJiJDEwJFh4OVJMbUhmQTBEOC5FcWNaTzdKNXVCNEpvMUhLV0ZOTktXU0VQS3h2QmxEUk9XcDYyOVRxIn0sImlhdCI6MTU0NDk3MDM3OSwiZXhwIjoxNTQ1MDU2Nzc5fQ.mvKNUUZQhjFcM48NFRChdv7kGEdhsYJ_-b5t1a3uukU"
}
```

### POST /authentication/logout
Realiza o logout do usuário. Para está requisição, deve ser enviado apenas o token no header da requisição e este token será inserido em uma lista de tokens inválidos para todas as próximas requisições.

Resposta:
```
{
    "message": "Logout realizado com sucesso!"
}
```

### POST /rents/rent
Realiza o aluguel de um filme caso este a locadora possua este filme em estoque.

Exemplo de requisição:
```
{
	"UserId": 2,
	"MovieId": 8
}
```
Resposta:
```
{
    "RentId": 9,
    "links": [
        {
            "rel": "return",
            "href": "http://localhost:3000/rents/return"
        }
    ]
}
```

### POST /rents/return
Realiza o aluguel de um filme caso este a locadora possua este filme em estoque.

Exemplo de requisição:
```
{
	"UserId": 2,
	"MovieId": 8
}
```
Resposta:
```
{
    "message": "Filme devolvido com sucesso"
}
```