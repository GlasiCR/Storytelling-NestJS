import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
//O AuthGuard será a nossa classe guardiã de rotas
//Aqui settaremos algumas informações que usaremos nos Controllers a fim de proteger as rotas que
//não são públicas, que requerem a autenticação de um usuário para acesso.
//---------------------------------------------------
//Expliquei o @Injectable() com mais detalhes em AuthService, mas basicamente ele sinaliza para o Nest
//que está classe será utilizada na injeção de dependência de outras classes.
@Injectable()
//A interface CanActive possui um único método o qual usaremos para descrever a lógica de autenticação
//para acesso as rotas que forem decoradas por este Guard. Seu retorno é um boolean onde, true a
//a autenticação deu certo, então a rota é liberada e false, que significa que a autentição não teve
//êxito.
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //Para saber se posso ou nhão liberar tal rota para esse usuário, vou precisar dos dados do
    //usuário que está logado. Estes dados encontro na instância da requisição.
    //Abaixo, nós vamos acessar o contexto de execução da requisição NestJS para obter a instância
    //da requisição HTTP. Entre outras informações, é lá que tenho as informações se há usuário logado.
    const request = context.switchToHttp().getRequest();
    //Pego o token do request
    const token = this.getTokenFromHeader(request);
    //Se não tiver token, significa que não há usuário logado, logo não será possível acessar a rota
    if (!token) {
      throw new UnauthorizedException('Não há token para validação');
    }
    try {
      //Mas se tiver um token no request, o mesmo passará por um processo de validação.
      //O método verifyAsync() verifica a validade do token, descriptografando-o e verificando sua
      //assinatura, utilizando a chave secreta fornecida (JWT_SECRET).
      const tokenPayload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
      //Validação estando OK, o payload (aquele que construímos no login e transformamos em assinatura)
      //do token é armazenado na variável tokenPayload. Em seguida, esse payload é inserido na
      //requisição (request['user'] = tokenPayload).
      //Agora poderemos acessar com facilidade as informações do usuário na nossa aplicação.
      request['user'] = tokenPayload;
    } catch (error) {
      throw new UnauthorizedException('Token Inválido');
    }
    return true;
  }
  //Vamos utilizar do método getTokenFromHeader() para extrair o token de autenticação do cabeçalho de
  //autorização da requisição.
  //Se o cabeçalho de autorização não estiver presente ou não estiver no formato esperado, Bearer, o
  //método retornará undefined. Caso contrário, retornará o token extraído.
  private getTokenFromHeader(request: Request): string | undefined {
    const headers = request.headers;
    const [type, token] = headers?.authorization?.split(' ') || [];
    return type === 'Bearer' ? token : undefined;
  }
}
