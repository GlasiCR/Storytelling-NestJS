import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthGuard } from '../auth/guards/authGuards';
import { UsersModule } from './users.module';
import { userRepositoryMock } from '../../testing/users/userRepository.mock';
import { authGuardMock } from '../../testing/auth/auth-guard.mock';

describe('Users e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(userRepositoryMock.provide)
      .useValue(userRepositoryMock.useValue)
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should be defined.', () => {
    expect(app).toBeDefined();
  });

  describe('Read - e2e', () => {
    it('GET - /users', async () => {
      const response = await request(app.getHttpServer()).get('/users');

      expect(response.status).toEqual(200);
    });

    it('GET - /users', async () => {
      const response = await request(app.getHttpServer()).get('/users/1');

      expect(response.status).toBe(200);
    });
  });
});
