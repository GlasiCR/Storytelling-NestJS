import { ApiProperty } from '@nestjs/swagger';
import { User_Role } from '../../../enums/user_roles.enum';
//Quanto mais inteligível nossa documentação, melhor é!
//É neste arquivo que temos a oportunidade de trazer maior clareza para a nossa API.
//Utilizando o @ApiProperty vamos incluir exemplos e informações relavantes sobre o objeto que cada
//rota espera receber na requisição.
//Uma vez criado, vamos refereciá-lo no Controller usando o @ApiBody(afinal é um exemplo do que vem
//no corpo da requisição rs)
//-----------------------------------------------------------
//Dica: Use o Dto como base para criar este tipo, afinal estamos falando da mesma coisa.
export class RegisterUserDoc {
  @ApiProperty({
    type: String,
    description:
      'Descrição do que se espera ser este campo, nome do usuário, por exemplo',
    example: 'Glasi',
    required: true,
  })
  name: string;
  @ApiProperty({
    type: String,
    description: 'E-mail do usuário, por exemplo',
    example: 'gla@gmail.com',
    required: true,
  })
  email: string;
  @ApiProperty({
    type: String,
    description: 'Senha do usuário',
    required: true,
  })
  password: string;
  @ApiProperty({
    type: User_Role,
    enum: User_Role,
    description: 'Perfil de acesso do usuário',
    example: 'seller',
    required: true,
  })
  role: User_Role;
}
