import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from './dto/user-register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterUserDoc } from './docs/register-user.doc';
import { LoginUserDoc } from './docs/login-user.doc';
import { CreatedUserDoc } from './docs/created-user.doc';
import { LoginResponceDoc } from './docs/login-response.doc';
//Vamos primeiramente segmentar nossas rotas. Ao incluirmos o @ApiTags, conseguimos separar as
//rotas por Controller. Faz referencia ao endpoint.
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //A ludicidade melhora muito a compreensão de um código, o torna mais tangível.
  //Vamos usar dos decorators @ApiBody e @ApiResponse para incluir um exemplo do que se espera
  //de entrada e saída
  @ApiBody({ type: RegisterUserDoc })
  @ApiResponse({ type: CreatedUserDoc, status: HttpStatus.CREATED }) //HttpStatus é o enum do Nestjs para status da requisição
  @Post('register')
  async register(@Body() userRegisterDto: UserRegisterDto) {
    return await this.authService.register(userRegisterDto);
  }
  @ApiBody({ type: LoginUserDoc })
  @ApiResponse({ type: LoginResponceDoc, status: HttpStatus.OK })
  @Post('login')
  async login(@Body() payload: LoginDto) {
    return await this.authService.login(payload);
  }
  //Obs: Para efeitos de documentação:
  //Quando uma rota é protegida, sinalizamos com o decorator @ApiBearerAuth().
  //Se há restrição de acesso relacionado ao perfil do usuário, entre parenteses infomamos
  //qual o perfil que tem permissão para a rota em questão. Há um exemplo no
  //HousesController.
}
