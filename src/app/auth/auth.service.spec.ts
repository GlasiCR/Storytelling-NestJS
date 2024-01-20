import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { jwtServiceMock } from '../../testing/auth/jwtService.mock';
import { userServiceMock } from '../../testing/users/userServiceRepository.mock';
import { userRepositoryMock } from '../../testing/users/userRepository.mock';
import { loginCredentialsMock } from '../../testing/auth/loginCredencials.mock';
import { tokenMock } from '../../testing/auth/token.mock';
import { userMock } from '../../testing/users/user.mock';
import { userRegisterDtoMock } from '../../testing/auth/userRegisterDto.mock';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        jwtServiceMock,
        userServiceMock,
        userRepositoryMock,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('register', () => {
    it('Should return a user registered', async () => {
      const result = await service.register(userRegisterDtoMock);

      expect(result).toEqual(userMock);
    });
  });

  describe('login', () => {
    it('Should return a token', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      const result = await service.login(loginCredentialsMock);

      expect(result).toEqual(tokenMock);
    });
  });
});
