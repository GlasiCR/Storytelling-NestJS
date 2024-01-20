import { ApiProperty } from '@nestjs/swagger';
import { RegisterUserDoc } from './register-user.doc';

export class CreatedUserDoc extends RegisterUserDoc {
  @ApiProperty({
    type: Number,
    description: 'Número do id do usuário',
    example: 1,
  })
  id: number;
  @ApiProperty({
    type: Date,
    description: 'Registra a data que o usuário foi salvo no banco de dados',
    example: '2023-12-15',
  })
  createdAt: Date;
  @ApiProperty({
    type: Date,
    description:
      'Registra a data quando há uma atualização nos dados do usuário',
    example: '2023-12-20',
  })
  updatedAt: Date;
}
