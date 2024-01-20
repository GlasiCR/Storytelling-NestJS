import { getRepositoryToken } from '@nestjs/typeorm';
import { HouseEntity } from '../../database/entities/houses.entity';
import { houseMock } from './house.mock';
import { listHousesMock } from './listHouses.mock';

export const housesRepositoryMock = {
  provide: getRepositoryToken(HouseEntity),
  useValue: {
    create: jest.fn().mockResolvedValue(houseMock),
    save: jest.fn(),
    findOne: jest.fn().mockResolvedValue(houseMock),
    findOneOrFail: jest.fn().mockReturnValue(houseMock),
    find: jest.fn().mockResolvedValue(listHousesMock),
  },
};
