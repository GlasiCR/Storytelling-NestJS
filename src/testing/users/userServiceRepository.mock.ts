import { UsersService } from '../../app/users/users.service';
import { listUsersMock } from './listAllUsers.mock';
import { updatedUserMock } from './updated-user.mock';
import { userMock } from './user.mock';
//Idem a explicação do userRepositoryMock, mas aqui é para o mock do Service
export const userServiceMock = {
  provide: UsersService,
  useValue: {
    findUserByEmail: jest.fn().mockResolvedValue(userMock),
    findAll: jest.fn().mockResolvedValue(listUsersMock),
    update: jest.fn().mockResolvedValue(updatedUserMock),
    findOne: jest.fn().mockResolvedValue(listUsersMock[0]),
    delete: jest
      .fn()
      .mockResolvedValue({ message: 'User deleted with success!!' }),
  },
};
