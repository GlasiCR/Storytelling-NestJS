import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roleDecorator';
import { User_Role } from '../../../enums/user_roles.enum';
//O básico não muda para o RoleGuard(). Também usaremos do CanActivate() para colocar a a lógica de
//permissionamento por rota de acordo com o perfil do usuário logado
@Injectable()
export class RoleGuard implements CanActivate {
  //Aqui há uma diferença.
  //No constructor usaremos o Reflector devido ao uso de anotações de metadados no NestJS.
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //Em no arquivo roleDecorator criamos um decorator para role usando anotações de metadados para
    //isso. Utilizamos o Reflector.
    //Pois agora vamos utilizar de um método do reflector para obter as roles associadas ao decorator
    //@Role.
    const roles = this.reflector.get(Roles, context.getHandler());
    //Abaixo estamos fazendo com que, se não houver roles associadas a requisição, significa que não
    //há restrição na rota em questão, por isso retornamos true.
    if (!roles) return true;
    //Idem ao AuthGuard(), usaremos do contexto da requisição para obter o usuário logado.
    const request = context.switchToHttp().getRequest();
    //Lembrando que lá em AuthGuard() eu dei o nome de user, por isso aqui eu pego o user
    const user = request?.user;
    //Neste método vamos receber as roles configuradas e a role do usuário logado. Será checado
    //se a role do usuário está incluída nas roles permitidas.
    const matched = this.matchRoles(roles, user?.role);
    //Se na verificação anterior houver correspondência, retorna true.
    if (matched) {
      return true;
    }

    throw new UnauthorizedException('User unauthorized');
  }
  private matchRoles(roles: User_Role[], userRole: User_Role): boolean {
    const includes = roles.includes(userRole);
    return includes;
  }
}
