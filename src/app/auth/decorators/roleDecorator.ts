import { Reflector } from '@nestjs/core';
import { User_Role } from '../../../enums/user_roles.enum';
//Anotações de metadados é uma abordagem comum no NestJS por oferecer mais elegância ao integrar
//informações associadas a partes do código.
//E o que isso significa? Ao criarmos uma anotação para as roles, estou destacando isso na aplicação e
//quando tiver que configurar quais rotas são permitidas para quem, basta usar o Guard associado a
//esta anotação.
export const Roles = Reflector.createDecorator<User_Role[]>();
