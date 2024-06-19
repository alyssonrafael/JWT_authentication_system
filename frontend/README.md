[PROJECT__BADGE]: https://img.shields.io/badge/📱Visit_this_project-000?style=for-the-badge&logo=project
[PROJECT__URL]: https://jwt-authentication-system-nine.vercel.app/

<h1 align="center" style="font-weight: bold;">Página de autenticação  * front-end * 🖥️</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite Badge">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React Badge">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Badge">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS Badge">
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" alt="Figma Badge">
</p>

<p align="center">
 <a href="#about">Sobre</a> • 
 <a href="#started">Primeiros Passos</a> • 
  <a href="#started">App Routes</a> • 
  <a href="#colab">Autor</a> •
</p>

# Meu Projeto

## Visão Geral

Este projeto é uma aplicação que possui funcionalidades específicas para usuários e administradores. Abaixo estão algumas capturas de tela que ilustram as principais interfaces do projeto.

[![Tela de Login](./public/login.png)](./public/login.png)

*Tela de Login: Clique na imagem para visualizar em tamanho maior.*

[![Painel do Usuário](./public/user-dash.png)](./public/user-dash.png)

*Painel do Usuário: Clique na imagem para visualizar em tamanho maior.*

[![Painel do Administrador](./public/adm-dash.png)](./public/adm-dash.png)

*Painel do Administrador: Clique na imagem para visualizar em tamanho maior.*

[![Versão Mobile](./public/mobile.png)](./public/mobile.png)

*Versão Mobile: Clique na imagem para visualizar em tamanho maior.*


<h2 id="started">📌 Sobre</h2>

O front-end deste projeto foi desenvolvido utilizando tecnologias modernas para proporcionar uma experiência de usuário eficiente e agradável. Utilizei o Vite, React como biblioteca JavaScript, TypeScript para tipagem estática, Tailwind CSS para facilitar o desenvolvimento e estilização dos componentes. Além disso, o design foi prototipado no Figma para garantir uma interface visualmente atraente e funcional. Por fim, o deploy foi realizado na plataforma Vercel para disponibilizar o aplicativo de forma rápida e segura na web.

[![project][PROJECT__BADGE]][PROJECT__URL]

<h2 id="started">🚀 Primeiros Passos</h2>

Nesta etapa, vou descrever como você pode executar o front-end localmente em seu ambiente de desenvolvimento.

<h3>Pré-requisitos</h3>

- [Node.js](https://nodejs.org/) - Certifique-se de ter o Node.js instalado.
- [Git](https://git-scm.com/) - Você também precisa do Git instalado em seu sistema.

<h3>Clonagem do Repositório</h3>

Para começar, clone este repositório executando o seguinte comando no terminal:

```bash
git clone https://github.com/alyssonrafael/JWT_authentication_system
```

<h3>Navegando para o Front-end:</h3>
Depois de clonar o repositório, navegue até o diretório do front-end com o seguinte comando:

```bash
cd ./JWT_authentication_system/front-end
```

<h3>Instalando as dependencias</h3>
Certifique-se de instalar todas as dependências necessárias para o front-end. Você pode fazer isso executando:

```bash
npm install
```

<h3>Substituindo Endpoints</h3>

É de extrema importância que você substitua os endpoints pelo URL da sua API. Por exemplo:

```yaml
http://localhost:3333...
```
Isso deverá ser feito em todas as partes do código que fazem requisições para a API. Aproveite esta oportunidade para explorar o código!

<h3>Iniciando o front-end</h3>

```bash
npm run dev
```

<h2 id="routes">📍 Application Routes</h2>

Rotas da minha aplicação
​
| Rota | Descrição |
|--------------------------|------------------------------------------------------------------------|
| <kbd>/</kbd> | Página inicial com a tela de login totalmente responsiva e em dispositivos pequenos renderiza o componene home que deixa a interfaçe mais agradavel para dispositivos mobile |
| <kbd>/login-mobile</kbd> | Página para login em dispositivos mobile. |
| <kbd>/register-mobile</kbd> | Página para registro em dispositivos mobile |
| <kbd>/register</kbd> | Página registro em dispositivos desktop. |
| <kbd>/user-dashboard</kbd> | Página protegida e so com o token pode ser acesada os usuarios padrao e admin tem acesso a ela. |
| <kbd>/admin-dashboard</kbd> | Página protegida restrita para Admins nela e possivel ver os emails e informaçoes de todos os usuarios registrados|

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

