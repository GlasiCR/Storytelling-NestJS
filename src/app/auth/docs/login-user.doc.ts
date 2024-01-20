import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDoc {
  @ApiProperty({
    type: String,
    description: 'E-mail de login do usuário',
    example: 'gla@cirilo.com',
    required: true,
  })
  email: string;
  @ApiProperty({
    type: String,
    description: 'Senha do usuário',
    required: true,
  })
  password: string;
}
