import { ApiProperty } from '@nestjs/swagger';
export class LoginResponceDoc {
  @ApiProperty({
    type: String,
    description: 'Token de autenticação do usuário',
    example: 'eyJhbGciOiJIlNiIsInR5.EYjPC6iK',
  })
  token: string;
}
