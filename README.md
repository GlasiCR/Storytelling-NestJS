<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Este repositório tem cunho didático. 
No formato Storytelling, os comentários no código, procurei deixar mais natural possível a construção de uma aplicação utilizando o NestJS. 

Neste documento você vai encontrar:
- Configuração no módulo principal; <br>
src\main.ts
- Configuração do Banco de Dados; <br>
src\database
- Relacionamento entre Entidades;<br>
src\database\entities\users.entity.ts
- Autenticação e Autorização de usuário;<br>
src\app\auth
- Guards (pra autenticação e perfil de acesso);<br>
src\app\auth\guards
src\app\houses\houses.controller.ts
- Teste unitário;<br>
src\app\users\users.controller.spec.ts
src\app\users\users.service.spec.ts
- Documentação da API no Swagger.<br>
src\app\auth\auth.controller.ts


## Instalação

```bash
$ npm install
$ npm i --save @nestjs/config
$ npm i –save @nestjs/swagger
$ npm install --save @nestjs/typeorm typeorm pg
$ npm i –save-dev @types/bcrypt
$ npm install --save class-validator class-transformer
$ npm install –save@nestjs/jwt
```

## Rodar aplicação

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Executar teste

```bash
# unit tests
$ npm run test

```

## License

Nest is [MIT licensed](LICENSE).
