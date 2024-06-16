<h1 align="center" style="font-weight: bold;">Página de autenticação * back-end * 💻</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js Badge">
  <img src="https://img.shields.io/badge/Express-005CFE?style=for-the-badge&logo=express&logoColor=white" alt="Express Badge">
  <img src="https://img.shields.io/badge/Javascript-000?style=for-the-badge&logo=javascript" alt="JavaScript Badge">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker Badge">
  <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL Badge">
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma Badge">
</p>

<p align="center">
 <a href="#started">Primeiros passos</a> • 
  <a href="#routes">API Endpoints</a> •
 <a href="#colab">Autor</a>
</p>

<p align="center">
  <b>Minha API é o coração da minha aplicação, oferecendo endpoints para acessar e manipular dados. Desenvolvida com Node.js e Express, ela utiliza PostgreSQL como banco de dados e Docker para fácil implantação. Hospedada na Vercel, garante alta disponibilidade. O acesso aos dados é gerenciado eficientemente com Prisma.</b>
</p>

<h2 id="started">🚀 Primeiros passos</h2>

Nesta etapa, vou descrever como você pode executar a API localmente em seu ambiente de desenvolvimento.

<h3>Pré-requisitos</h3>

- [NodeJS](https://nodejs.org/en)
- [Docker ](https://docker.com)
- [Git 2](https://github.com)

<h3>Clonagem do Repositório:</h3>

```bash
git clone https://github.com/alyssonrafael/JWT_authentication_system
```

<h3>Navegando para o Back-end:</h3>

```bash
cd ./JWT_authentication_system/back-end
```

<h3>Instalando as dependencias</h3>
Com o comando vc garante a instalação das dependências

```bash
npm install
```

<h3>variáveis de ambiente</h2>

Use o arquivo `.env.exemple` como referência para criar seu arquivo de configuração. Nele é onde estarão os parâmetros para que o Prisma possa se conectar ao seu banco de dados.

```yaml
DATABASE_URL="postgresql://example:1111@localhost:5432/example?schema=public"
```

Garanta que esse sao os mesmos parametro passados no arquivo docker compose que servira para iniciar o container com o banco de dados. Você pode personalizar como vc quer seu container o nome do banco e senha e garanta que eles sejam passados certos para a URL.

Para iniciar o banco de dados via docker, execute o seguinte comando diretamente no terminal:

```yaml
docker-compose up
```

com isso o docker iniciara seu banco de dados

<h3>Migrações</h3>
Após o banco de dados estar em execução, execute o seguinte comando para aplicar as migrações do Prisma:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

<h3>Starting</h3>

Com tudo isso feito resta apenas iniciar o projeto. com o seguinte comando:

```bash
npm run dev
```

<h2 id="routes">📍 API Endpoints</h2>

Essas são minhas rotas principais: tenho duas tabelas relacionadas a categorias e tarefas

<h1>Auth</h1>

| Route                                                    | description                                                                  |
| -------------------------------------------------------- | ---------------------------------------------------------------------------- |
| <kbd>POST/http://localhost:3333/api/register</kbd>       | cadastra um novo usuario [response details](#register)                       |
| <kbd>POST/http://localhost:3333/api/login</kbd>          | Faz a autenticação e gera um token para o usuario [response details](#login) |
| <kbd>GET/http://localhost:3333/api/user-dashboard</kbd>  | página para usuario padrão [response details](#userdash)                     |
| <kbd>GET/http://localhost:3333/api/admin-dashboard</kbd> | página para usuario Admin [response details](#admdash)                       |

<h3 id="register">POST api/register</h3>

```json
[
  {
    "name": "user teste",
    "email": "userteste@mail.com",
    "password": "123456",
    "role": "USER" //ou ADMIN
  }
]
```

<h3 id="login">POST api/login</h3>

```json
[
    {
    "email": "userteste@mail.com",
    "password": "123456"
    }
]

ele retornara um token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjZT......"
```

<h3 id="userdash">GET api/user-dashboard</h3>

```json
    **HEADERS**

    KEY                 VALUE
    Authorization        TOKEN USER

    RETORNA PAGINA DO USER
```

<h3 id="admdash">GET api/admin-dashboard</h3>

```json

    **HEADERS**

       KEY                 VALUE
    Authorization        TOKEN ADIMIN

    RETORNA PAGINA DO ADIMIN

```

<h1>User</h1>

| Route                                                     | description                                                                                |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| <kbd>GET/http://localhost:3333/api/users</kbd>            | Retorna todas os usuarios cadastrados rota restrita ao admin [response details](#get-user) |
| <kbd>PATCH/http://localhost:3333/api/users/:id/role</kbd> | altera a Role do usuario restrito ao admin [response details](#PATCH-role)                 |
| <kbd>PUT/http://localhost:3333/api/users/:id</kbd>        | atualização do nome todos tem acesso [response details](#put-users)                        |
| <kbd>DELETE/http://localhost:3333/api/users/:id</kbd>     | Exclusão de usuario todos tem acesso                                                       |
| <kbd>GET/http://localhost:3333/api/users/:id</kbd>        | Buscar usuario com base no id                                                              |

<h3 id="get-user">GET api/users</h3>

```json


    **HEADERS**

       KEY                 VALUE
    Authorization        TOKEN ADIMIN

```

<h3 id="PATCH-role">PATCH api/user/:id</h3>

```json
[
  {
    "role": "ADMIN"
  }
]
**HEADERS**

       KEY                 VALUE
    Authorization        TOKEN ADIMIN
```

<h3 id="put-users">PUT api/user/:id</h3>

```json
{
  "name": "usuario teste"
}
**HEADERS**

       KEY                 VALUE
    Authorization          TOKEN
```

<h2 id="colab">✒️ Autor</h2>

<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <td style="padding: 20px; border: 1px solid #ccc; text-align: center;">
      <a href="https://github.com/alyssonrafael" style="text-decoration: none;">
        <img src="https://avatars.githubusercontent.com/u/128101121?s=400&u=133d3afb5a5d6ef6411bc63742e3202995d3cfad&v=4" width="100px" style="border-radius: 50%;" alt="Alysson Rafael Profile Picture"/><br>
        <b>Alysson Rafael</b>
      </a>
    </td>
    <td style="padding: 20px; border: 1px solid #ccc;">
      Gostaria de expressar minha sincera gratidão a todos que contribuíram para este projeto! Seja com sugestões, correções de bugs ou simplesmente com palavras de incentivo, cada um de vocês fez a diferença. 🚀 Obrigado pelo seu apoio !
    </td>
  </tr>
</table>
