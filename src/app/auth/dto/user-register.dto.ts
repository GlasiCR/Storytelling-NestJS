import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { User_Role } from '../../../enums/user_roles.enum';
export class UserRegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(0, 64)
  password: string;

  @IsEnum(User_Role)
  @IsNotEmpty()
  role: User_Role;
}
