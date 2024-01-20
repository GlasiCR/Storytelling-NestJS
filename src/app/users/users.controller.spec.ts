import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { userRepositoryMock } from '../../testing/users/userRepository.mock';
import { listUsersMock } from '../../testing/users/listAllUsers.mock';
import { updateUserMock } from '../../testing/users/update-user.mock';
import { updatedUserMock } from '../../testing/users/updated-user.mock';
//import { removeUserMock } from '../../testing/users/remove-user.mock';
import { userServiceMock } from '../../testing/users/userServiceRepository.mock';
//O teste unitário da camada Controller é bem tranquilo.
//A dinâmica é a mesma para o teste unutário do Service, com a diferença que ao configurarmos
//o Module do teste, usamos o ServiceMock e o Controller real, no teste do Service é ao
//contrário
describe('UsersController', () => {
  let userController: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [userServiceMock, userRepositoryMock],
    }).compile();

    userController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('Find all users', () => {
    it('Should be return all users', async () => {
      const result = await userController.findAll();
      expect(result).toEqual(listUsersMock);
    });
  });

  describe('Find user by Id', () => {
    it('Should return user by Id', async () => {
      const result = await userController.findOne(1);
      expect(result).toEqual(listUsersMock[0]);
    });
  });

  describe('Update user', () => {
    it('Should return updated an user', async () => {
      const result = await userController.update(1, updateUserMock);
      expect(result).toEqual(updatedUserMock);
    });
  });

  describe('Delete user', () => {
    it('Should remove an user', async () => {
      const result = await userController.remove(1);
      expect(result).toEqual({ message: 'User deleted with success!!' });
    });
  });
});
