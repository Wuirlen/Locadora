# locadora-de-filmes-nodejs


API REST em nodejs para uma aplicação de locação de filmes:
    Funcionalidade: 
        -Novo usuario
        -Login
        -recuperar senha
        -Alugar filme
        -Devolver Filme
        -Pesquisar Filme


* NodeJS
* Postgre
* JWT (Token)
* Express
* Nodemailer
* bcryptjs
* Sequilize(ORM)
* Morgan
* Docker
* Nodemon

# Instruções de instalação local:

    #Para instalação local tenha nodejs  Postgre instalado com: user:postgres, password:postgres e database:postgres
	
    git clone https://github.com/Wuirlen/Locadora.git
    cd Locadora
    npm install (Instalação das bibiliotecas)
    npm start (Inicia aplicação) ou npm run dev (Para utilizar nodemon)

# Instruções para instalação Docker:

    #Para instalação com docker tenha docker-compose instalado.
	
    git clone https://github.com/Wuirlen/Locadora.git
    cd Locadora
    docker-compose up
	
# Autenticação

A autenticação é feito por token, o front-end é responsável por armazenar o token, e enviá-lo a cada requisição, assim como atualizá-lo com a resposta do servidor. 
A API foi construída para ser stateless, não armazenando tokens.
O token expira e pode ser facilmente configurado e gerado um novo token a cada requisição.
O logoff do usuário é realizado exclusivamente no front-end, eliminando o token da memória.
O token gerado para recuperação de senha, não pode ser utilizado para login/etc e expira em 24 horas.

## Registro do Usuário

#### REQUEST

POST: [http://localhost:3000/users/register](http://localhost:3000/users/register)

Body:

| Campo         | Descrição     | Obrigatorio |
| ------------- |-------------| :---------: |
| email | Email do usuário | X |
| password | Senha do usuário | X |
| name  | Nome do usuário | X |

#### RESPONSE

Campo **authorization** no header com o token do usuário, deverá ser armazenado pelo front-end para fins de autenticação.


- - - -

## Login no sistema

#### REQUEST

POST: [http://localhost:3000/users/authenticate](http://localhost:3000/users/authenticate)

Body:

| Campo         | Descrição     | Obrigatorio |
| ------------- |-------------| :---------: |
| email | Email do usuário | X |
| password | Senha do usuário | X |

#### RESPONSE

Campo **authentication** no header com o token do usuário, deverá ser armazenado pelo front-end para fins de autenticação.

- - - -

## Esqueci a senha

#### REQUEST

POST: [http://localhost:3000/users/forgot_pass](http://localhost:3000/users/forgot_pass)

Body:

| Campo         | Descrição     | Obrigatorio |
| ------------- |-------------| :---------: |
| email | Email do usuário | X |

## Reset  de senha

#### REQUEST

POST: [http://localhost:3000/users/reset_pass](http://localhost:3000/users/reset_pass)

Body:

| Campo         | Descrição     | Obrigatorio |
| ------------- |-------------| :---------: |
| email | Email do usuário | X |

- - - -

# Listagem de filmes

GET: [http://localhost:3000/movies](http://localhost:3000/movies)

É necessário adicionar o token no header da requisição.
Retornará apenas os títulos que estão disponíveis para locação, em um array de filmes,
cada filme possuirá:

| Campo         | Descrição     |
| ------------- |-------------|
| id | Id do filme, será utilizado na hora do usuário locar o filme |
| title | Título do filme |
| director | Nome do diretor do filme |



- - - -

# Listagem de filmes disponíveis

GET: [http://localhost:3000/movies/available](http://localhost:3000/movies/available)

É necessário adicionar o token no header da requisição.
Retornará apenas os títulos que estão disponíveis para locação.
Cada filme possuirá:

| Campo         | Descrição     |
| ------------- |-------------|
| id | Id do filme, será utilizado na hora do usuário locar o filme |
| title | Título do filme |
| director | Nome do diretor do filme |



- - - -

# Busca de filmes por title

GET: [http://localhost:3000/movies/:movieTitle](http://localhost:3000/movies/:movieTitle)

É necessário adicionar o token no header da requisição.
A busca é limitada para buscas com mais de 3 carácteres para não sobrecarregar o banco de dados.

Retornará os títulos que possuem como subpalavra o parâmetro informado.
cada filme possuirá:

| Campo         | Descrição     |
| ------------- |-------------|
| id | Id do filme, será utilizado na hora do usuário locar o filme |
| title | Título do filme |
| director | Nome do diretor do filme |



- - - -

# Busca de filmes por id

GET: [http://localhost:3000/movies/:titleId](http://localhost:3000/movies/:titleId)

É necessário adicionar o token no header da requisição.
A busca é limitada para buscas com mais de 3 carácteres para não sobrecarregar o banco de dados.

Retornará o títulos que associado ao id:

| Campo         | Descrição     |
| ------------- |-------------|
| id | Id do filme, será utilizado na hora do usuário locar o filme |
| title | Título do filme |
| director | Nome do diretor do filme |



- - - -

# Locação de um filme

POST: [http://localhost:3000/movies/rent](http://localhost:3000/movies/rent)

É necessário adicionar o token no header (ou body) da requisição.

Body:

| Campo         | Descrição     | Obrigatorio |
| ------------- |-------------| :---------: |
| movie | ID do filme que o usuário deseja locar | X |


O filme será marcado como available = false e vinculado ao usuario

- - - -

# Devolução de um filme

POST: [http://localhost:3000/movies/return](http://localhost:3000/movies/return)

É necessário adicionar o token no header (ou body) da requisição.

Body:

| Campo         | Descrição     | Obrigatorio |
| ------------- |-------------| :---------: |
| movie | ID do filme que o usuário deseja devolver | X |


O filme será marcado como available = true e desvinculado ao usuario

- - - -

# Status de requisições

200 - Sucesso

400 - Requisição incorreta

401 - Não autorizado (senha incorreta)

403 - Não possui acesso

500 - Erro no servidor