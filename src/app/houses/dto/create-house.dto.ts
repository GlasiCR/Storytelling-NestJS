import { IsNumber, IsString } from 'class-validator';

export class CreateHouseDto {
  @IsString()
  description: string;

  @IsString()
  city: string;

  @IsString()
  neighborhood: string;

  @IsString()
  street: string;

  @IsString()
  number: string;

  @IsNumber()
  price: number;

  @IsNumber()
  area: number;

  @IsNumber()
  ownerdId: number;

  @IsNumber()
  sellerId: number;
}
