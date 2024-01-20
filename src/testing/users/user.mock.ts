import { User_Role } from '../../enums/user_roles.enum';

export const userMock = {
  id: 1,
  name: 'Glasi',
  email: 'glasi@cirilo.com.br',
  password: '1234',
  role: User_Role.seller,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const usersMock = [userMock];
