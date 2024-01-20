import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleAsyncOptions = {
  //Importamos o ConfigModule, pois como nele é centralizado todas as configurações da aplicação (
  //expliquei ele com um pouco mais de detalhes no arquivo main) e vamos configurar a chave secreta
  //para gerar o token, nos será útil para acessar este dado
  imports: [ConfigModule],
  //Injetaremos o Service do Config, pois ele nos será útil em outros módulos, dessa maneira poderemos
  //acessar facilmente as configurações em diferentes partes da sua aplicação
  inject: [ConfigService],
  useFactory: (ConfigService: ConfigService) => ({
    //Esta é a chave secreta:
    secret: ConfigService.get('JWT_SECRET'),
    //signOptions é opcional, umas das funcionalidades que me oferece é configurar o tempo de validação
    //do token.
    signOptions: {
      expiresIn: ConfigService.get('JWT_EXPIRES'),
    },
  }),
};
