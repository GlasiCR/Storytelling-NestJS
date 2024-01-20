import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegisterDto } from './dto/user-register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../database/entities/users.entity';
//Auth, ou autenticação é o processo que verificamos se o usuário é quem ele afirma ser. Para isso
//geralmente são necessários os dados de usuário(este deve ser um dado único, imagina ter dois usuário
//iguais num banco de dados? não vai dar certo) e uma senha. A senha que para mais segurança é salva
//encriptografada, JWT é quem geralmente assume esta função.
//--------------------------------------------------------------
//Esta etapa de autenticação começa assim que o usuário é criado, uma vez que, geralmente, é nesse
//momento também que são definidas as credenciais de acesso, usuário e senha. Dependendo da aplicação
//que está se desenvolvendo, ainda há a necessidade de criar perfis de acesso e determinar quem pode
//acessar o que.
//--------------------------------------------------------------
//O Decorator @Injectable() está relacionado com injeção de dependência.
//Ao utilizar ele, sinalizo para o Nest que esta classe usarei em outras partes do meu código.
@Injectable()
export class AuthService {
  //Serei redundante mas vou dizer, interação com o Banco de Dados é constante durante a construção de
  //aplicação, principamente back-end rs. Logo o que não podemos esquecer é o óbvio, sempre precisamos
  //de um Repository, a camada de interação com o banco.
  //No constructor vamos configurar o que precismaos para inicializar a classe, o repository entra aqui
  constructor(
    //Para interagir com o Banco de Dados vamos usar um decorator @InjectRepository() e indicar no
    //parentes qual a tabela que vamos usar, em outras palavras, qual a Entidade. Além de outras coisas
    //tbm precisamores, claro rs!
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  //Iniciando a jornada, vamos criar o usuário (o correto seria até criá-lo no próprio userService)
  //Antes de mais nada, para ficar mais lúdico, vamos imaginar como se dá a criação de um usuário?
  //Para cada aplicação a "forma" do usuário pode ser diferente, mas basicamente é o cadastro de
  //informações de um perfil o qual são indicadas um campo de login que deve ser único no banco, e uma
  //senha, essas serão as credenciais de acesso.
  //Para essa "forma", vamos criar o objeto, um DTO. É ele quem vai ditar qual a forma que o objeto
  //precisa ter para que o back-end consiga criá-lo.
  //O DTO é uma espécie de contrato, como se dissesse: "Opa! você quer criar um
  //usuário? Preciso que me forneça com objeto desse tipo".
  async register(userRegisterDto: UserRegisterDto) {
    try {
      //Para este trecho vale lembra que; criar/"create" um usuário não significa que ele está no Banco
      //de Dados. Precisamos criar o usuário e depois salvá-lo/"save". São funções diferentes mas que
      //se complementam.
      //---------------------------------------------------
      //Outro ponto importante nesta etapa é assegurar os dados deste usuário. Não é indicado salvar no
      //banco de dados exatamente os caracteres que o usuário digitou como senha. Salvamos a senha sim,
      //mas "hasheada"...nem sei se essa palavra existe, mas como brasileiro gosta de conjugar tudo rs
      //Hashing é o processo que transforma dados em uma sequência fixa de caracteres usando um algoritmo
      //de hash.
      //Em outras palavras ele dá uma embaralhada na senha, aplica outros caracteres e o que antes era
      //uma senha 123456, se torna algo do tipo: lkasjjaoiv2435hvnDpoicjvnnvksori.
      //Esse processo é unilateral, então não tem como converter a hash de volta na senha.
      //---------------------------------------------------
      //Para hash usaremos a biblioteca bcrypt e a configuração está na entidade, de forma que antes
      //de inserir o usuário no banco de dados, a senha será hasheada.
      //Consulte a Entidade para compreender como é feito este processo?
      const user = this.userRepository.create(userRegisterDto);
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  //Vamos seguir para outra etapa que as credencias de autenticação são importantes: o login.
  //Também se faz necessário criar uma forma/contrato/tipo do que se espera para realizar o login.
  //Comumente é login e senha
  async login(userLoginDto: LoginDto) {
    try {
      //Primeiramente vamos encontrar o usuário no banco. Este é um passo importante por dois motivos:
      //- Primeiramente porque precisamos do objeto do usuário se quisermos trabalhar com ele;
      //- E segundo para confirmar se o usuário informado de fato existe no banco
      //-----------------------------------------------
      //Se o usuário existir armazenamos ele um uma variável
      const user = await this.userService.findUserByEmail(userLoginDto.email);
      //Se não, retornamos uma exceção
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      //Usamos o método compare() do bcrypt para comparar a senha que o usuário passou no login e a
      //senha que está armazenada no banco.
      //-----------------------------------------------
      //Talvez possam se perguntar: mas ué, como vai comparar se o que está salvo no banco é o hash e
      //não a senha?
      //Pois bem, o método compare também é o responsável por fazer isso dar certo.
      //A senha que o usuário passou ele vai hashear e vai comparar este hash com aquele salvo no banco.
      const passwordVerification = await bcrypt.compare(
        userLoginDto.password,
        user.password,
      );
      //Caso a comparação retorne falso, trataremos esta exceção retornando uma mensagem de erro
      if (!passwordVerification) {
        throw new UnauthorizedException('User Unauthorized');
      }
      //A tradução de payload é carga útil. Neste trecho vamos criar uma estrutura de dados, um
      //objeto, com os dados que desejamos transportar.
      //-----------------------------------------------
      //Incluimos aqui:
      //- id (identificador único do usuário);
      //- email (que faz parte da credencial de acesso, então será útil na autenticação);
      //- role (que é o perfil do usuário, dessa maneira minhas requisições terão como "saber" se o
      //usuário tem permissão para acessar rota ou não).
      const payload = {
        sub: user.id,
        email: user.email,
        role: user.role,
      };
      //Agora que temos o payload(objeto da entidade que vamos transportar construído), esses dados são
      //encriptografados usando uma chave de segurança (JWT_SECRET, configurada no arquivo .env),
      //o resultado desse processo é o token que conhecemos, também chamado de assinatura.
      //a função signAsync cria a assinatura a partir do payload que ela recebe e da configuração do
      //módulo JWT, jwtConfig.
      //-----------------------------------------------
      //É no arquivo jwtConfig que constam as configurações de chave de segurança, se o token expira
      const token = await this.jwtService.signAsync(payload);

      return {
        access_token: token,
      };
    } catch (error) {
      throw new HttpException(
        error?.message || 'UNAUTHORIZED',
        error?.status || HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
