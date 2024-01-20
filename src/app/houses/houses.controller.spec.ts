import { Test, TestingModule } from '@nestjs/testing';
import { HousesController } from './houses.controller';
import { HousesService } from './houses.service';
import { housesRepositoryMock } from '../../testing/houses/housesRepository.mock';
import { UsersService } from '../users/users.service';
import { jwtServiceMock } from '../../testing/auth/jwtService.mock';
import { userRepositoryMock } from '../../testing/users/userRepository.mock';
import { ConfigService } from '@nestjs/config';

describe('HousesController', () => {
  let controller: HousesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      //imports: [UsersModule, DataSource],
      controllers: [HousesController],
      providers: [
        jwtServiceMock,
        UsersService,
        HousesService,
        housesRepositoryMock,
        userRepositoryMock,
        ConfigService,
      ],
    }).compile();

    controller = module.get<HousesController>(HousesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
