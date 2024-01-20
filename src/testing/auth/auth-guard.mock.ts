import { CanActivate, ExecutionContext } from '@nestjs/common';
import { User_Role } from '../../enums/user_roles.enum';

export const authGuardMock: CanActivate = {
  canActivate: jest.fn((context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    request['user'] = { id: 1, role: User_Role.buyer };

    return true;
  }),
};
