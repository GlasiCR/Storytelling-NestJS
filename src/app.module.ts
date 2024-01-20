import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './app/users/users.module';
import { HousesModule } from './app/houses/houses.module';
import { AuthModule } from './app/auth/auth.module';

@Module({
  imports: [
    //Aqui estou configurando o ConfigModule para ser global na aplicação.
    //Isso significa que poderei acessar as configurações definidas no ConfigModule em qualquer lugar da aplicação, facilitando o acesso a variáveis de ambiente, configurações definidas em arquivos, ou qualquer outra fonte de configuração que eu tenha especificado no ConfigModule.
    ConfigModule.forRoot({ isGlobal: true }),
    //Além disso, também preciso tornar conhecido para a minha aplicação os modules que fazem parte do meu projeto, caso contrário não serão instanciados as entidades com sua respectiva estrutura de Service e Controller
    DatabaseModule,
    AuthModule,
    UsersModule,
    HousesModule,
  ],
})
export class AppModule {}
