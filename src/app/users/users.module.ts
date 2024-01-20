import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '../../database/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  //No imports irei incluir todas as funcionalidades externas ou módulos que vou precisar para rodar
  //o Module que estou trabalhando. Neste caso estou importando o TypeOrmModule, que é do próprio Nest,
  //e para facilitar a integração com o TypeORM uma biblioteca ORM*
  //--------------------------------------
  //Desta função usamos o método "forFeature" que me permitirá ter acesso as funcionalidades
  //relacionadas a Entidade, find(), create(), por exemplo.
  //--------------------------------------
  //*Eu preciso me integrar ao ORM, pois ele é o responsável por me ajudar a interagir com o Banco de
  //Dados.
  //Vamos imaginar um Banco de Dados: uma tabela gigante com linhas e colunas, onde cada linha é
  //um registro e cada coluna um atributo deste registro. Uma vez que no JS trabalhamos com objetos
  //o ORM ajuda me ajuda nessa conversão, assim conseguimos facilmente interagir com o Banco de Dados
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
