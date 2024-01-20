import { IsNumber } from 'class-validator';

export class BuyHouseDto {
  @IsNumber()
  userId: number;
}
