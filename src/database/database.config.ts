import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { HouseEntity } from './entities/houses.entity';
import { User } from './entities/users.entity';
//Aqui está o responsável por conectar meu código ao banco de dados
export default <TypeOrmModuleAsyncOptions>{
  //O ConfigModule é o Module do ConfigService
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return <PostgresConnectionOptions>{
      type: 'postgres',
      host: configService.get('DB_HOST'),
      //Como geralmente a porta é um número e quando pegamos do .env é String, uso o + para fazer a
      //conversão
      port: +configService.get('DB_PORT'),
      //Dados para logar no banco de dados. Estas informações estão sendo consumidas do arquivo .env
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      //Nome do banco de dados. Se fez necessário eu primeiro criar o banco de dados manualmente para
      //depois conseguir a conexão. (trabalhei com o Beekeeper)
      database: configService.get('DB_DATABASE'),
      //Se lembrarmos que o objetivo principal desse arquivo é permitir que eu interaja com o Banco
      //de Dados, eu preciso sinalizar quais as tabelas/entidades vou precisar manipular para executar
      //minha aplicação
      entities: [User, HouseEntity],
      //Aqui é para uso de migrations, que é um versionamento da estrutura da tabela.
      //Como o objetivo é didático, deixamos como true, então qualquer alteração realizada na estruturaa
      //da entidade automaticamente será aplicada no banco de dados.
      //Em produção, por questões de segurança desativamos esta opção, dessa forma, cada alteração é
      //salva.
      synchronize: true,
    };
  },
};
