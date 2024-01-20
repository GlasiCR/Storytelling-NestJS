import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { jwtServiceMock } from '../../testing/auth/jwtService.mock';
import { userServiceMock } from '../../testing/users/userServiceRepository.mock';
import { userRepositoryMock } from '../../testing/users/userRepository.mock';
import { userRegisterDtoMock } from '../../testing/auth/userRegisterDto.mock';
import { userMock } from '../../testing/users/user.mock';
import { loginCredentialsMock } from '../../testing/auth/loginCredencials.mock';
import { tokenMock } from '../../testing/auth/token.mock';
import { authServiceMock } from '../../testing/auth/authService.mock';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        authServiceMock,
        jwtServiceMock,
        userServiceMock,
        userRepositoryMock,
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    console.log('passei teste controller');
    expect(authController).toBeDefined();
  });

  describe('register user', () => {
    it('Should register a user', async () => {
      const result = await authController.register(userRegisterDtoMock);
      expect(result).toEqual(userMock);
    });
  });

  describe('login user', () => {
    it('Should authenticate the user', async () => {
      const result = await authController.login(loginCredentialsMock);
      expect(result).toEqual(tokenMock);
    });
  });
});
