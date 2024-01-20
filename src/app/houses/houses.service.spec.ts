import { Test, TestingModule } from '@nestjs/testing';
import { HousesService } from './houses.service';
import { UsersService } from '../users/users.service';
import { houseMock } from '../../testing/houses/house.mock';
import { houseCreateDtoMock } from '../../testing/houses/house-create-dto.mock';
import { listHousesMock } from '../../testing/houses/listHouses.mock';
import { housesRepositoryMock } from '../../testing/houses/housesRepository.mock';
import { NotFoundException } from '@nestjs/common/exceptions';
import { userRepositoryMock } from '../../testing/users/userRepository.mock';

describe('HousesService', () => {
  let houseService: HousesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HousesService,
        UsersService,
        housesRepositoryMock,
        userRepositoryMock,
      ],
    }).compile();

    houseService = module.get<HousesService>(HousesService);
  });

  it('should be defined', () => {
    expect(houseService).toBeDefined();
  });

  describe('Create house', () => {
    it('Should create and save the entity in the database', async () => {
      const result = await houseService.create(houseCreateDtoMock);

      expect(result).toEqual(houseMock);
    });
  });

  describe('Find all houses', () => {
    it('Should return an list of users', async () => {
      const result = await houseService.findAll();
      expect(result).toEqual(listHousesMock);
    });
  });

  describe('Find house by Id', () => {
    it('Should return the houses of the given id', async () => {
      const result = await houseService.findOne(1);
      expect(result).toEqual(houseMock);
    });
  });

  describe('Not find house by Id', () => {
    it('Should return the house of the given id', async () => {
      jest
        .spyOn(housesRepositoryMock.useValue, 'findOneOrFail')
        .mockRejectedValueOnce(false as never);
      const result = houseService.findOne(1);
      expect(result).rejects.toThrow(NotFoundException);
    });
  });
});
